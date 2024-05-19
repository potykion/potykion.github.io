import datetime
import enum
import sqlite3

from pydantic import BaseModel, ConfigDict

from potyk_io_back.q import Q


class MovieTag(enum.StrEnum):
    ru_teen = "ru-teen"
    en_teen = "en-teen"
    telki = "telki"
    rzhachka_strelyalka = "rzhachka-strelyalka"
    maniac = "maniac"
    criminal = "criminal"
    xtonb = "xtonb"
    narkotiki = "narkotiki"
    sex = "sex"
    shiza = "shiza"
    socialo4ka = "socialo4ka"
    scifi = "scifi"



class Movie(BaseModel):
    model_config = ConfigDict(frozen=True)

    id: int
    title: str
    title_eng: str | None
    kp_url: str
    watched_dt: datetime.datetime
    vote: int
    wishlist: bool
    is_series: bool
    poster: str
    review: str | None
    year: int
    tags: tuple[MovieTag | str, ...]


def parse_movie(row: sqlite3.Row) -> Movie:
    return Movie(
        **{
            **row,
            "tags": tuple(row["tags"].split(",") if row["tags"] else []),
        }
    )

class MovieList(BaseModel):
    movies: list[Movie]
    key: str
    title: str
    desc: str

class MovieStore:
    def __init__(self, sqlite_cursor: sqlite3.Cursor) -> None:
        self.q = Q(sqlite_cursor, select_all_as=parse_movie)
