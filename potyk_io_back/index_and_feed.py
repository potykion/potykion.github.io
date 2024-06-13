import datetime
import sqlite3
from operator import attrgetter
from typing import ClassVar

import flask
import flask_wtf
from flask import render_template, url_for
from pydantic import BaseModel
from wtforms.fields.numeric import IntegerRangeField, IntegerField
from wtforms.fields.simple import StringField, HiddenField, TextAreaField

from potyk_io_back.beer import BeerStorage
from potyk_io_back.event import Event
from potyk_io_back.iter_utils import groupby_dict
from potyk_io_back.lazy import SimpleStorage
from potyk_io_back.q import Q
from potyk_io_back.utils.form import FieldRenderKw


class FeedForm(flask_wtf.Form):
    action = HiddenField(default="feed")
    category = StringField(
        label="Категория / Секция / Раздел", render_kw=FieldRenderKw(placeholder="Трек дня")
    )
    title = StringField(
        label="Заголовок", render_kw=FieldRenderKw(placeholder="Serum, The Riddler — Ain't No Way 2024")
    )
    desc = TextAreaField(label="Описание", render_kw=FieldRenderKw(placeholder="pizda lupasit"))
    desc_padding = IntegerRangeField(
        label="Размер описания (p-4)",
        render_kw=FieldRenderKw(min=0, max=4, step=4),
    )
    row_span = IntegerRangeField(
        label="Размер карточки (в строках)", render_kw=FieldRenderKw(min=1, max=4), default=1
    )
    url = StringField(label="Урл", render_kw=FieldRenderKw(placeholder="https://potyk.io"))
    youtube = StringField(
        label="YouTube Урл",
        render_kw=FieldRenderKw(placeholder="https://youtu.be/Uivp-hvk-nk?si=1dpVPQsZU9GAQn-X"),
    )
    youtube_height = IntegerField(label="YouTube Высота Плеера", render_kw=FieldRenderKw(placeholder="500"))
    rel_table = StringField(render_kw=FieldRenderKw(placeholder="beer"))
    rel_id = IntegerField(render_kw=FieldRenderKw(placeholder=32))
    video = StringField(label="Видосик (путь)", render_kw=FieldRenderKw(placeholder="video/april-fools.mp4"))
    audio = StringField(
        label="Аудио (путь)",
        render_kw=FieldRenderKw(placeholder="audio/Armond Hammer - The Key Is Under The Mat.opus"),
    )
    image = StringField(
        label="Картинка (путь)",
        render_kw=FieldRenderKw(placeholder="images/mu/Armand-Hammer-we-buy-diabetic-test-strips.webp"),
    )


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
        self.q = Q(self.sqlite_cur)
        self.simple_storage = SimpleStorage(sqlite_cur, "feed")

        self.beer_storage = BeerStorage(sqlite_cur)
        self.tech_storage = SimpleStorage(sqlite_cur, "tech_tools", model=TechTool)

    def list_by_date(self, date: datetime.date | str) -> list[FeedCard]:
        feed_items = self.simple_storage.list_all(where="date = ?", where_params=(date,))
        feed_items = [FeedCard(**item) for item in feed_items]

        self.prep_feed_items(feed_items)
        return feed_items

    def list_recent(
        self,
    ) -> list[FeedCard]:
        feed_items = self.q.select_all("select * from feed order by date desc limit 10")
        feed_items = [FeedCard(**item) for item in feed_items]

        self.prep_feed_items(feed_items)
        return feed_items

    def prep_feed_items(self, feed_items):
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


def add_index_page(app, deps):

    @app.route("/")
    def index_page():
        pages = deps.page_store.list_index()
        pages_by_section = groupby_dict(pages, attrgetter("section"))
        events = deps.q.select_all(
            "select * from events as e where e.date > date() order by date",
            as_=Event,
        )

        feed_items = deps.feed_storage.list_recent()
        feed_items = [item.model_dump(exclude=FeedCard.exclude_fields) for item in feed_items]

        return render_template(
            "index.html",
            pages_by_section=pages_by_section,
            page=deps.page,
            events=events,
            feed_items=feed_items,
        )

    @app.route("/feed/<index>")
    def feed_card_page(index: str):
        return flask.render_template(f"feed/{index}")
