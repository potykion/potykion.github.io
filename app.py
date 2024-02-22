import os
from pathlib import Path

import flask
import frontmatter
import mistune
from flask import Flask, render_template, render_template_string
from tinydb import TinyDB
from tinydb.storages import MemoryStorage

from potyk_io_back.notes import make_note_index, NoteDb
from potyk_io_back.todo import Task, TodoRepo

SUPPORTED_ARTICLE_TYPES = (".html", ".md")


def create_app():
    app = Flask(__name__, template_folder="content")
    app.config["SERVER_NAME"] = "127.0.0.1:5000"

    with app.app_context():
        db = TinyDB(
            "db.json",
        )
        db = make_note_index(Path(app.template_folder) / "notes", db)
        note_db = NoteDb(db)

        task_db = TodoRepo(db)

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
        return render_template("stuff/index.html")

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

    @app.get("/todo")
    def todo():
        tasks = reversed(task_db.list_all())

        hide_done = flask.request.args.get("hide_done")
        if hide_done:
            tasks = [task for task in tasks if not task.done]

        return render_template(
            "todo/index.html",
            tasks=tasks,
            hide_done=hide_done,
        )

    @app.post("/todo")
    def create_todo():
        title = flask.request.form.get("title")
        task = task_db.create(title)
        return render_template("templates/components/todo-task.html", task=task)

    @app.get("/todo/<int:task_id>/edit")
    def get_todo_form(task_id):
        task = task_db.get_by_id(task_id)

        return render_template("templates/components/todo-edit-task.html", task=task)

    @app.get("/todo/<int:task_id>")
    def get_task(task_id):
        task = task_db.get_by_id(task_id)

        return render_template("templates/components/todo-task.html", task=task)

    @app.post("/todo/<int:task_id>")
    def change_todo_done(task_id):
        done = bool(flask.request.form.get(f"done"))

        task = task_db.get_by_id(task_id)
        task.done = done
        task_db.update(task)

        return render_template("templates/components/todo-task.html", task=task)
    @app.post("/todo/<int:task_id>/edit")
    def change_todo_title(task_id):
        title = flask.request.form.get(f"title")

        task = task_db.get_by_id(task_id)
        task.title = title
        task_db.update(task)

        return render_template("templates/components/todo-task.html", task=task)

    @app.delete("/todo/<int:task_id>")
    def delete_todo(task_id):

        task = task_db.get_by_id(task_id)
        task_db.delete(task)

        return ""

    return app
