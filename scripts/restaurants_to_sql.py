import json
import sqlite3

from potyk_io_back.config import BASE_DIR

if __name__ == "__main__":
    sqlite_conn = sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False)
    sqlite_cur = sqlite_conn.cursor()

    with open("restaurants.json", encoding="utf-8") as f:
        restaurants = json.load(f)

    values = []
    for restaurant in restaurants:
        name = restaurant.get('Name')
        score = restaurant.get('Оценка')
        created = restaurant.get('Created time')
        url = restaurant.get('URL')
        visited = restaurant.get('Были?')
        location = ','.join(filter(None, restaurant.get('Метро / Доставка') or [restaurant.get('Город (не МСК)')] or []))
        price_range = restaurant.get("Цены")
        tags = ','.join(restaurant.get('Tags') or [])
        comment = restaurant.get('Коммент')
        values.append((name, score, created, url, visited, location, price_range, tags, comment))


    for values_line in values:
        sqlite_cur.execute(
            "INSERT INTO restaurants (name, score, created, url, visited, location, price_range, tags, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            values_line
        )
    sqlite_cur.connection.commit()
