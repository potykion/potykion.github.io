import datetime
import sqlite3

from flask import Blueprint, render_template
from pydantic import BaseModel


class Restaurant(BaseModel):
    id: int
    name: str
    score: float | None
    created: datetime.datetime
    url: str | None
    visited: bool
    location: list[str]
    price_range: str | None
    tags: list[str]
    comment: str | None


class RestaurantStorage:
    def __init__(self, sqlite_cur: sqlite3.Cursor) -> None:
        self.sqlite_cur = sqlite_cur

    def list_all(self, filters=None):
        q = "select id, name, score, created, url, visited, location, price_range, tags, comment from restaurants"

        if filters is not None:
            q += f" where {filters}"

        raw_restaurants = self.sqlite_cur.execute(q).fetchall()
        restaurants = [
            Restaurant(
                id=id,
                name=name,
                score=score,
                created=created,
                url=url,
                visited=visited,
                location=location.split(","),
                price_range=price_range,
                tags=tags.split(","),
                comment=comment,
            )
            for id, name, score, created, url, visited, location, price_range, tags, comment in raw_restaurants
        ]
        return restaurants


def make_restaurants_blueprint(
    sqlite_cur: sqlite3.Cursor,
):
    restaurants_blueprint = Blueprint("restaurants_blueprint", __name__)

    storage = RestaurantStorage(sqlite_cur)

    @restaurants_blueprint.route("/special/where-to-eat")
    def get_where_to_eat():
        restaurants = storage.list_all('visited = 1')
        restaurants = sorted(restaurants, key=lambda r: r.score, reverse=True)

        return render_template(
            f"special/where-to-eat.html",
            show_title=True,
            show_desc=True,
            restaurants=restaurants,
        )

    return restaurants_blueprint
