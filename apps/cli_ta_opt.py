import sqlite3
from functools import cached_property
from pathlib import Path

import numpy as np
import xgboost as xgb
from skimage.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from hyperopt import fmin, tpe, hp, STATUS_OK, Trials

from potyk_io_back.core import BASE_DIR
from potyk_io_back.tv_ta.tv_ta import PredictionRepo, AnalysisRepo


class Deps:
    db = "tv_ta.db"
    table = "ta_indicators_1h"
    prediction_scores_table = "ta_prediction_scores_1h"

    # json_files_dir = Path(r"C:\Users\admin\Downloads\Telegram Desktop")
    json_files_dir = Path(__file__).parent.absolute()

    @cached_property
    def sqlite_conn(self):
        return sqlite3.connect(BASE_DIR / self.db, check_same_thread=False)

    @cached_property
    def sqlite_cursor(self):
        return self.sqlite_conn.cursor()

    @property
    def analysis_repo(self):
        return AnalysisRepo(self.sqlite_cursor, table=self.table)

    @property
    def prediction_repo(self):
        return PredictionRepo()


def main(deps: Deps):
    analysis_to_train = deps.analysis_repo.list_train_samples()
    X = deps.prediction_repo.analysis_to_X_df(analysis_to_train)
    y = deps.prediction_repo.analysis_to_y_df(analysis_to_train)

    # 100%|██████████| 50/50 [01:39<00:00,  1.99s/trial, best loss: 0.9877484656798527]
    # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # 100%|██████████| 50/50 [01:24<00:00,  1.70s/trial, best loss: 0.956050298053705]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=41)

    def objective(params):
        preds = deps.prediction_repo.predict(X_train, y_train, X_test, params=params, to_list=False)

        rmse = np.sqrt(mean_squared_error(y_test, preds))

        return {"loss": rmse, "status": STATUS_OK}

    space = {
        "max_depth": hp.quniform("max_depth", 1, 15, 1),  # Increased max depth range
        "learning_rate": hp.loguniform("learning_rate", np.log(0.001), np.log(0.5)),  # Broader learning rate range
        "n_estimators": hp.quniform("n_estimators", 50, 1000, 50),  # Increased n_estimators range
        "subsample": hp.uniform("subsample", 0.1, 1.0),  # Adjusted subsample range
        "colsample_bytree": hp.uniform("colsample_bytree", 0.1, 1.0),  # Adjusted colsample_bytree range
        "reg_alpha": hp.uniform("reg_alpha", 0, 10),  # Increased reg_alpha range
        "reg_lambda": hp.uniform("reg_lambda", 0, 10),  # Increased reg_lambda range
        "min_child_weight": hp.quniform("min_child_weight", 1, 10, 1),
        "gamma": hp.loguniform("gamma", np.log(0.1), np.log(1)),
    }

    trials = Trials()
    best_params = fmin(fn=objective, space=space, algo=tpe.suggest, max_evals=100, trials=trials, show_progressbar=True)

    print("Best Params:", best_params)


if __name__ == "__main__":
    main(Deps())
