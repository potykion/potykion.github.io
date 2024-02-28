from itertools import groupby

import flask
from flask import Blueprint, render_template, render_template_string
from pydantic import BaseModel, ConfigDict
from tinydb import TinyDB, Query


class Task(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    category: str = ""
    done: bool = False


class TodoRepo:
    def __init__(self, db: TinyDB):
        self.db = db
        self.table = db.table("todos")

    def list_all(self) -> list[Task]:
        raw_tasks = self.table.all()
        return [Task.model_validate(task) for task in raw_tasks]

    def create(self, title, category):
        try:
            last_id = self.table.all()[-1]["id"]
        except IndexError:
            last_id = 0
        task = Task(id=last_id + 1, title=title, category=category)
        self.table.insert(task.model_dump())
        return task

    def get_by_id(self, task_id):
        q = Query()
        return Task.model_validate(self.table.get(q.id == task_id))

    def update(self, task):
        q = Query()
        self.table.update(task.model_dump(), q.id == task.id)

    def delete(self, task):
        q = Query()
        self.table.remove(q.id == task.id)


def make_todo_blueprint(task_db: TodoRepo) -> Blueprint:
    todo_blueprint = Blueprint(
        "todo",
        __name__,
    )

    @todo_blueprint.get("/stuff/todo")
    def todo():
        tasks = list(reversed(task_db.list_all()))

        hide_done = flask.request.args.get("hide_done", "true") == "true"
        if hide_done:
            tasks = [task for task in tasks if not task.done]

        categories = {task.category for task in tasks if task.category}

        tasks_by_category = groupby(
            sorted(tasks, key=(key := lambda task: task.category), reverse=True), key
        )

        return render_template(
            "stuff/todo/index.html",
            hide_done=hide_done,
            categories=categories,
            tasks_by_category=tasks_by_category,
        )

    @todo_blueprint.post("/todo")
    def create_todo():
        title = flask.request.form.get("title")
        category = flask.request.form.get("category")
        task = task_db.create(title, category)
        return render_template_string(
            "{% from 'templates/components/todo.html' import todo_task %} {{ todo_task(task) }}",
            task=task,
        )

    @todo_blueprint.get("/todo/<int:task_id>/edit")
    def get_todo_form(task_id):
        task = task_db.get_by_id(task_id)

        return render_template("templates/components/todo-edit-task.html", task=task)

    @todo_blueprint.get("/todo/<int:task_id>")
    def get_task(task_id):
        task = task_db.get_by_id(task_id)

        return render_template("templates/components/todo-task.html", task=task)

    @todo_blueprint.post("/todo/<int:task_id>")
    def change_todo_done(task_id):
        done = bool(flask.request.form.get(f"done"))

        task = task_db.get_by_id(task_id)
        task.done = done
        task_db.update(task)

        return render_template("templates/components/todo-task.html", task=task)

    @todo_blueprint.post("/todo/<int:task_id>/edit")
    def edit_todo(task_id):
        title = flask.request.form.get(f"title")
        category = flask.request.form.get(f"category")

        task = task_db.get_by_id(task_id)
        task.title = title
        task.category = category
        task_db.update(task)

        return render_template("templates/components/todo-task.html", task=task)

    @todo_blueprint.delete("/todo/<int:task_id>")
    def delete_todo(task_id):

        task = task_db.get_by_id(task_id)
        task_db.delete(task)

        return ""

    return todo_blueprint