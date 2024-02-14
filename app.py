import dataclasses
import os
from pathlib import Path

import frontmatter
import mistune
from flask import Flask, render_template, render_template_string, g
from werkzeug.local import LocalProxy

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
    return render_template("index.html", note_sections=note_sections)


@app.route("/notes")
def notes():
    return render_template("notes/index.html", note_sections=note_sections)


@app.route("/special")
def special():
    return render_template(
        "special/index.html",
    )


@app.route("/notes/<note_key>")
def get_note(note_key: str):

    def _find_note(note_key):
        for section in note_sections:
            for note in section.notes:
                if note.key == note_key:
                    return note

    note = _find_note(note_key)

    ctx = {
        "show_title": True,
        **dataclasses.asdict(note),
    }

    html = _render_md_as_html(note.template_path)

    return _wrap_html_to_base_template(html, ctx)


def _render_md_as_html(md_template):
    raw_md = render_template(md_template)
    md = frontmatter.loads(raw_md)
    html = mistune.html(md.content)
    return html


def _wrap_html_to_base_template(html, ctx=None):
    ctx = ctx or {}
    return render_template_string(
        "{% extends 'templates/base.html' %}"
        "{% block main %}" + html + "{% endblock %}",
        **ctx,
    )


@app.route("/special/<page_key>")
def get_special(page_key: str):
    template = make_article_template_name(f"special/{page_key}")
    if template.endswith(".md"):
        html = _render_md_as_html(template)
        return _wrap_html_to_base_template(html)
    else:
        return render_template(template)


def make_article_template_name(article):
    if article.endswith(SUPPORTED_ARTICLE_TYPES):
        return article

    for ext in SUPPORTED_ARTICLE_TYPES:
        article_template_name = article + ext
        if os.path.exists(Path(app.template_folder) / article_template_name):
            return article_template_name

    return None
