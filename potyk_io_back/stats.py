import dataclasses

import mistune
from flask import Blueprint, render_template

from potyk_io_back.books import Books
from potyk_io_back.lazy import SimpleStorage


def make_stats_blueprint(sqlite_cur):
    stats_blueprint = Blueprint("stats_blueprint", __name__)

    movies_storage = SimpleStorage(sqlite_cur, "movies")

    @stats_blueprint.route("/special/stats")
    def get_special():
        movies = movies_storage.list_all(
            where="datetime(watched_dt) >= datetime('2024-01-01')",
            order_by="datetime(watched_dt)",
        )

        return render_template(
            f"special/stats.html",
            show_title=True,
            show_desc=True,
            books=Books,
            movies=movies,
        )

    return stats_blueprint
