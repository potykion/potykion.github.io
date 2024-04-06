import csv
import json
import numbers

import yfinance as yf


def get_yf_data(tickers):
    ticker_infos = []
    for index, ticker in enumerate(tickers):
        ticker_info = yf.Ticker(f"{ticker}.ME").info
        ticker_infos.append(ticker_info)
        print(f"{index + 1} / {len(tickers)}: {ticker}")

        with open("ticker_infos.json", "w", encoding="utf-8") as f:
            json.dump(ticker_infos, f, indent=2, ensure_ascii=False)


tickers = [
    "RNFT",
    "SFIN",
    "MAGN",
    "RUAL",
    "VTBR",
    "NVTK",
    "CHMF",
    "MTLR",
    "ROSN",
    "EUTR",
    "LKOH",
    "PLZL",
    "VKCO",
    "AFLT",
    "GAZP",
    "SBER",
    "UGLD",
    "AFKS",
    "LEAS",
    "IRAO",
    "POSI",
    "TCSG",
    "WUSH",
    "OZON",
    "RBCM",
    "RKKE",
    "SNGS",
    "YNDX",
    "MOEX",
    "LSRG",
    "GCHE",
    "NLMK",
    "SIBN",
    "ABIO",
    "OKEY",
    "TATN",
    "VSMO",
    "ALRS",
    "SNGSP",
    "DELI",
    "GLTR",
    "SMLT",
    "ASTR",
    "MGNT",
    "FESH",
    "SVCB",
    "RTKM",
    "FLOT",
    "TRNFP",
    "FIXP",
    "SELG",
    "BANEP",
    "HHRU",
    "TATNP",
    "TRMK",
    "UWGN",
    "FEES",
    "SGZH",
    "PIKK",
    "PHOR",
    "MTSS",
    "RASP",
    "ENPG",
    "ETLN",
    "MSNG",
    "BANE",
    "MVID",
    "DVEC",
    "SBERP",
    "IRKT",
    "AGRO",
    "CARM",
    "ROLO",
    "BELU",
    "APTK",
    "UPRO",
    "UNAC",
    "MDMG",
    "GEMC",
    "OGKB",
    "MTLRP",
    "BSPB",
    "HNFG",
    "AQUA",
    "POLY",
    "LENT",
    "HYDR",
    "GECO",
    "UNKL",
    "SOFL",
    "SPBE",
    "PRFN",
    "KROT",
    "RTKMP",
    "RENI",
    "MSRS",
    "GTRK",
    "CBOM",
    "DIAS",
    "MSTT",
    "LIFE",
    "ELFV",
    "CIAN",
    "KMAZ",
    "ABRD",
    "DSKY",
    "TGKBP",
    "NMTP",
    "BLNG",
    "SVAV",
    "MRKY",
    "TGKA",
    "CHMK",
    "MRKC",
    "CNTL",
    "KZOSP",
    "MRKZ",
    "VRSB",
    "LSNGP",
    "MRKV",
    "TTLK",
    "TGKN",
    "QIWI",
    "NSVZ",
    "MGTSP",
    "NKNC",
    "KAZT",
    "LNZLP",
    "MRKP",
    "NKNCP",
    "NKHP",
    "MRKU",
    "KZOS",
    "MRKS",
    "YAKG",
    "MGKL",
    "CNTLP",
    "LNZL",
    "LSNG",
    "TGKB",
    "AMEZ",
    "KLSB",
    "PMSB",
    "KAZTP",
    "PMSBP",
    "KRKNP",
    "VEON-RX",
    "AKRN",
    "ZAYM",
]

