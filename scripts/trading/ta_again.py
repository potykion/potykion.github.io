import datetime
import decimal
import json
import sqlite3

import pandas as pd
import tradingview_ta
from pydantic import BaseModel
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from tradingview_ta import get_multiple_analysis, Interval
from yfinance import ticker

from potyk_io_back.core import BASE_DIR
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


class AnalysisRepo:
    def __init__(self, sqlite_cursor):
        self.sqlite_cursor = sqlite_cursor

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

    def list_samples(self, q, params: tuple):
        return [
            Analysis(
                id=id,
                ticker=ticker,
                dt=dt,
                sample=sample,
                interval=interval,
                change=change,
                change_next=change_next,
            )
            for id, ticker, dt, sample, interval, indicators, change, change_next in sqlite_cursor.execute(
                q, params
            ).fetchall()
        ]

    def list_by_sample(self, sample):
        return self.list_samples(
            'select id, ticker, dt, sample, "interval", indicators, change, change_next from ta_indicators_1d where sample = ?',
            (sample,),
        )


def load_sample(sqlite_cursor, repo: AnalysisRepo):
    last_sample = sqlite_cursor.execute("select max(sample) from ta_indicators_1d").fetchone()[0] or 0

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


def set_change_next():
    last_sample = sqlite_cursor.execute("select max(sample) from ta_indicators_1d").fetchone()[0] or 0

    for sample in range(last_sample):
        sample_analysis = [
            Analysis(
                id=id,
                ticker=ticker,
                dt=dt,
                sample=sample,
                interval=interval,
                change=change,
                change_next=change_next,
            )
            for id, ticker, dt, sample, interval, indicators, change, change_next in sqlite_cursor.execute(
                'select id, ticker, dt, sample, "interval", indicators, change, change_next from ta_indicators_1d where sample = ? ',
                sample,
            ).fetchall()
        ]
        if all(anal.change_next for anal in sample_analysis):
            continue

        next_sample_analysis = [
            Analysis(
                ticker=ticker,
                dt=dt,
                sample=sample,
                interval=interval,
                change=change,
                change_next=change_next,
            )
            for ticker, dt, sample, interval, indicators, change, change_next in sqlite_cursor.execute(
                'select ticker, dt, sample, "interval", indicators, change, change_next from ta_indicators_1d where sample = ? ',
                sample + 1,
            ).fetchall()
        ]
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


def predict():
    analysis_to_train = [
        Analysis(
            id=id,
            ticker=ticker,
            dt=dt,
            sample=sample,
            interval=interval,
            change=change,
            change_next=change_next,
        )
        for id, ticker, dt, sample, interval, indicators, change, change_next in sqlite_cursor.execute(
            'select id, ticker, dt, sample, "interval", indicators, change, change_next from ta_indicators_1d where change_next is not null ',
        ).fetchall()
    ]

    analysis_to_predict = [
        Analysis(
            id=id,
            ticker=ticker,
            dt=dt,
            sample=sample,
            interval=interval,
            change=change,
            change_next=change_next,
        )
        for id, ticker, dt, sample, interval, indicators, change, change_next in sqlite_cursor.execute(
            'select id, ticker, dt, sample, "interval", indicators, change, change_next from ta_indicators_1d where change_next is null ',
        ).fetchall()
    ]

    indicators = tradingview_ta.TA_Handler.indicators
    X = pd.DataFrame(
        [[anal.X[ind] for ind in indicators] for anal in analysis_to_train],
        columns=indicators,
    )
    y = pd.DataFrame([anal.y for anal in analysis_to_train], columns=["change_next"])
    model = LinearRegression()
    model.fit(X, y)

    X_predict = pd.DataFrame(
        [[anal.X[ind] for ind in indicators] for anal in analysis_to_predict],
        columns=indicators,
    )

    predictions = model.predict(X_predict)

    for anal, prediction in zip(analysis_to_predict, predictions):
        anal.change_predict = prediction
        sqlite_cursor.execute(
            "update ta_indicators_1d set change_predict = ? where id = ?", (anal.change_predict, anal.id)
        )
    sqlite_cursor.connection.commit()


if __name__ == "__main__":
    sqlite_conn = (sqlite_conn := sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False))
    sqlite_cursor = sqlite_conn.cursor()

    # run at 5 pm every day
    # load_sample(sqlite_cursor, AnalysisRepo(sqlite_cursor))
    set_change_next()
    # predict()
