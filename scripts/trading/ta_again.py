import datetime
import decimal
import json
import sqlite3
import string
from tabnanny import verbose

import tradingview_ta
from pydantic import BaseModel
from sklearn.feature_selection import mutual_info_regression, SelectKBest
from sklearn.linear_model import ElasticNet
from sklearn.svm import SVR
from tabulate import tabulate
from tradingview_ta import get_multiple_analysis, Interval
from xgboost import XGBRegressor

from potyk_io_back.core import BASE_DIR
from potyk_io_back.lazy import SimpleStorage
from potyk_io_back.q import Q
from scripts.trading.bot import TICKERS, TradingViewService
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor


class Analysis(BaseModel):
    id: int | None = None
    ticker: str
    dt: datetime.datetime
    interval: str = "1d"
    indicators: dict
    change: decimal.Decimal
    change_next: decimal.Decimal | None = None
    change_predict: decimal.Decimal | None = None
    sample: int
    indicators_prev_day: dict | None = None
    # indicators_prev_day_2: dict | None = None

    @property
    def X(self):
        return self.indicators

    @property
    def y(self):
        return self.change_next


def analysis_from_row(row: sqlite3.Row) -> Analysis:
    return Analysis(
        id=row["id"],
        ticker=row["ticker"],
        dt=row["dt"],
        interval=row["interval"],
        indicators=json.loads(row["indicators"]),
        indicators_prev_day=json.loads(row["indicators_prev_day"] or "{}"),
        indicators_prev_day_2=json.loads(row["indicators_prev_day_2"] or "{}"),
        change=row["change"],
        change_next=row["change_next"],
        change_predict=row["change_predict"],
        sample=row["sample"],
    )


class AnalysisRepo:
    def __init__(self, sqlite_cursor):
        self.sqlite_cursor = sqlite_cursor
        self.store = SimpleStorage(self.sqlite_cursor, "ta_indicators_1d", model_factory=analysis_from_row)
        self.q = Q(self.sqlite_cursor)

    def insert_samples(self, samples):
        for analysis in samples:
            sqlite_cursor.execute(
                """
            insert into ta_indicators_1d (ticker, dt, sample, "interval", indicators, change)
            values (?, ?, ?, ?, ?, ?);
            """,
                (
                    analysis.ticker,
                    analysis.dt,
                    analysis.sample,
                    analysis.interval,
                    json.dumps(analysis.indicators),
                    str(analysis.change),
                ),
            )
        sqlite_cursor.connection.commit()

    def list_all(self, *, where: str = None, where_params: tuple = None):
        return self.store.list_all(where=where, where_params=where_params)

    def fetch_one(self, q, params=None):
        return self.store.fetch_one(q, params)

    def scalar(self, q, params=None):
        return self.store.scalar(q, params)

    def fetch_all(self, q, params=None):
        return self.store.fetch_all(q, params)


def load_sample(repo: AnalysisRepo):
    last_sample = repo.q.select_val("select max(sample) from ta_indicators_1d") or 0

    now = datetime.datetime.now()

    tickers = TICKERS
    tickers_w_exchange = TradingViewService().make_ticker_w_exchange(tickers)

    sample = last_sample + 1

    analysis_samples = []

    ta_analysis = get_multiple_analysis(
        screener="russia",
        interval=Interval.INTERVAL_1_DAY,
        symbols=tickers_w_exchange,
    )
    for index, ticker in enumerate(tickers):
        indicators = ta_analysis[tickers_w_exchange[index]].indicators
        analysis = Analysis(
            ticker=ticker,
            dt=now,
            indicators=indicators,
            change=indicators["change"],
            sample=sample,
        )
        analysis_samples.append(analysis)

    repo.insert_samples(analysis_samples)


