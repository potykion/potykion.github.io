import dataclasses
import os
import re
from itertools import groupby
from pathlib import Path
from urllib.parse import urlparse

import flask
import frontmatter
import mistune
from flask import Flask, render_template, render_template_string
from tinydb import TinyDB

from potyk_io_back.content import read_content
from potyk_io_back.habits import make_habits_blueprint, HabitRepo
from potyk_io_back.notes import make_note_index, NoteDb
from potyk_io_back.stats import stats_blueprint
from potyk_io_back.todo import TodoRepo, make_todo_blueprint

SUPPORTED_ARTICLE_TYPES = (".html", ".md")


@dataclasses.dataclass
class Link:
    url: str
    name: str
    desc: str = ""


def youtube_embed(link: str):
    """
    >>> youtube_embed('https://youtu.be/PJPzhXXBMV8?si=5ZtyJ7ibg9Aa_j4R')
    '<iframe src="https://www.youtube.com/embed/PJPzhXXBMV8?si=5ZtyJ7ibg9Aa_j4R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
    """

    if re.match(r"https://youtu.be/(.+)?si=(.+)", link):
        id = link.rsplit("/", 1)[1]
    else:
        return ""
    return f'<iframe src="https://www.youtube.com/embed/{id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'


def create_app():
    app = Flask(__name__, template_folder="content")
    app.config["SERVER_NAME"] = "127.0.0.1:5000"

    with app.app_context():
        app.config["CONTENT"] = read_content(Path(app.template_folder))

        db = TinyDB("db.json")
        db = make_note_index(Path(app.template_folder) / "notes", db)
        note_db = NoteDb(db)

        task_db = TodoRepo(db)
        habit_repo = HabitRepo(db)

    app.register_blueprint(make_todo_blueprint(task_db))
    app.register_blueprint(stats_blueprint)
    app.register_blueprint(make_habits_blueprint(habit_repo))

    @app.context_processor
    def inject_ctx():
        return dict(
            content=app.config["CONTENT"],
            youtube_embed=youtube_embed,
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

        html, _ = _render_md_as_html(note.template_path)

        return _wrap_html_to_base_template(html, ctx)

    def _render_md_as_html(md_template):
        raw_md = render_template(md_template)
        md = frontmatter.loads(raw_md)
        html = mistune.html(
            md.content.replace('iframe width="560" height="315"', "iframe")
        )
        ctx = dict(md.metadata)
        return html, ctx

    def _wrap_html_to_base_template(html, ctx=None):
        ctx = ctx or {}
        return render_template_string(
            "{% extends 'templates/base.html' %}"
            "{% block main %}" + html + "{% endblock %}",
            **ctx,
        )

    @app.route("/special/<page_key>")
    def get_special(page_key: str):
        ctx = {"show_title": True, "show_desc": True}

        template = make_article_template_name(f"special/{page_key}")
        if template.endswith(".md"):

            html, md_ctx = _render_md_as_html(template)
            ctx.update(md_ctx)
            return _wrap_html_to_base_template(html, ctx)
        else:
            return render_template(template, **ctx)

    @app.route("/special/beer/<page_key>")
    def get_beer(page_key: str):
        ctx = {"show_title": True, "show_desc": True}

        template = make_article_template_name(f"special/beer/{page_key}")
        if template.endswith(".md"):

            html, md_ctx = _render_md_as_html(template)
            ctx.update(md_ctx)
            return _wrap_html_to_base_template(html, ctx)
        else:
            return render_template(template, **ctx)

    def make_article_template_name(article):
        if article.endswith(SUPPORTED_ARTICLE_TYPES):
            return article

        for ext in SUPPORTED_ARTICLE_TYPES:
            article_template_name = article + ext
            if os.path.exists(Path(app.template_folder) / article_template_name):
                return article_template_name

        return None

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

        template = make_article_template_name(f"stuff/recipes/{page_key}")
        if template.endswith(".md"):

            html, md_ctx = _render_md_as_html(template)
            ctx.update(md_ctx)
            return _wrap_html_to_base_template(html, ctx)
        else:
            return render_template(template, **ctx)

    return app
