import dataclasses
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
        **ctx,
    )


@app.route("/special/<page_key>")
def get_special(page_key: str):
    if not page_key.endswith(".html"):
        page_key = f"{page_key}.html"
    return render_template(f"special/{page_key}")
