import dataclasses
import datetime
import os
import re
import sqlite3
from pathlib import Path

import flask
from flask import Flask, render_template
from tinydb import TinyDB

from potyk_io_back.beer import make_beer_blueprint
from potyk_io_back.content import read_content
from potyk_io_back.core import (
    BASE_DIR,
    render_md_as_html,
    wrap_html_to_base_template,
    make_article_template_name,
)
from potyk_io_back.habits import make_habits_blueprint, HabitRepo
from potyk_io_back.notes import make_note_index, NoteDb
from potyk_io_back.restaurants import make_restaurants_blueprint
from potyk_io_back.stats import stats_blueprint
from potyk_io_back.todo import TodoRepo, make_todo_blueprint
from potyk_io_back.wishlist import make_wishlist_blueprint


@dataclasses.dataclass
class Link:
    url: str
    name: str
    desc: str = ""


def youtube_embed(link: str):
    """
    >>> youtube_embed('https://youtu.be/PJPzhXXBMV8?si=5ZtyJ7ibg9Aa_j4R')
    '<iframe src="https://www.youtube.com/embed/PJPzhXXBMV8?si=5ZtyJ7ibg9Aa_j4R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    >>> youtube_embed('https://www.youtube.com/watch?v=j9cPe8Y7Rzk')
    '<iframe src="https://www.youtube.com/embed/j9cPe8Y7Rzk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

    """

    if re.match(r"https://youtu.be/(.+)?si=(.+)", link):
        id = link.rsplit("/", 1)[1]
    elif re.match(r"https://www\.youtube\.com/watch\?v=(.+)", link):
        id = link.rsplit("=")[1]
    else:
        return ""
    return f'<iframe src="https://www.youtube.com/embed/{id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'


def today_shift(shift_days: int) -> datetime.date:
    return datetime.date.today() + datetime.timedelta(days=shift_days)


def create_app():
    app = Flask(__name__, template_folder="content")
    app.config["SERVER_NAME"] = "127.0.0.1:5000"
    # app.config["SERVER_NAME"] = "192.168.1.8:5000"

    app.jinja_env.globals.update(
        dict(
            youtube_embed=youtube_embed,
            today_shift=today_shift,
            today_day=datetime.date.today().weekday(),
            today_date=datetime.date.today(),
        )
    )

    with app.app_context():
        app.config["CONTENT"] = read_content(Path(app.template_folder))

        db = TinyDB("db.json")
        db = make_note_index(Path(app.template_folder) / "notes", db)
        note_db = NoteDb(db)

        task_db = TodoRepo(db)
        habit_repo = HabitRepo(db)

    sqlite_conn = sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False)
    sqlite_cur = sqlite_conn.cursor()

    app.register_blueprint(make_todo_blueprint(task_db))
    app.register_blueprint(stats_blueprint)
    app.register_blueprint(make_habits_blueprint(habit_repo, sqlite_cur))
    app.register_blueprint(make_wishlist_blueprint(sqlite_cur))
    app.register_blueprint(make_restaurants_blueprint(sqlite_cur))
    app.register_blueprint(make_beer_blueprint(sqlite_cur))

    @app.context_processor
    def inject_ctx():
        return dict(
            content=app.config["CONTENT"],
            is_prod=os.getenv("FLASK_ENV") == "prod",
        )

    @app.route("/")
    def index():
        return render_template(
            "index.html",
            links=dict(
                soc=[
                    Link(
                        "https://t.me/potykion",
                        "Телега",
                        "Напиши мне все, что обо мне думаешь",
                    ),
                    Link(
                        "https://www.instagram.com/potyk.art",
                        "Рисовашки",
                        "Рисую чертей по фану",
                    ),
                    Link(
                        "https://untappd.com/user/potykion",
                        "Выпивашки",
                        "Пью пивчик, иногда вкусный",
                    ),
                    Link(
                        "https://rateyourmusic.com/~potykion",
                        "Музыкашки",
                        "Иногда слушаю музыку и реагирую на нее",
                    ),
                ]
            ),
        )

    @app.route("/notes")
    def notes():
        return render_template(
            "notes/index.html",
        )

    @app.route("/special")
    def special():
        return render_template(
            "special/index.html",
        )

    @app.route("/notes/<note_key>")
    def get_note(note_key: str):
        try:
            note = note_db.get_note_by_key(note_key)
        except StopIteration:
            flask.abort(404)

        ctx = {
            "show_title": True,
            **note.model_dump(),
            "note_tags": note.tags,
        }

        html, _ = render_md_as_html(note.template_path)

        return wrap_html_to_base_template(html, ctx)

    @app.route("/special/<page_key>")
    def get_special(page_key: str):
        ctx = {"show_title": True, "show_desc": True}

        template = make_article_template_name(f"special/{page_key}", app)
        if template.endswith(".md"):

            html, md_ctx = render_md_as_html(template)
            ctx.update(md_ctx)
            return wrap_html_to_base_template(html, ctx)
        else:
            return render_template(template, **ctx)

    @app.route("/drafts")
    def drafts_index():
        return render_template(
            "drafts/index.html",
        )

    @app.route("/drafts/<page_key>")
    def drafts_page(page_key: str):
        ctx = {"show_title": True, "show_desc": True}

        template = make_article_template_name(f"drafts/{page_key}")
        if template.endswith(".md"):

            html, md_ctx = render_md_as_html(template)
            ctx.update(md_ctx)
            return wrap_html_to_base_template(html, ctx)
        else:
            return render_template(template, **ctx)

    @app.get("/stuff")
    def stuff():
        return render_template(
            "stuff/index.html",
        )

    @app.get("/stuff/recipes")
    def stuff_recipes():
        return render_template("stuff/recipes/index.html")

    @app.get("/stuff/recipes/<page_key>")
    def stuff_recipe(page_key: str):
        ctx = {"show_title": True, "show_desc": True}

        template = make_article_template_name(f"stuff/recipes/{page_key}", app)
        if template.endswith(".md"):

            html, md_ctx = render_md_as_html(template)
            ctx.update(md_ctx)
            return wrap_html_to_base_template(html, ctx)
        else:
            return render_template(template, **ctx)

    return app
