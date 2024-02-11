import dataclasses
import os.path
from pathlib import Path

import flask
import frontmatter
import mistune
from flask import Flask, render_template, render_template_string, g
from werkzeug.local import LocalProxy

from potyk_io_back.articles import get_prev_article, get_next_article
from potyk_io_back.notes import read_notes, NoteSection

SUPPORTED_ARTICLE_TYPES = (".html", ".md")

app = Flask(__name__, template_folder="content")


def read_notes_flask():
    if "notes" not in g:
        g.notes = read_notes(Path(app.template_folder) / "notes")
    return g.notes


note_sections: list[NoteSection] = LocalProxy(read_notes_flask)


@app.route("/")
def index():
    return render_template("index.html", note_sections =note_sections)

@app.route("/notes")
def notes():
    return render_template("notes/index.html", note_sections =note_sections)




@app.route("/notes/<note_key>")
def get_note(note_key: str):
    note = _find_note(note_key)

    raw_md = render_template(note.template_path)
    md = frontmatter.loads(raw_md)
    html = mistune.html(md.content)

    ctx = {
        "show_title": True,
        **dataclasses.asdict(note),
    }
    return render_template_string(
        "{% extends 'templates/base.html' %}"
        "{% block main %}" + html + "{% endblock %}",
        **ctx
    )

def _find_note(note_key):
    for section in note_sections:
        for note in section.notes:
            if note.key == note_key:
                return note


def article_deprecated(note: str):
    ctx = {
        "prev": get_prev_article(note),
        "next": get_next_article(note),
    }

    article_template_name = make_article_template_name(note)
    if not article_template_name:
        return flask.abort(404)

    if article_template_name.endswith(".md"):
        raw_md = render_template(article_template_name)
        md = frontmatter.loads(raw_md)

        html = mistune.html(md.content)
        ctx.update({"show_title": True, **md.metadata})
        return render_template_string(
            "{% extends 'templates/base.html' %}"
            "{% block main %}" + html + "{% endblock %}",
            **ctx
        )
    else:
        # html
        return render_template(article_template_name, **ctx)


def make_article_template_name(article):
    if article.endswith(SUPPORTED_ARTICLE_TYPES):
        return article

    for ext in SUPPORTED_ARTICLE_TYPES:
        article_template_name = article + ext
        if os.path.exists(Path(app.template_folder) / article_template_name):
            return article_template_name

    return None
