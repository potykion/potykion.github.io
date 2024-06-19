import datetime
import os
import sqlite3
from operator import attrgetter
from typing import ClassVar, cast

import flask
import flask_wtf
import mistune
from flask import render_template, url_for
from flask_wtf import FlaskForm
from markupsafe import Markup
from pydantic import BaseModel, Field
from werkzeug.datastructures import FileStorage
from wtforms import validators
from wtforms.fields.choices import RadioField, SelectField
from wtforms.fields.numeric import IntegerRangeField, IntegerField
from wtforms.fields.simple import StringField, HiddenField, TextAreaField, FileField
from wtforms.widgets.core import html_params, RadioInput

from potyk_io_back.beer import BeerStorage
from potyk_io_back.core import render_md_as_html
from potyk_io_back.event import Event
from potyk_io_back.iter_utils import groupby_dict
from potyk_io_back.lazy import SimpleStorage
from potyk_io_back.movie import MovieStore
from potyk_io_back.q import Q
from potyk_io_back.utils.form import FieldRenderKw


class FeedCard(BaseModel):
    exclude_fields: ClassVar[set[str]] = {"rel_table", "rel_id"}

    date: datetime.date = Field(default_factory=datetime.date.today)
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


class RadioListWidget:

    def __call__(self, field, **kwargs):
        # radio radio-primary
        kwargs.setdefault("id", field.id)
        kwargs["class"] = f'{kwargs.get("class", "")} form-control flex-row gap-2'
        html = [
            f"<div {html_params(**kwargs)}>",
            *(
                f'<label class="label cursor-pointer gap-2">'
                f'{subfield(**{"class": "radio radio-primary"})}'
                f'<div class="label-text min-w-12">{subfield.label}</div>'
                f"</label>"
                for subfield in field
            ),
            f"</div>",
        ]
        return Markup("".join(html))


class FeedForm(FlaskForm):
    action = HiddenField(default="feed")
    category = StringField(
        label="Категория / Секция / Раздел", render_kw=FieldRenderKw(placeholder="Трек дня")
    )
    title = StringField(
        label="Заголовок", render_kw=FieldRenderKw(placeholder="Serum, The Riddler — Ain't No Way 2024")
    )
    desc = TextAreaField(label="Описание", render_kw=FieldRenderKw(placeholder="pizda lupasit"))
    desc_format = RadioField(
        label="Описание: формат",
        choices=[("md", "md"), ("html", "html")],
        widget=RadioListWidget(),
        default="md",
    )

    desc_padding = IntegerRangeField(
        label="Описание: padding",
        render_kw=FieldRenderKw(min=0, max=4, step=4, steps=["p-2", "p-4"]),
        default=0,
    )
    row_span = IntegerRangeField(
        label="Карточка: row-span",
        render_kw=FieldRenderKw(min=1, max=6, steps=[f"row-span-{i}" for i in range(1, 6 + 1)]),
        default=1,
    )
    url = StringField(label="Урл", render_kw=FieldRenderKw(placeholder="https://potyk.io"))
    youtube = StringField(
        label="YouTube Урл",
        render_kw=FieldRenderKw(placeholder="https://youtu.be/Uivp-hvk-nk?si=1dpVPQsZU9GAQn-X"),
    )
    youtube_height = IntegerField(
        label="YouTube Высота Плеера",
        render_kw=FieldRenderKw(placeholder="500"),
        validators=[validators.Optional()],
    )
    rel_table = StringField(render_kw=FieldRenderKw(placeholder="beer"))
    rel_id = IntegerField(render_kw=FieldRenderKw(placeholder=32), validators=[validators.Optional()])
    video = StringField(label="Видосик (путь)", render_kw=FieldRenderKw(placeholder="video/april-fools.mp4"))
    audio = StringField(
        label="Аудио (путь)",
        render_kw=FieldRenderKw(placeholder="audio/Armond Hammer - The Key Is Under The Mat.opus"),
    )
    image = StringField(
        label="Картинка (путь)",
        render_kw=FieldRenderKw(placeholder="images/mu/Armand-Hammer-we-buy-diabetic-test-strips.webp"),
    )
    image_file = FileField(
        label="Картинка (файл)",
    )
    image_file_save_path = StringField(
        label="Картинка (путь, куда сохранять файл)",
        render_kw=FieldRenderKw(placeholder="images/feed/"),
    )


class RelFeedForm(FlaskForm):
    category = StringField(
        label="Категория / Секция / Раздел", render_kw=FieldRenderKw(placeholder="Трек дня")
    )
    rel_table = SelectField(
        "Табличка",
        choices=[
            ("beer", "beer"),
            ("movies", "movies"),
            ("tech_tools", "tech_tools"),
        ],
    )
    rel_id = IntegerField(render_kw=FieldRenderKw(placeholder=32), validators=[validators.Optional()])