def set_change_next(sqlite_cursor, repo: AnalysisRepo):
    last_sample = repo.q.select_val("select max(sample) from ta_indicators_1d") or 0

    for sample in range(last_sample):
        sample_analysis = repo.list_all(where="sample = ?", where_params=(sample,))
        if all(anal.change_next for anal in sample_analysis):
            continue

        next_sample_analysis = repo.list_all(where="sample = ?", where_params=(sample + 1,))
        if not next_sample_analysis:
            break

        next_sample_analysis_by_ticker = {anal.ticker: anal for anal in next_sample_analysis}

        for anal in sample_analysis:
            next_anal = next_sample_analysis_by_ticker[anal.ticker]
            anal.change_next = next_anal.change
            sqlite_cursor.execute(
                "update ta_indicators_1d set change_next = ? where id = ?", (str(anal.change_next), anal.id)
            )

        sqlite_cursor.execute(
            """
        UPDATE ta_indicators_1d
        SET indicators_prev_day = (
            SELECT indicators
            FROM ta_indicators_1d AS prev_day
            WHERE prev_day.sample = ta_indicators_1d.sample - 1
        );
        """
        )

        sqlite_cursor.connection.commit()

    print("yesterday prediction results:")
    results = repo.q.select_all(
        """
    select ticker, change_next, change_predict_2
    from ta_indicators_1d
    where sample = ?
    order by change_predict_2 desc
    limit 10
    """,
        (last_sample - 1,),
    )
    print(tabulate(results, headers=["ticker", "change_next", "change_predict_2"]))
    score = repo.q.select_val('select count(*) from ta_indicators_1d where sample = ? and change_next > 0 and change_predict_2 > 0', (last_sample-1, ))
    score = score / len(TICKERS)
    print(f'score = {score}')

# Assuming AnalysisRepo and sqlite_cursor are defined elsewhere in your code


def analysis_to_X_df(analysis: list[Analysis]) -> pd.DataFrame:
    indicators = tradingview_ta.TA_Handler.indicators  # = 90 features
    str_indicators = lambda i: ["".join(ch for ch in ind if ch not in "[]<") + str(i) for ind in indicators]
    columns = [
        *str_indicators(1),
        *str_indicators(2),
        # *str_indicators(3),
    ]

    X = pd.DataFrame(
        [
            [
                *(anal.X[ind] for ind in indicators),
                *(anal.indicators_prev_day[ind] for ind in indicators),
                # *(anal.indicators_prev_day_2[ind] for ind in indicators),
            ]
            for anal in analysis
        ],
        columns=columns,
    )
    X = X.fillna(0)
    return X


def analysis_to_y_df(analysis: list[Analysis]) -> pd.DataFrame:
    y_train = pd.DataFrame([anal.y for anal in analysis], columns=["change_next"])
    y_train = y_train["change_next"].values.ravel()
    return y_train


def predict(repo: AnalysisRepo, save_to_db=True):
    analysis_to_train = repo.list_all(where="change_next is not null and sample > 1")
    analysis_to_predict = repo.list_all(where="change_next is null ")
    # analysis_to_predict = repo.list_all(where="sample > 2")

    X_train = analysis_to_X_df(analysis_to_train)
    y_train = analysis_to_y_df(analysis_to_train)
    X_predict = analysis_to_X_df(analysis_to_predict)

    model = XGBRegressor()
    model.fit(X_train, y_train)

    predictions = model.predict(X_predict).tolist()

    if save_to_db:
        for anal, pred in zip(analysis_to_predict, predictions):
            sqlite_cursor.execute(
                "update ta_indicators_1d set change_predict_2 =? where id =?",
                (pred, anal.id),
            )
        sqlite_cursor.connection.commit()

        last_sample = repo.q.select_val("select max(sample) from ta_indicators_1d") or 0
        print("today predictions:")
        results = repo.q.select_all(
            """
        select ticker, change_predict_2
        from ta_indicators_1d
        where sample = ?
        order by change_predict_2 desc
        limit 10
        """,
            (last_sample,),
        )
        print(tabulate(results, headers=["ticker", "change_predict"]))


if __name__ == "__main__":
    sqlite_conn = (sqlite_conn := sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False))
    sqlite_cursor = sqlite_conn.cursor()

    # run at 5 pm every day
    print("load_sample...")
    # load_sample(AnalysisRepo(sqlite_cursor))
    print()

    print("set_change_next...")
    set_change_next(sqlite_cursor, AnalysisRepo(sqlite_cursor))
    print()

    print("predict...")
    # predict(AnalysisRepo(sqlite_cursor))
    print()

    print("Done!")
