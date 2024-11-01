import dataclasses
import datetime
import decimal
import enum
import io
import os
from functools import partial
from unittest import mock
from urllib.parse import urlencode

import requests
from dotenv import load_dotenv
from tabulate import tabulate
from tinkoff.invest import Client, InstrumentIdType
from tinkoff.invest.utils import money_to_decimal
from tradingview_ta import get_multiple_analysis, Interval

from potyk_io_back.core.config import BASE_DIR
from potyk_io_back.domain.tv_ta import TICKERS


class Recommendation(enum.StrEnum):
    STR_BUY = "STR_BUY"
    BUY = "BUY"
    NEUTRAL = "NEUTRAL"
    SELL = "SELL"
    STR_SELL = "STR_SELL"


@dataclasses.dataclass(kw_only=True)
class ShareAnalysis:
    recommendation_1mo: Recommendation | str = ""
    recommendation_1w: Recommendation | str = ""
    recommendation_1d: Recommendation | str = ""
    recommendation_1h: Recommendation | str = ""
    recommendation_15m: Recommendation | str = ""
    recommendation_1m: Recommendation | str = ""

    @classmethod
    def display_fields(cls):
        return [
            "rec_1mo",
            "rec_1w",
            "rec_1d",
            "rec_1h",
            "rec_15m",
            "rec_1m",
        ]

    def as_tuple(self):
        return [
            self.recommendation_1mo,
            self.recommendation_1w,
            self.recommendation_1d,
            self.recommendation_1h,
            self.recommendation_15m,
            self.recommendation_1m,
        ]


class TradingViewService:
    exchange = "MOEX"

    def make_ticker_w_exchange(self, tickers):
        tickers_w_exchange = []
        for ticker in tickers:
            if ticker.startswith(self.exchange + ':'):
                tickers_w_exchange.append(ticker)
            else:
                tickers_w_exchange.append(f"{self.exchange}:{ticker}")
        return tickers_w_exchange

    def get_analysis_for_tickers(self, tickers: list[str]) -> dict[str, ShareAnalysis]:
        tickers_w_exchange = self.make_ticker_w_exchange(tickers)

        month_analysis = get_multiple_analysis(
            screener="russia",
            interval=Interval.INTERVAL_1_MONTH,
            symbols=tickers_w_exchange,
        )
        week_analysis = get_multiple_analysis(
            screener="russia",
            interval=Interval.INTERVAL_1_WEEK,
            symbols=tickers_w_exchange,
        )
        day_analysis = get_multiple_analysis(
            screener="russia",
            interval=Interval.INTERVAL_1_DAY,
            symbols=tickers_w_exchange,
        )
        hour_analysis = get_multiple_analysis(
            screener="russia",
            interval=Interval.INTERVAL_1_HOUR,
            symbols=tickers_w_exchange,
        )
        fifteen_analysis = get_multiple_analysis(
            screener="russia",
            interval=Interval.INTERVAL_15_MINUTES,
            symbols=tickers_w_exchange,
        )
        minute_analysis = get_multiple_analysis(
            screener="russia",
            interval=Interval.INTERVAL_1_MINUTE,
            symbols=tickers_w_exchange,
        )

        analysis = {}
        for ticker in tickers_w_exchange:
            try:
                analysis[ticker] = self._make_analysis(
                    recommendation_1mo=(
                        month_analysis[ticker] or mock.Mock(summary={"RECOMMENDATION": "NEUTRAL"})
                    ).summary["RECOMMENDATION"],
                    recommendation_1w=(
                        week_analysis[ticker] or mock.Mock(summary={"RECOMMENDATION": "NEUTRAL"})
                    ).summary["RECOMMENDATION"],
                    recommendation_1d=(
                        day_analysis[ticker] or mock.Mock(summary={"RECOMMENDATION": "NEUTRAL"})
                    ).summary["RECOMMENDATION"],
                    recommendation_1h=(
                        hour_analysis[ticker] or mock.Mock(summary={"RECOMMENDATION": "NEUTRAL"})
                    ).summary["RECOMMENDATION"],
                    recommendation_15m=(
                        fifteen_analysis[ticker] or mock.Mock(summary={"RECOMMENDATION": "NEUTRAL"})
                    ).summary["RECOMMENDATION"],
                    recommendation_1m=(
                        minute_analysis[ticker] or mock.Mock(summary={"RECOMMENDATION": "NEUTRAL"})
                    ).summary["RECOMMENDATION"],
                )
            except AttributeError:
                print("Failed to get analysis for {}".format(ticker))
        return analysis

    def _make_analysis(
        self,
        *,
        recommendation_1mo,
        recommendation_1w,
        recommendation_1d,
        recommendation_1h,
        recommendation_15m,
        recommendation_1m,
    ) -> ShareAnalysis:
        return ShareAnalysis(
            recommendation_1mo=Recommendation(recommendation_1mo.replace("STRONG", "STR")),
            recommendation_1w=Recommendation(recommendation_1w.replace("STRONG", "STR")),
            recommendation_1d=Recommendation(recommendation_1d.replace("STRONG", "STR")),
            recommendation_1h=Recommendation(recommendation_1h.replace("STRONG", "STR")),
            recommendation_15m=Recommendation(recommendation_15m.replace("STRONG", "STR")),
            recommendation_1m=Recommendation(recommendation_1m.replace("STRONG", "STR")),
        )


