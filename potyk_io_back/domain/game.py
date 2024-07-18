import datetime
from typing import Callable

from pydantic import BaseModel

from potyk_io_back.core.q import SqliteConnOrCursor, QQ, Q


class Game(BaseModel):
    id: int
    title: str
    img: str
    genre: str
    steam: str
    review: str
    played_date: datetime.date | None
    wishlist: bool | None


GameStore: Callable[[SqliteConnOrCursor], QQ[Game]] = QQ.factory(
    table="games",
    cursor_factory=Q.factory(select_as=Game),
)
