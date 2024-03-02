from collections import defaultdict
from itertools import groupby

import flask
from flask import Blueprint, render_template, render_template_string
from pydantic import BaseModel, ConfigDict
from tinydb import TinyDB, Query


class Task(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    desc: str = ''
    category: str = ""
    done: bool = False


class TodoRepo:
    def __init__(self, db: TinyDB):
        self.db = db
        self.table = db.table("todos")

    def list_all(self) -> list[Task]:
        raw_tasks = self.table.all()
        return [Task.model_validate(task) for task in raw_tasks]

    def create(self, title, category, desc):
        try:
            last_id = self.table.all()[-1]["id"]
        except IndexError:
            last_id = 0
        task = Task(id=last_id + 1, title=title, category=category, desc=desc)
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
    def todo_list():
        tasks = list(reversed(task_db.list_all()))

        categories = {task.category for task in tasks if task.category}

        tasks_by_category = defaultdict(list)
        for task in tasks:
            if task.done:
                continue
            tasks_by_category[task.category].append(task)
        tasks_by_category["DONE"] = [task for task in tasks if task.done]

        tasks_by_category = list(tasks_by_category.items())

        return render_template(
            "stuff/todo/index.html",
            categories=categories,
            tasks_by_category=tasks_by_category,
        )

    @todo_blueprint.post("/todo")
    def create_todo():
        title = flask.request.form.get("title")
        category = flask.request.form.get("category")
        desc = flask.request.form.get("desc")
        task = task_db.create(title, category, desc)
        return render_template_string(
            "{% from 'templates/components/todo.html' import todo_task %} {{ todo_task(task) }}",
            task=task,
        )

    @todo_blueprint.get("/todo/<int:task_id>/edit")
    def get_todo_form(task_id):
        task = task_db.get_by_id(task_id)

        return render_template_string(
            "{% from 'templates/components/todo.html' import todo_edit_task_form %} {{ todo_edit_task_form(task) }}",
            task=task,
        )

    @todo_blueprint.get("/todo/<int:task_id>")
    def get_task(task_id):
        task = task_db.get_by_id(task_id)

        return render_template_string(
            "{% from 'templates/components/todo.html' import todo_task %} {{ todo_task(task) }}",
            task=task,
        )

    @todo_blueprint.post("/todo/<int:task_id>")
    def change_todo_done(task_id):
        done = bool(flask.request.form.get(f"done"))

        task = task_db.get_by_id(task_id)
        task.done = done
        task_db.update(task)

        return render_template_string(
            "{% from 'templates/components/todo.html' import todo_task %} {{ todo_task(task) }}",
            task=task,
        )

    @todo_blueprint.post("/todo/<int:task_id>/edit")
    def edit_todo(task_id):
        title = flask.request.form.get(f"title")
        category = flask.request.form.get(f"category")
        desc = flask.request.form.get(f"desc")

        task = task_db.get_by_id(task_id)
        task.title = title
        task.category = category
        task.desc = desc
        task_db.update(task)

        return render_template_string(
            "{% from 'templates/components/todo.html' import todo_task %} {{ todo_task(task) }}",
            task=task,
        )

    @todo_blueprint.delete("/todo/<int:task_id>")
    def delete_todo(task_id):

        task = task_db.get_by_id(task_id)
        task_db.delete(task)

        return ""

    return todo_blueprint
