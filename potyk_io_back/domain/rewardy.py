import flask
from flask import render_template
from pydantic import BaseModel

from potyk_io_back.core.q import Q


class Task(BaseModel):
    id: int
    title: str
    done: bool
    reward: float


def row_to_task(row):
    return Task(
        id=row["id"],
        title=row["title"],
        done=row["done"] or False,
        reward=row["reward"] or 0,
    )


def add_rewardy_routes(app: flask.Flask, deps):
    task_q = Q(deps.sqlite_cursor, select_as=row_to_task)

    @app.route("/tools/rewardy", methods=["GET", "POST"])
    def rewardy_page():

        if flask.request.method == "POST":
            if flask.request.form.get("action") == "create-task":
                title = flask.request.form.get("title")
                reward = float(flask.request.form.get("reward"))
                task_q.execute(
                    "insert into rewardy_tasks (title, reward) values (?, ?)",
                    (title, reward),
                    commit=True,
                )
                return render_task_list()

        return render_template(
            "work/tools/rewardy/index.html",
            page=deps.page,
            tasks=render_task_list(),
        )

    @app.route("/tools/rewardy/<id>", methods=["DELETE"])
    def task_crud(id):
        if flask.request.method == "DELETE":
            task_q.execute("delete from rewardy_tasks where id = ? ", (id), commit=True)
        return render_task_list()

    @app.post("/tools/rewardy/<id>/toggle")
    def toggle_task(id):
        done = bool(flask.request.form.get("done"))
        task_q.execute("update rewardy_tasks set done = ? where id = ? ", (done, id), commit=True)

        if done:
            # todo inc reward left
            ...

        return render_task_list()

    @app.route("/tools/rewardy/<id>/edit", methods=["GET", "POST"])
    def edit_task(id):
        task = task_q.select_one("select * from rewardy_tasks where id = ?", (id,))

        if flask.request.method == "GET":
            return render_template("work/tools/rewardy/task-item.html", task=task, edit=True)
        if flask.request.method == "POST":
            title = flask.request.form.get("title")
            reward = float(flask.request.form.get("reward"))
            task.title = title
            task.reward = reward
            task_q.execute(
                "update rewardy_tasks set title = ?, reward = ? where id = ? ",
                (title, reward, id),
                commit=True,
            )
            return render_template("work/tools/rewardy/task-item.html", task=task, edit=False)

    @app.post("/tools/rewardy/<id>/clone")
    def clone_task(id):
        task = task_q.select_one("select * from rewardy_tasks where id = ?", (id,))

        task_q.execute("insert into rewardy_tasks (title) values (?)", (task.title,), commit=True)

        return render_task_list()

    def render_task_list():
        tasks = task_q.select_all("select * from rewardy_tasks order by done")
        return render_template("work/tools/rewardy/task-list.html", tasks=tasks)
