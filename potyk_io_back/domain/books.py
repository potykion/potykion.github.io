import datetime
import enum

import mistune
from pydantic import BaseModel

from potyk_io_back.core.q import Q


class BookStatus(enum.StrEnum):
    wip = "wip"
    wishlist = "wishlist"
    done = "done"
    drop = "drop"


class Book(BaseModel):
    title: str | None
    author: str | None
    desc: str | None = ""
    pdf: str | None = ""
    bookmate: str | None = ""
    summary: str | None = ""
    title_en: str | None = ""
    url: str | None = ""
    status: BookStatus
    read_date: datetime.date | None = None

    summary_html: str = ""

    @property
    def title_w_author(self):
        return f"{self.author} — {self.title}"


class BookStore:
    def __init__(self, sqlite_cursor):
        self.sqlite_cursor = sqlite_cursor
        self.q = Q(self.sqlite_cursor, select_as=Book)

    def first_by_url(self, url):
        book: Book = self.q.select_one("select * from books where url = ?", params=(url,))
        book.summary_html = mistune.html(book.summary or "")
        return book

    def list_all(self) -> list[Book]:
        return self.q.select_all("select * from books order by read_date desc ")
