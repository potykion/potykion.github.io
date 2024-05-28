"""
Проставляет изменения тикеров, считает точность предсказаний, делает новые предсказания
"""

import datetime
import sqlite3
import time

from tabulate import tabulate
from tradingview_ta import Interval

from potyk_io_back.core import BASE_DIR
from potyk_io_back.tv_ta.tickers import TICKERS
from potyk_io_back.tv_ta.tv_ta import (
    AnalysisRepo,
    TAAnalysisRepo,
    PredictionRepo,
)


def main():
    db = "tv_ta.db"
    sqlite_conn = sqlite3.connect(BASE_DIR / db, check_same_thread=False)
    sqlite_cursor = sqlite_conn.cursor()

    # 1d
    # repo = AnalysisRepo(sqlite_cursor)
    # ta_repo = TAAnalysisRepo()
    # load_set_predict_loop(repo, ta_repo)

    # 1h loop
    repo_1h = AnalysisRepo(sqlite_cursor, table="ta_indicators_1h")
    ta_repo_1h = TAAnalysisRepo(Interval.INTERVAL_1_HOUR)
    interval_minutes = 60

    prediction_repo = PredictionRepo()

    load_set_predict_loop(repo_1h, ta_repo_1h, prediction_repo)

    # while True:
    #     # 10:00 > 10:01
    #     now = datetime.datetime.now()
    #
    #     if now.hour >= 19:
    #         break
    #
    #     if now.minute == 0:
    #         time.sleep(1 * 60)
    #
    #     print(now)
    #
    #     load_set_predict_loop(repo_1h, ta_repo_1h, prediction_repo)
    #
    #     til = now + datetime.timedelta(minutes=interval_minutes)
    #     print(f"Sleep til {til}...")
    #     time.sleep(interval_minutes * 60)


def load_set_predict_loop(repo, ta_repo_5m, prediction_repo):
    # print("load_sample...")
    # load_sample(repo, ta_repo_5m)
    # print()

    print("set_change_next...")
    set_change_next(repo)
    print()

    print("predict...")
    predict(repo, prediction_repo)
    print()

    print("Done!")


def load_sample(repo: AnalysisRepo, ta_repo: TAAnalysisRepo):
    analysis_samples = ta_repo.load_samples(
        TICKERS,
        dt=datetime.datetime.now(),
        sample=repo.get_last_sample() + 1,
    )
    repo.insert_samples(analysis_samples)


def set_change_next(repo: AnalysisRepo):
    last_sample = repo.get_last_sample()
    if last_sample < 2:
        return

    with repo.q.commit_after():
        repo.update_change_next()

    last_sample_w_pred = repo.get_last_sample_w_prediction()
    if last_sample_w_pred < 3:
        return
    print("prev prediction results:")
    results = repo.list_prediction_results(last_sample_w_pred)
    print(tabulate(results))

    accuracy, rmse, r2 = repo.get_prediction_scores(last_sample_w_pred)
    print(f"score: accuracy📈 = {accuracy}; RMSE📉 = {rmse}; R2📈0️⃣ = {r2}")
    repo.insert_prediction_scores(accuracy, rmse, r2)


def predict(repo: AnalysisRepo, predict_repo: PredictionRepo):
    last_sample = repo.get_last_sample()
    if last_sample < 2:
        return

    analysis_to_train = repo.list_train_samples()
    analysis_to_predict = repo.list_predict_samples()

    predictions = predict_repo.predict(analysis_to_train, analysis_to_predict)

    with repo.q.commit_after():
        for anal, pred in zip(analysis_to_predict, predictions):
            repo.update_prediction(anal.id, pred)

    last_sample = repo.get_last_sample()
    print("new predictions:")
    results = repo.list_predictions(last_sample)
    print(tabulate(results))


if __name__ == "__main__":
    main()
