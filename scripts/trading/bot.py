import dataclasses
import datetime
import decimal
import io
import os
from functools import partial
from urllib.parse import urlencode

import requests
from dotenv import load_dotenv
from tabulate import tabulate
from tinkoff.invest import Client, InstrumentIdType
from tinkoff.invest.utils import money_to_decimal
from tradingview_ta import get_multiple_analysis, Interval

from potyk_io_back.core import BASE_DIR

TICKERS = [
    "ABIO",
    "ABRD",
    "AFKS",
    "AFLT",
    "AGRO",
    "AKRN",
    "ALRS",
    "AMEZ",
    "APTK",
    "AQUA",
    "ASTR",
    "BANE",
    "BANEP",
    "BELU",
    "BLNG",
    "BSPB",
    "CARM",
    "CBOM",
    "CHMF",
    "CHMK",
    "CIAN",
    "CNTL",
    "CNTLP",
    "DELI",
    "DIAS",
    "DSKY",
    "DVEC",
    "ELFV",
    "ENPG",
    "ETLN",
    "EUTR",
    "FEES",
    "FESH",
    "FIXP",
    "FLOT",
    "GAZP",
    "GCHE",
    "GECO",
    "GEMC",
    "GLTR",
    "GMKN",
    "GTRK",
    "HHRU",
    "HNFG",
    "HYDR",
    "IRAO",
    "IRKT",
    "KAZT",
    "KAZTP",
    "KLSB",
    "KMAZ",
    "KRKNP",
    "KROT",
    "KZOS",
    "KZOSP",
    "LENT",
    "LIFE",
    "LKOH",
    "LNZL",
    "LNZLP",
    "LSNG",
    "LSNGP",
    "LSRG",
    "MAGN",
    "MDMG",
    "MGKL",
    "MGNT",
    "MGTSP",
    "MOEX",
    "MRKC",
    "MRKP",
    "MRKS",
    "MRKU",
    "MRKV",
    "MRKY",
    "MRKZ",
    "MSNG",
    "MSRS",
    "MSTT",
    "MTLR",
    "MTLRP",
    "MTSS",
    "MVID",
    "NKHP",
    "NKNC",
    "NKNCP",
    "NLMK",
    "NMTP",
    "NSVZ",
    "NVTK",
    "OGKB",
    "OKEY",
    "OZON",
    "PHOR",
    "PIKK",
    "PLZL",
    "PMSB",
    "PMSBP",
    "POLY",
    "POSI",
    "PRFN",
    "QIWI",
    "RASP",
    "RBCM",
    "RENI",
    "RKKE",
    "RNFT",
    "ROLO",
    "ROSN",
    "RTKM",
    "RTKMP",
    "RUAL",
    "SBER",
    "SBERP",
    "SELG",
    "SFIN",
    "SGZH",
    "SIBN",
    "SMLT",
    "SNGS",
    "SNGSP",
    "SOFL",
    "SPBE",
    "SVAV",
    "SVCB",
    "TATN",
    "TATNP",
    "TCSG",
    "TGKA",
    "TGKB",
    "TGKBP",
    "TGKN",
    "TRMK",
    "TRNFP",
    "TTLK",
    "UGLD",
    "UNAC",
    "UNKL",
    "UPRO",
    "UWGN",
    "VEON-RX",
    "VKCO",
    "VRSB",
    "VSMO",
    "VTBR",
    "WUSH",
    "YAKG",
    "YNDX",
]


@dataclasses.dataclass(kw_only=True)
class PortfolioItem:
    ticker: str = ""
    figi: str = ""
    avg_price: decimal.Decimal = decimal.Decimal(0)
    current_price: decimal.Decimal = decimal.Decimal(0)
    recommendation_1h: str = ""
    recommendation_1d: str = ""
    recommendation_1w: str = ""
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
        return self.recommendation_1d not in ("STRONG_BUY",)


