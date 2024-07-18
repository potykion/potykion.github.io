import json
import sqlite3

from pydantic import BaseModel

from potyk_io_back.config import BASE_DIR


class VkusvillItem(BaseModel):
    url: str
    title: str
    price: int


if __name__ == "__main__":
    with open("vkusvill_alco.json", encoding="utf-8") as f:
        raw_items = json.load(f)

    items = [VkusvillItem(**item) for item in raw_items]

    sqlite_conn = sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False)
    sqlite_cur = sqlite_conn.cursor()

    for item in items:
        try:
            sqlite_cur.execute(
                "insert into vkusvill_alco (url, title, price) values (?, ?, ?)",
                (item.url, item.title, item.price)
            )
        except sqlite3.IntegrityError:
            continue

    sqlite_conn.commit()
