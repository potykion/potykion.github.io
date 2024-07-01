import sqlite3

from pydantic import BaseModel, Field

from potyk_io_back.restaurants import Restaurant, rest_from_row
from potyk_io_back.services import sql


class Food(BaseModel):
    id: int
    title: str
    desc: str
    restaurant_ids: list[int]
    review: str | None
    market_ids: list[int]
    title_en: str | None
    cuisine: str | None

    restaurants: list[Restaurant] = Field(default_factory=list)

    @classmethod
    def from_sql(cls, row: sqlite3.Row) -> "Food":
        row = {**row}
        if row["restaurant_ids"]:
            row["restaurant_ids"] = list(map(int, row["restaurant_ids"].split(",")))
        else:
            row["restaurant_ids"] = []

        if row["market_ids"]:
            row["market_ids"] = list(map(int, row["market_ids"].split(",")))
        else:
            row["market_ids"] = []

        return cls(**row)


def set_restaurants_for_food(food: list[Food]) -> list[Food]:
    restaurants = sql().select_all("select * from restaurants", as_=rest_from_row)
    restaurant_by_id = {rest.id: rest for rest in restaurants}

    for food_item in food:
        food_item.restaurants = [restaurant_by_id[id_] for id_ in food_item.restaurant_ids]

    return food
