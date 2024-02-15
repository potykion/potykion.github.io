import os
from pathlib import Path

import frontmatter
import mistune
from flask import Flask, render_template, render_template_string
from tinydb import TinyDB
from tinydb.storages import MemoryStorage

from potyk_io_back.notes import make_note_index, NoteDb

SUPPORTED_ARTICLE_TYPES = (".html", ".md")


def create_app():
    app = Flask(__name__, template_folder="content")
    app.config["SERVER_NAME"] = "127.0.0.1:5000"

    with app.app_context():
        db = TinyDB(
            # "notes.json",
            storage=MemoryStorage,
        )
        db = make_note_index(Path(app.template_folder) / "notes", db)
        note_db = NoteDb(db)

    @app.route("/")
    def index():
        return render_template(
            "index.html", last_note_section=note_db.get_last_section()
        )

    @app.route("/notes")
    def notes():
        return render_template("notes/index.html", note_sections=note_db.list_all())

    @app.route("/special")
    def special():
        return render_template("special/index.html")

    @app.route("/notes/<note_key>")
    def get_note(note_key: str):
        note = note_db.get_note_by_key(note_key)

        ctx = {
            "show_title": True,
            **note.model_dump(),
        }

        html, _ = _render_md_as_html(note.template_path)

        return _wrap_html_to_base_template(html, ctx)

    def _render_md_as_html(md_template):
        raw_md = render_template(md_template)
        md = frontmatter.loads(raw_md)
        html = mistune.html(md.content.replace('iframe width="560" height="315"', 'iframe'))
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

    def make_article_template_name(article):
        if article.endswith(SUPPORTED_ARTICLE_TYPES):
            return article

        for ext in SUPPORTED_ARTICLE_TYPES:
            article_template_name = article + ext
            if os.path.exists(Path(app.template_folder) / article_template_name):
                return article_template_name

        return None

    return app
