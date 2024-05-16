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


# Assuming AnalysisRepo and sqlite_cursor are defined elsewhere in your code


def predict(repo: AnalysisRepo, save_to_db=True):
    # region PREPARE DATA
    analysis_to_train = repo.list_all(where="change_next is not null")
    analysis_to_predict = repo.list_all(where="change_next is null ")
    # analysis_to_predict = repo.list_all(where="sample != 6")

    indicators = tradingview_ta.TA_Handler.indicators  # = 90 features
    str_indicators = ["".join(ch for ch in ind if ch not in "[]<") for ind in indicators]
    X_train = pd.DataFrame(
        [[anal.X[ind] for ind in indicators] for anal in analysis_to_train],
        columns=str_indicators,
    )
    X_train = X_train.fillna(0)
    y_train = pd.DataFrame([anal.y for anal in analysis_to_train], columns=["change_next"])
    y_train = y_train[
        "change_next"
    ].values.ravel()  # Using.values to get a numpy array and.ravel() to flatten it

    X_predict = pd.DataFrame(
        [[anal.X[ind] for ind in indicators] for anal in analysis_to_predict],
        columns=str_indicators,
    )
    X_predict = X_predict.fillna(0)
    # endregion PREPARE DATA

    # region useless
    # Feature selection
    # selector = SelectKBest(mutual_info_regression, k=20)
    # X_train = selector.fit_transform(X_train, y_train)
    # X_predict = selector.transform(X_predict)

    # Feature scaling
    # scaler = StandardScaler()
    # X_train = scaler.fit_transform(X_train)
    # X_predict = scaler.transform(X_predict)

    # model = param_tuning(
    #     model=RandomForestRegressor(),
    #     param_grid={
    #         "n_estimators": [100, 200, 300],
    #         "max_depth": [None, 10, 20, 30],
    #         "min_samples_split": [2, 5, 10],
    #     },
    #     X_train=X_train,
    #     y_train=y_train,
    # )

    # best_params = {"max_depth": 10, "min_samples_split": 2, "n_estimators": 300}
    # models = [
    #     RandomForestRegressor(**best_params),
    # ]
    # endregion useless

    # region TRAIN
    models = [
        # RandomForestRegressor(),
        # GradientBoostingRegressor(),
        XGBRegressor(),
    ]

    for model in models:
        model.fit(X_train, y_train)
    # endregion TRAIN

    # region PREDICT
    predictions = [model.predict(X_predict).tolist() for model in models]
    predictions = [sum(pr) / len(pr) for pr in list(zip(*predictions))]
    # endregion PREDICT

    if save_to_db:
        for index, anal in enumerate(analysis_to_predict):
            anal.change_predict = predictions[index]
            sqlite_cursor.execute(
                "update ta_indicators_1d set change_predict_2 =? where id =?", (anal.change_predict, anal.id)
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
        print(tabulate(results, headers=["ticker", "change_next", "change_predict_2"]))


def param_tuning(model, param_grid, X_train, y_train):
    grid_search = GridSearchCV(model, param_grid, cv=5, scoring="neg_mean_squared_error", verbose=10)
    grid_search.fit(X_train, y_train)
    print(grid_search.best_params_)
    return grid_search.best_estimator_


# Example usage
# predict(repo_instance, save_to_db=True)


if __name__ == "__main__":
    sqlite_conn = (sqlite_conn := sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False))
    sqlite_cursor = sqlite_conn.cursor()

    # run at 5 pm every day
    print("load_sample...")
    load_sample(AnalysisRepo(sqlite_cursor))
    print()

    print("set_change_next...")
    set_change_next(sqlite_cursor, AnalysisRepo(sqlite_cursor))
    print()

    print("predict...")
    predict(AnalysisRepo(sqlite_cursor))
    # predict(AnalysisRepo(sqlite_cursor), save_to_db=False)
    print()

    print("Done!")
