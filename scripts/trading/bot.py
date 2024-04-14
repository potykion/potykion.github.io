import dataclasses
import decimal
import io
import os
from functools import partial
from itertools import groupby
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


@dataclasses.dataclass
class PortfolioItem:
    ticker: str
    figi: str
    avg_price: decimal.Decimal
    current_price: decimal.Decimal
    recommendation_1h: str = ""
    recommendation_1d: str = ""

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


def main():
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
            ticker = client.instruments.get_instrument_by(
                id_type=InstrumentIdType.INSTRUMENT_ID_TYPE_FIGI,
                id=pos.figi,
            ).instrument.ticker

            portfolio_item = PortfolioItem(
                ticker,
                pos.figi,
                money_to_decimal(pos.average_position_price).quantize(
                    decimal.Decimal("0.01")
                ),
                money_to_decimal(pos.current_price).quantize(decimal.Decimal("0.01")),
            )
            portfolio_items.append(portfolio_item)

        my_tickers_with_exchange = [pos.ticker_with_exchange for pos in portfolio_items]

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
                for pos in portfolio_items
            ),
        ]
        print_to_stream(tabulate_pre(table))

        print_to_stream()
        print_to_stream("<b>Ideas</b>", file=tg_message_stream)

        tickers_with_exchange = list(
            {f"MOEX:{symbol}" for symbol in TICKERS} - set(my_tickers_with_exchange)
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
            tickers_with_recs.append(
                (
                    ticker,
                    hour_analysis[ticker].summary["RECOMMENDATION"],
                    day_analysis[ticker].summary["RECOMMENDATION"],
                )
            )
        tickers_with_recs = [
            (
                ticker[5:],
                day.replace("STRONG_BUY", "BUY_STR"),
                hour.replace("STRONG_BUY", "BUY_STR"),
            )
            for ticker, day, hour in tickers_with_recs
            if day in ("BUY", "STRONG_BUY") and hour in ("STRONG_BUY",)
        ]
        tickers_with_recs = sorted(
            tickers_with_recs,
            key=(key_func := lambda item: (item[1], item[2])),
            reverse=True,
        )
        tickers_with_recs = [
            ["", "rec_1d", "rec_1h"],
            *tickers_with_recs,
        ]

        print_to_stream(tabulate_pre(tickers_with_recs))

        TOKEN = os.getenv("TG_BOT_TOKEN")
        chat_id = os.getenv("TG_BOT_CHAT_ID")
        message = tg_message_stream.getvalue()
        message = (
            message
            # .replace(".", "\\.")
            # .replace("-", "\\-")
            # .replace(">", "\\>")
            # .replace("(", "\\(")
            # .replace(")", "\\)")
        )
        params = dict(chat_id=chat_id, text=message, parse_mode="HTML")
        url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?{urlencode(params)}"
        resp = requests.get(url)
        print(resp.json())  # this sends the message


if __name__ == "__main__":
    main()