fields = [
    "fullTimeEmployees",
    "maxAge",
    "priceHint",
    "previousClose",
    "open",
    "dayLow",
    "dayHigh",
    "regularMarketPreviousClose",
    "regularMarketOpen",
    "regularMarketDayLow",
    "regularMarketDayHigh",
    "trailingPE",
    "volume",
    "regularMarketVolume",
    "bid",
    "ask",
    "marketCap",
    "fiftyTwoWeekLow",
    "fiftyTwoWeekHigh",
    "priceToSalesTrailing12Months",
    "fiftyDayAverage",
    "twoHundredDayAverage",
    "enterpriseValue",
    "profitMargins",
    "sharesOutstanding",
    "heldPercentInsiders",
    "impliedSharesOutstanding",
    "bookValue",
    "priceToBook",
    "lastFiscalYearEnd",
    "nextFiscalYearEnd",
    "mostRecentQuarter",
    "netIncomeToCommon",
    "trailingEps",
    "enterpriseToRevenue",
    "enterpriseToEbitda",
    "SandP52WeekChange",
    "firstTradeDateEpochUtc",
    "gmtOffSetMilliseconds",
    "totalCash",
    "totalCashPerShare",
    "ebitda",
    "totalDebt",
    "totalRevenue",
    "debtToEquity",
    "revenuePerShare",
    "revenueGrowth",
    "grossMargins",
    "ebitdaMargins",
    "operatingMargins",
]


def to_csv():
    with open("ticker_infos.json", "r", encoding="utf-8") as f:
        ticker_infos = json.load(f)
        ticker_infos_only_numbers = [
            {
                key: val
                for key, val in ticker.items()
                if isinstance(val, numbers.Number) or key == "symbol"
            }
            for ticker in ticker_infos
        ]
    with open(
        "ticker_infos_numbers.csv",
        "w",
        encoding="utf-8",
    ) as f:
        writer = csv.writer(f)

        writer.writerow(["symbol", *fields, "currentPrice"])

        for ticker in ticker_infos_only_numbers:
            if not ticker.get("currentPrice"):
                print(ticker["symbol"])
                continue

            writer.writerow(
                [
                    ticker["symbol"],
                    *[ticker.get(field, 0) for field in fields],
                    ticker["currentPrice"],
                ]
            )


import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import (
    RandomForestRegressor,
)  # Replace with your preferred model


def train_valuation_model(data_path, target_col, feature_cols):
    """
    Trains a machine learning model for stock valuation.

    Args:
        data_path (str): Path to the CSV file containing stock data.
        target_col (str): Name of the column containing the current stock price.
        feature_cols (list): List of column names representing features for valuation.

    Returns:
        sklearn.base.BaseEstimator: The trained valuation model.
    """

    df = pd.read_csv(data_path)
    X = df[feature_cols]
    y = df[target_col]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestRegressor()  # Replace with your preferred model
    model.fit(X_train, y_train)

    return model


def predict_fair_prices(model, data_path, target_col, feature_cols, output_path):
    """
    Predicts fair prices for stocks using the trained model.

    Args:
        model (sklearn.base.BaseEstimator): The trained valuation model.
        data_path (str): Path to the CSV file containing stock data.
        target_col (str): Name of the column containing the current stock price.
        feature_cols (list): List of column names representing features for valuation.
        output_path (str): Path to save the CSV file with fair prices.
    """

    df = pd.read_csv(data_path)
    X = df[feature_cols]

    fair_prices = model.predict(X)
    df["fairPrice"] = fair_prices
    df["price_diff_pct"] = (df["fairPrice"] - df[target_col]) / df[target_col] * 100
    relevant_cols = ["symbol", target_col, "fairPrice", "price_diff_pct"]
    df = df[relevant_cols]

    df.to_csv(output_path, index=False)


if __name__ == "__main__":
    data_path = "ticker_infos_numbers.csv"  # Replace with your CSV file path
    target_col = "currentPrice"  # Column containing current stock price
    feature_cols = fields
    output_path = "stock_valuations_2.csv"  # Path to save the CSV with fair prices

    model = train_valuation_model(data_path, target_col, feature_cols)
    predict_fair_prices(model, data_path, target_col, feature_cols, output_path)

    print("Fair price predictions saved to:", output_path)
