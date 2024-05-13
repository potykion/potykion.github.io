import csv
import datetime
import decimal
import time

from tradingview_ta import get_multiple_analysis, Interval

from scripts.trading.bot import TradingViewService, TICKERS

TA_1H_CSV = "ta_1h.csv"

indicators = """Recommend.Other,Recommend.All,Recommend.MA,RSI,RSI[1],Stoch.K,Stoch.D,Stoch.K[1],Stoch.D[1],CCI20,CCI20[1],ADX,ADX+DI,ADX-DI,ADX+DI[1],ADX-DI[1],AO,AO[1],Mom,Mom[1],MACD.macd,MACD.signal,Rec.Stoch.RSI,Stoch.RSI.K,Rec.WR,W.R,Rec.BBPower,BBPower,Rec.UO,UO,close,EMA5,SMA5,EMA10,SMA10,EMA20,SMA20,EMA30,SMA30,EMA50,SMA50,EMA100,SMA100,EMA200,SMA200,Rec.Ichimoku,Ichimoku.BLine,Rec.VWMA,VWMA,Rec.HullMA9,HullMA9,Pivot.M.Classic.S3,Pivot.M.Classic.S2,Pivot.M.Classic.S1,Pivot.M.Classic.Middle,Pivot.M.Classic.R1,Pivot.M.Classic.R2,Pivot.M.Classic.R3,Pivot.M.Fibonacci.S3,Pivot.M.Fibonacci.S2,Pivot.M.Fibonacci.S1,Pivot.M.Fibonacci.Middle,Pivot.M.Fibonacci.R1,Pivot.M.Fibonacci.R2,Pivot.M.Fibonacci.R3,Pivot.M.Camarilla.S3,Pivot.M.Camarilla.S2,Pivot.M.Camarilla.S1,Pivot.M.Camarilla.Middle,Pivot.M.Camarilla.R1,Pivot.M.Camarilla.R2,Pivot.M.Camarilla.R3,Pivot.M.Woodie.S3,Pivot.M.Woodie.S2,Pivot.M.Woodie.S1,Pivot.M.Woodie.Middle,Pivot.M.Woodie.R1,Pivot.M.Woodie.R2,Pivot.M.Woodie.R3,Pivot.M.Demark.S1,Pivot.M.Demark.Middle,Pivot.M.Demark.R1,open,P.SAR,BB.lower,BB.upper,AO[2],volume,change,low,high""".split(
    ","
)


def day():
    analysis_day = get_multiple_analysis(
        screener="russia",
        interval=Interval.INTERVAL_1_DAY,
        symbols=tickers_w_exchange,
    )
    rows_day = [
        (
            ticker,
            *(ticker_analysis.indicators[key] for key in indicators),
        )
        for ticker, ticker_analysis in analysis_day.items()
    ]
    with open("ta_1d.csv", mode="a", newline="") as file:
        writer = csv.writer(file)

        # cols
        # writer.writerow(['Ticker', *indicators])

        writer.writerows(rows_day)


def hour():
    analysis_hour = get_multiple_analysis(
        screener="russia",
        interval=Interval.INTERVAL_1_HOUR,
        symbols=tickers_w_exchange,
    )

    rows_hour = [
        (
            ticker,
            *(ticker_analysis.indicators[key] for key in indicators),
        )
        for ticker, ticker_analysis in analysis_hour.items()
    ]

    with open(TA_1H_CSV, mode="a", newline="") as file:
        writer = csv.writer(file)

        # cols
        # writer.writerow(['Ticker', *indicators])

        writer.writerows(rows_hour)


def set_change_after_hour():
    with open(TA_1H_CSV) as f:
        reader = csv.reader(f)

        headers = next(reader)
        rows = list(reader)

        for index, row in enumerate(rows):
            try:
                change_after_hour = 93
                change = 89
                close = indicators.index("close")

                next_hour = rows[index + len(TICKERS)]
                cur_close = decimal.Decimal(row[close])
                close_next_hour = decimal.Decimal(next_hour[close])
                change = str((close_next_hour - cur_close) / cur_close)

                if len(row) != change_after_hour:
                    row.append(change)
                else:
                    row[change_after_hour - 1] = change

            except IndexError:
                break

    with open(TA_1H_CSV, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)


while True:
    tickers_w_exchange = TradingViewService().make_ticker_w_exchange(TICKERS)

    now = datetime.datetime.now()
    print(f"Getting 1h TA for {now}...")
    hour()
    set_change_after_hour()
    print("Done")

    till = now + datetime.timedelta(hours=1)
    print(f"Sleep till {till}...")
    time.sleep(60 * 60)
