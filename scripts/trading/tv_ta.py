from tradingview_ta import TA_Handler, Interval, Exchange, get_multiple_analysis


def day_and_hour_analysis_to_csv():
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

    rows = [
        (
            "symbol",
            "sell_1d",
            "neutral_1d",
            "buy_1d",
            "recommendation_1d",
            "sell_1h",
            "neutral_1h",
            "buy_1h",
            "recommendation_1h",
        )
    ]
    for symbol in tickers_with_exchange:
        day_summary = day_analysis.get(symbol)
        hour_summary = hour_analysis.get(symbol)
        if not day_summary or not hour_summary:
            continue

        row = [
            symbol,
            day_summary.summary["SELL"],
            day_summary.summary["NEUTRAL"],
            day_summary.summary["BUY"],
            day_summary.summary["RECOMMENDATION"],
            hour_summary.summary["SELL"],
            hour_summary.summary["NEUTRAL"],
            hour_summary.summary["BUY"],
            hour_summary.summary["RECOMMENDATION"],
        ]
        rows.append(row)

    import csv

    with open("recs.csv", "w") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerows(rows)


def month_analysis_to_csv(tickers_with_exchange):
    month_analysis = get_multiple_analysis(
        screener="russia",
        interval=Interval.INTERVAL_1_MONTH,
        symbols=tickers_with_exchange,
    )

    rows = [
        (
            "symbol",
            "sell_1m",
            "neutral_1m",
            "buy_1m",
            "recommendation_1m",
        )
    ]
    for symbol in tickers_with_exchange:
        sum = month_analysis.get(symbol)
        if not sum:
            continue

        row = [
            symbol,
            sum.summary["SELL"],
            sum.summary["NEUTRAL"],
            sum.summary["BUY"],
            sum.summary["RECOMMENDATION"],
        ]
        rows.append(row)

    import csv

    with open("recs-month.csv", "w") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerows(rows)

if __name__ == '__main__':

    tickers = [
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
        "LEAS",
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
        "ZAYM",
    ]

    tickers_with_exchange = [f"MOEX:{symbol}" for symbol in tickers]
    month_analysis_to_csv(tickers_with_exchange)

    s = "as"

# print(TradingView.search("bspb"))

# from tradingview_ta import TA_Handler, Interval, Exchange
#
# tesla = TA_Handler(
#     symbol="BSPB",
#     screener="russia",
#     exchange="MOEX",
#     interval=Interval.INTERVAL_1_DAY
# )
# print(tesla.get_analysis().summary)
# # Example output: {"RECOMMENDATION": "BUY", "BUY": 8, "NEUTRAL": 6, "SELL": 3}
