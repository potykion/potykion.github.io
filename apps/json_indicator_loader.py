import json
import sqlite3
import datetime
from pathlib import Path
from typing import TypedDict

from potyk_io_back.core import BASE_DIR
from potyk_io_back.tv_ta.tv_ta import AnalysisRepo, Analysis


def parse_dt_from_json_filename(filename: str) -> datetime.datetime:
    """
    >>> parse_dt_from_json_filename("ta_2024-05-27_19-02-33.json")
    datetime.datetime(2024, 5, 27, 19, 2, 33)
    """
    filename = filename[len("ta_") : -len(".json")]
    return datetime.datetime.strptime(filename, "%Y-%m-%d_%H-%M-%S")


async def main():
    dir_ = Path(r"C:\Users\admin\Downloads\Telegram Desktop")
    json_files = [
        "ta_2024-05-27_19-02-33.json",
        "ta_2024-05-28_10-02-18.json",
        "ta_2024-05-28_11-02-15.json",
        "ta_2024-05-28_12-02-15.json",
        "ta_2024-05-28_13-02-15.json",
        "ta_2024-05-28_14-02-13.json",
        "ta_2024-05-28_15-02-15.json",
        "ta_2024-05-28_16-02-15.json",
    ]

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