@dataclasses.dataclass(kw_only=True)
class PortfolioItem:
    ticker: str = ""
    figi: str = ""
    avg_price: decimal.Decimal = decimal.Decimal(0)
    current_price: decimal.Decimal = decimal.Decimal(0)
    analysis: ShareAnalysis = dataclasses.field(default_factory=ShareAnalysis)
    ask_amount: int = 0

    @property
    def ticker_with_exchange(self):
        return f"MOEX:{self.ticker}"

    @property
    def profit(self):
        return ((self.current_price - self.avg_price) / self.avg_price * 100).quantize(
            decimal.Decimal("0.01")
        )

    @property
    def profit_str(self):
        profit = self.profit
        if profit > 0:
            return f"+{profit}%"
        else:
            return f"{profit}%"

    @property
    def time_to_sell(self):
        return self.analysis.recommendation_1d not in (Recommendation.STR_BUY, Recommendation.BUY)


def main(ignore_schedule=False):
    if not ignore_schedule:
        now_utc = datetime.datetime.utcnow()
        if not ((10 - 3) <= now_utc.hour <= (18 - 3) and now_utc.weekday() not in (5, 6)):
            return

    tg_message_stream = io.StringIO()
    print_to_stream = partial(print, file=tg_message_stream)

    tabulate_pre = lambda data: f"<pre>{tabulate(data, headers='firstrow', tablefmt='plain')}</pre>"

    load_dotenv(BASE_DIR / ".env")
    TOKEN = os.getenv("TINK_TOKEN")

    with Client(TOKEN) as client:
        account_id = client.users.get_accounts().accounts[0].id

        portfolio = [
            pos
            for pos in client.operations.get_portfolio(account_id=account_id).positions
            if pos.instrument_type == "share"
        ]

        portfolio_items = []
        for pos in portfolio:
            instrument = client.instruments.get_instrument_by(
                id_type=InstrumentIdType.INSTRUMENT_ID_TYPE_FIGI,
                id=pos.figi,
            )
            ticker = instrument.instrument.ticker

            order_book = client.market_data.get_order_book(figi=pos.figi, depth=50)
            ask_amount = sum((order.quantity for order in order_book.asks))

            portfolio_item = PortfolioItem(
                ticker=ticker,
                figi=pos.figi,
                avg_price=money_to_decimal(pos.average_position_price).quantize(decimal.Decimal("0.01")),
                current_price=money_to_decimal(pos.current_price).quantize(decimal.Decimal("0.01")),
                ask_amount=ask_amount,
            )
            portfolio_items.append(portfolio_item)

        my_tickers_with_exchange = [pos.ticker_with_exchange for pos in portfolio_items]
        if my_tickers_with_exchange:
            analysis = TradingViewService().get_analysis_for_tickers(my_tickers_with_exchange)

            for pos in portfolio_items:
                pos.analysis = analysis[pos.ticker_with_exchange]

        portfolio_items = sorted(portfolio_items, key=lambda item: item.profit, reverse=True)

        print_to_stream("<b>Portfolio</b>")

        table = [
            [
                "",
                "avg_price",
                "cur_price",
                "profit",
                *(ShareAnalysis.display_fields()),
                "asks",
            ],
            *(
                (
                    pos.ticker,
                    pos.avg_price,
                    pos.current_price,
                    pos.profit_str,
                    *pos.analysis.as_tuple(),
                    pos.ask_amount,
                )
                for pos in portfolio_items
            ),
        ]
        print_to_stream(tabulate_pre(table))
        print_to_stream()

        portfolio_items_to_sell = [pos for pos in portfolio_items if pos.time_to_sell]
        time_to_sell = False
        if portfolio_items_to_sell:
            time_to_sell = True
            print_to_stream("<b>TIME TO SELL 📉</b>")
            table = [
                [
                    "",
                    "avg_price",
                    "cur_price",
                    "profit",
                    *(ShareAnalysis.display_fields()),
                ],
                *(
                    (
                        pos.ticker,
                        pos.avg_price,
                        pos.current_price,
                        pos.profit_str,
                        *pos.analysis.as_tuple(),
                    )
                    for pos in portfolio_items_to_sell
                ),
            ]
            print_to_stream(tabulate_pre(table))
            print_to_stream()

        make_ideas(
            print_to_stream,
            tg_message_stream,
            my_tickers_with_exchange,
            client,
            tabulate_pre,
        )

        TOKEN = os.getenv("TG_BOT_TOKEN")
        chat_id = os.getenv("TG_BOT_CHAT_ID")
        message = tg_message_stream.getvalue()
        message = message
        params = dict(
            chat_id=chat_id,
            text=message,
            parse_mode="HTML",
            disable_notification=not time_to_sell,
        )
        # https://core.telegram.org/bots/api#sendmessage
        url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?{urlencode(params)}"
        resp = requests.get(url)
        print(resp.json())  # this sends the message


