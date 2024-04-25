import sqlite3

from flask import Blueprint, render_template


def make_travel_blueprint(
    sqlite_cur: sqlite3.Cursor,
):
    travel_blueprint = Blueprint("travel_blueprint", __name__)

    @travel_blueprint.route("/travel")
    def index():
        return render_template(
            "travel/index.html",
        )

    return travel_blueprint
