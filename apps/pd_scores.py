"""
Строит график метрик предсказаний
"""

import sqlite3

import pandas as pd
import matplotlib.pyplot as plt

from potyk_io_back.core import BASE_DIR


def plot(df):
    plt.figure(figsize=(10, 6))

    plt.plot(df["dt"], df["accuracy"], label="Accuracy📈")
    plt.plot(df["dt"], df["rmse"], label="RMSE📉")
    plt.plot(df["dt"], df["r2"], label="R^2📈0️⃣")

    plt.xlabel("Date-Time")
    plt.ylabel("Value")
    plt.title("Line Chart of Accuracy, RMSE, and R^2 over Time")
    plt.legend()

    plt.xticks([])

    plt.show()


def read_table_as_df(db, table):
    conn = sqlite3.connect(BASE_DIR / db, check_same_thread=False)
    df = pd.read_sql_query(f"SELECT * FROM {table}", conn)
    conn.close()
    return df


if __name__ == "__main__":
    db = "tv_ta.db"
    table = "ta_prediction_scores_1h"
    df = read_table_as_df(db, table)

    plot(df)
