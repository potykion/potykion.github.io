import json
import sqlite3
from pathlib import Path

from potyk_io_back.core import BASE_DIR
from potyk_io_back.tv_ta.tv_ta import AnalysisRepo, Analysis


def main():
    # dir_ = Path(r"C:\Users\admin\Downloads\Telegram Desktop")
    dir_ = Path(__file__).parent.absolute()
    json_files = [
        # 'ta_2024-05-28_17-02-14.json',
        # ...,
    ]
    assert json_files, "No json_files set!"

    sqlite_conn = sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False)
    sqlite_cursor = sqlite_conn.cursor()

    repo_1h = AnalysisRepo(sqlite_cursor, table="ta_indicators_1h")

    for file in json_files:
        path = dir_ / file
        with open(path, "r", encoding="utf-8") as f:
            raw_indicators = json.load(f)

        new_sample = repo_1h.get_last_sample() + 1

        new_samples = [Analysis(**ind).model_copy(update=dict(sample=new_sample)) for ind in raw_indicators]

        repo_1h.insert_samples(samples=new_samples)


if __name__ == "__main__":
    main()