def feed_card_from_form_data(form_data: dict, app: flask.Flask) -> FeedCard:
    if form_data["image_file"] and form_data["image_file_save_path"]:
        rel_path = form_data.pop("image_file_save_path")
        cast(FileStorage, form_data.pop("image_file")).save(
            os.path.join(app.static_folder, rel_path),
        )
        form_data["image"] = rel_path

    desc_format = form_data.pop("desc_format")
    if desc_format == "md":
        form_data["desc"] = mistune.html(form_data["desc"])
    return FeedCard(**form_data)


def feed_card_from_rel_form_data(form_data: dict) -> FeedCard:
    if form_data['rel_table'] == 'beer':
        form_data.update({
            'title': 'title',
            'desc': 'desc',
            'row_span': 2,
            'image_width': 20,
            'image': 'image',
            'url': 'untappd_url',
        })
    if form_data['rel_table'] == 'movies':
        form_data.update({
            "title": 'title',
            'desc': 'review',
            'row_span': 3,
            'image': 'poster'
        })
    if form_data['rel_table'] == 'tech_tools':
        form_data.update({
            'title': 'title',
            'desc': 'desc',
            'image': 'img',
            'image_padding': '4',
            'url': 'url',
        })

    return FeedCard(**form_data)


class TechTool(BaseModel):
    id: int
    title: str
    type: str
    tags: str | None = None
    desc: str | None = None
    url: str | None = None
    img: str | None = None


RelItemToFeedFieldMap = {
    "poster": "image",
    "untappd_url": "url",
    "review": "desc",
    "image": "image",
    "img": "image",
    "title": "title",
    "audio": "audio",
    "desc": "desc",
    "url": "url",
    "youtube": "youtube",
    "video": "video",
}


class FeedStorage:
    def __init__(self, sqlite_cur: sqlite3.Cursor):
        self.sqlite_cur = sqlite_cur
        self.q = Q(self.sqlite_cur)
        self.simple_storage = SimpleStorage(sqlite_cur, "feed")

        self.movie_store = MovieStore(sqlite_cur)
        self.beer_storage = BeerStorage(sqlite_cur)
        self.tech_storage = SimpleStorage(sqlite_cur, "tech_tools", model=TechTool)

    def insert(self, feed_card):
        self.q.execute(
            "insert into feed (date, category, title, desc, desc_padding, row_span, image, image_width, image_padding, url, audio, youtube, video, rel_table, rel_id, youtube_height)  "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ",
            params=(
                feed_card.date,
                feed_card.category,
                feed_card.title,
                feed_card.desc,
                feed_card.desc_padding,
                feed_card.row_span,
                feed_card.image,
                feed_card.image_width,
                feed_card.image_padding,
                feed_card.url,
                feed_card.audio,
                feed_card.youtube,
                feed_card.video,
                feed_card.rel_table,
                feed_card.rel_id,
                feed_card.youtube_height,
            ),
            commit=True,
        )

    def list_by_date(self, date: datetime.date | str) -> list[FeedCard]:
        feed_items = self.simple_storage.list_all(where="date = ?", where_params=(date,))
        feed_items = [FeedCard(**item) for item in feed_items]

        self.prep_feed_items(feed_items)
        return feed_items

    def list_recent(
            self,
    ) -> list[FeedCard]:
        feed_items = self.q.select_all("select * from feed order by id desc,    date desc limit 10")
        feed_items = [FeedCard(**item) for item in feed_items]

        self.prep_feed_items(feed_items)
        return feed_items

    def prep_feed_items(self, feed_items):
        for feed_item in feed_items:
            if feed_item.rel_table and feed_item.rel_id:
                rel_item = None
                if feed_item.rel_table == "beer":
                    rel_item = self.beer_storage.get_by_id(feed_item.rel_id)
                if feed_item.rel_table == "movies":
                    rel_item = self.movie_store.get_by_id(feed_item.rel_id)
                if feed_item.rel_table == "tech_tools":
                    rel_item = self.tech_storage.get_by_id(feed_item.rel_id)

                if rel_item:
                    for rel_field, feed_field in RelItemToFeedFieldMap.items():
                        if hasattr(rel_item, rel_field):
                            setattr(
                                feed_item,
                                feed_field,
                                getattr(rel_item, rel_field),
                            )

        for feed_item in feed_items:
            if feed_item.image:
                feed_item.image = url_for("static", filename=feed_item.image)
            if feed_item.audio:
                feed_item.audio = url_for("static", filename=feed_item.audio)
            if feed_item.video and not feed_item.video.startswith(('blob', 'http', 'https')):
                feed_item.video = url_for("static", filename=feed_item.video)


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
