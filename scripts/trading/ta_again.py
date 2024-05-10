import datetime
import decimal
import json
import sqlite3

import pandas as pd
import tradingview_ta
from pydantic import BaseModel
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression, ElasticNet
from sklearn.svm import SVR
from tradingview_ta import get_multiple_analysis, Interval

from potyk_io_back.core import BASE_DIR
from potyk_io_back.lazy import SimpleStorage
from scripts.trading.bot import TICKERS, TradingViewService


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
    last_sample = repo.scalar("select max(sample) from ta_indicators_1d") or 0

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
    last_sample = repo.scalar("select max(sample) from ta_indicators_1d") or 0

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
                "update ta_indicators_1d set change_next = ? where id = ?", (anal.change_next, anal.id)
            )
        sqlite_cursor.connection.commit()


def predict(repo: AnalysisRepo):
    analysis_to_train = repo.list_all(where="change_next is not null")

    analysis_to_predict = repo.list_all(where="change_next is null ")

    indicators = tradingview_ta.TA_Handler.indicators
    X = pd.DataFrame(
        [[anal.X[ind] for ind in indicators] for anal in analysis_to_train],
        columns=indicators,
    ).fillna(0)
    y = pd.DataFrame([anal.y for anal in analysis_to_train], columns=["change_next"])
    X_predict = pd.DataFrame(
        [[anal.X[ind] for ind in indicators] for anal in analysis_to_predict],
        columns=indicators,
    ).fillna(0)

    models = [
        ElasticNet(),
        RandomForestRegressor(),
        SVR(),
    ]

    predictions = []
    for model in models:
        model.fit(X, y)

        prediction = model.predict(X_predict)
        if isinstance(model, LinearRegression):
            prediction = prediction[:, 0]

        predictions.append(prediction.tolist())

    predictions = [sum(pr) / len(pr) for pr in list(zip(*predictions))]

    for index, anal in enumerate(analysis_to_predict):
        anal.change_predict = predictions[index]
        sqlite_cursor.execute(
            "update ta_indicators_1d set change_predict = ? where id = ?", (anal.change_predict, anal.id)
        )
    sqlite_cursor.connection.commit()


if __name__ == "__main__":
    sqlite_conn = (sqlite_conn := sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False))
    sqlite_cursor = sqlite_conn.cursor()

    # run at 5 pm every day
    load_sample(AnalysisRepo(sqlite_cursor))
    set_change_next(sqlite_cursor, AnalysisRepo(sqlite_cursor))
    predict(AnalysisRepo(sqlite_cursor))