def main(force=False):
    if not force:
        now_utc = datetime.datetime.utcnow()
        if not ((10 - 3) <= now_utc.hour <= (18 - 3)):
            return

    tg_message_stream = io.StringIO()
    print_to_stream = partial(print, file=tg_message_stream)

    tabulate_pre = (
        lambda data: f"<pre>{tabulate(data, headers='firstrow', tablefmt='plain')}</pre>"
    )

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
                avg_price=money_to_decimal(pos.average_position_price).quantize(
                    decimal.Decimal("0.01")
                ),
                current_price=money_to_decimal(pos.current_price).quantize(
                    decimal.Decimal("0.01")
                ),
                ask_amount=ask_amount,
            )
            portfolio_items.append(portfolio_item)

        my_tickers_with_exchange = [pos.ticker_with_exchange for pos in portfolio_items]
        if my_tickers_with_exchange:
            day_analysis = get_multiple_analysis(
                screener="russia",
                interval=Interval.INTERVAL_1_DAY,
                symbols=my_tickers_with_exchange,
            )
            hour_analysis = get_multiple_analysis(
                screener="russia",
                interval=Interval.INTERVAL_1_HOUR,
                symbols=my_tickers_with_exchange,
            )
            for pos in portfolio_items:
                pos.recommendation_1d = day_analysis[pos.ticker_with_exchange].summary[
                    "RECOMMENDATION"
                ]
                pos.recommendation_1h = hour_analysis[pos.ticker_with_exchange].summary[
                    "RECOMMENDATION"
                ]

        portfolio_items = sorted(
            portfolio_items, key=lambda item: item.profit, reverse=True
        )

        print_to_stream("<b>Portfolio</b>")

        table = [
            [
                "",
                "avg_price",
                "cur_price",
                "profit",
                "rec_1h",
                "rec_1d",
                "asks",
            ],
            *(
                (
                    pos.ticker,
                    pos.avg_price,
                    pos.current_price,
                    pos.profit_str,
                    pos.recommendation_1h.replace("STRONG_BUY", "BUY_STR"),
                    pos.recommendation_1d.replace("STRONG_BUY", "BUY_STR"),
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
                    "rec_1h",
                    "rec_1d",
                ],
                *(
                    (
                        pos.ticker,
                        pos.avg_price,
                        pos.current_price,
                        pos.profit_str,
                        pos.recommendation_1h.replace("STRONG_BUY", "BUY_STR"),
                        pos.recommendation_1d.replace("STRONG_BUY", "BUY_STR"),
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

    tickers_with_exchange = list(
        {f"MOEX:{symbol}" for symbol in TICKERS} - set(my_tickers_with_exchange)
    )
    week_analysis = get_multiple_analysis(
        screener="russia",
        interval=Interval.INTERVAL_1_WEEK,
        symbols=tickers_with_exchange,
    )
    day_analysis = get_multiple_analysis(
        screener="russia",
        interval=Interval.INTERVAL_1_DAY,
        symbols=tickers_with_exchange,
    )
    hour_analysis = get_multiple_analysis(
        screener="russia",
        interval=Interval.INTERVAL_1_HOUR,
        symbols=tickers_with_exchange,
    )
    tickers_with_recs = []
    for ticker in tickers_with_exchange:
        day = day_analysis[ticker].summary["RECOMMENDATION"]
        hour = hour_analysis[ticker].summary["RECOMMENDATION"]

        if not week_analysis[ticker]:
            continue

        week = week_analysis[ticker].summary["RECOMMENDATION"]

        if (
            week == "STRONG_BUY"
            and day == "STRONG_BUY"
            and hour in ("BUY", "STRONG_BUY")
        ):
            tickers_with_recs.append(
                PortfolioItem(
                    ticker=ticker[5:],
                    recommendation_1d=day.replace("STRONG_BUY", "BUY_STR"),
                    recommendation_1h=hour.replace("STRONG_BUY", "BUY_STR"),
                    recommendation_1w=week.replace("STRONG_BUY", "BUY_STR"),
                )
            )

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
                pos.recommendation_1w,
                pos.recommendation_1d,
                pos.recommendation_1h,
                pos.ask_amount,
            )
            for pos in tickers_with_recs
        ],
        key=(key_func := lambda item: (item[1], item[2], item[3], item[4])),
        reverse=True,
    )
    tickers_with_recs = [
        ["", "rec_1w", "rec_1d", "rec_1h", "asks"],
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
    main(force=True)