def make_ideas(
    print_to_stream,
    tg_message_stream,
    my_tickers_with_exchange,
    client,
    tabulate_pre,
):
    print_to_stream("<b>Ideas</b>", file=tg_message_stream)

    tickers_with_exchange = list({f"MOEX:{symbol}" for symbol in TICKERS} - set(my_tickers_with_exchange))
    tickers_with_recs = []

    analysis = TradingViewService().get_analysis_for_tickers(tickers_with_exchange)

    for ticker in tickers_with_exchange:
        ticker_analysis = analysis[ticker]
        if (
            # ticker_analysis.recommendation_1mo == Recommendation.STR_BUY
            ticker_analysis.recommendation_1w in (Recommendation.BUY, Recommendation.STR_BUY)
            and ticker_analysis.recommendation_1d in (Recommendation.STR_BUY,)
            and ticker_analysis.recommendation_1h in (Recommendation.BUY, Recommendation.STR_BUY)
        ):
            tickers_with_recs.append(PortfolioItem(ticker=ticker[5:], analysis=ticker_analysis))

    for pos in tickers_with_recs:
        instrument = client.instruments.get_instrument_by(
            id_type=InstrumentIdType.INSTRUMENT_ID_TYPE_TICKER,
            class_code="TQBR",
            id=pos.ticker,
        )
        pos.figi = instrument.instrument.figi

        order_book = client.market_data.get_order_book(figi=pos.figi, depth=50)
        ask_amount = sum((order.quantity for order in order_book.asks))
        pos.ask_amount = ask_amount

    tickers_with_recs = sorted(
        [
            (
                pos.ticker,
                *pos.analysis.as_tuple(),
                pos.ask_amount,
            )
            for pos in tickers_with_recs
        ],
        key=(key_func := lambda item: item[1:5]),
        reverse=True,
    )
    tickers_with_recs = [
        ["", *(ShareAnalysis.display_fields()), "asks"],
        *tickers_with_recs,
    ]

    print_to_stream(tabulate_pre(tickers_with_recs))


def handler(event, context):
    main()
    return {
        "statusCode": 200,
        "body": "Hello World!",
    }


if __name__ == "__main__":
    main(ignore_schedule=True)
