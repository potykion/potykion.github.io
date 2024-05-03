import datetime
import sqlite3
from typing import ClassVar

from flask import Blueprint, render_template, url_for
from pydantic import BaseModel

from potyk_io_back.beer import BeerStorage, Beer
from potyk_io_back.lazy import SimpleStorage


class FeedCard(BaseModel):
    exclude_fields: ClassVar[set[str]] = {"rel_table", "rel_id"}

    category: str
    image: str | None = None
    image_width: int = 0
    image_padding: int = 0
    title: str | None = None
    audio: str | None = None
    desc: str | None = None
    desc_padding: int = 0
    row_span: int = 1
    url: str | None = None
    youtube: str | None = None
    youtube_height: int | None = None
    video: str | None = None

    rel_table: str | None
    rel_id: int | None


class TechTool(BaseModel):
    id: int
    title: str
    type: str
    tags: str | None = None
    desc: str | None = None
    url: str | None = None
    img: str | None = None


class FeedStorage:
    def __init__(self, sqlite_cur: sqlite3.Cursor):
        self.sqlite_cur = sqlite_cur
        self.simple_storage = SimpleStorage(sqlite_cur, "feed")

        self.beer_storage = BeerStorage(sqlite_cur)
        self.tech_storage = SimpleStorage(sqlite_cur, "tech_tools", model=TechTool)

    def list_by_date(self, date: datetime.date | str) -> list[FeedCard]:
        feed_items = self.simple_storage.list_all(where="date = ?", where_params=(date,))
        feed_items = [FeedCard(**item) for item in feed_items]

        for item in feed_items:
            if item.rel_table and item.rel_id:
                rel_item = None
                if item.rel_table == "beer":
                    rel_item = self.beer_storage.get_by_id(item.rel_id)
                if item.rel_table == "tech_tools":
                    rel_item = self.tech_storage.get_by_id(item.rel_id)

                if rel_item:
                    # item.title = rel_item[item.title]
                    for field in (
                        "image",
                        "title",
                        "audio",
                        "desc",
                        "url",
                        "youtube",
                        "video",
                    ):
                        rel_item_field = getattr(item, field)
                        if rel_item_field is not None:
                            if hasattr(rel_item, rel_item_field):
                                setattr(item, field, getattr(rel_item, rel_item_field))

        for item in feed_items:
            if item.image:
                item.image = url_for("static", filename=item.image)
            if item.audio:
                item.audio = url_for("static", filename=item.audio)
            if item.video:
                item.video = url_for("static", filename=item.video)
        return feed_items


def make_feed_blueprint(sqlite_cur: sqlite3.Cursor):
    feed_blueprint = Blueprint(
        "feed",
        __name__,
    )

    feed_storage = FeedStorage(sqlite_cur)

    @feed_blueprint.route("/feed/<date>")
    def feed(date: str):
        date = datetime.datetime.strptime(date, "%Y-%m-%d").date()
        feed_items = feed_storage.list_by_date(date)
        feed_items = [item.model_dump(exclude=FeedCard.exclude_fields) for item in feed_items]

        return render_template(
            f"feed/{date}.html",
            feed_date=date,
            prev_date=(date - datetime.timedelta(days=1) if date > datetime.date(2024, 3, 27) else None),
            next_date=(date + datetime.timedelta(days=1) if date < datetime.date.today() else None),
            feed_items=feed_items,
        )

    return feed_blueprint
