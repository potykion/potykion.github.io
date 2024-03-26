import dataclasses

import mistune
from flask import Blueprint, render_template

from potyk_io_back.books import Books
from potyk_io_back.lazy import SimpleStorage


def make_stats_blueprint(sqlite_cur):
    stats_blueprint = Blueprint("stats_blueprint", __name__)

    movies_storage = SimpleStorage(sqlite_cur, "movies")
    music_storage = SimpleStorage(sqlite_cur, "music_albums")

    @stats_blueprint.route("/special/stats")
    def get_special():
        movies = movies_storage.list_all(
            where="datetime(watched_dt) >= datetime('2024-01-01')",
            order_by="datetime(watched_dt) desc",
        )

        albums = music_storage.list_all(
            where="datetime(listened_dt) and datetime(listened_dt) >= datetime('2024-01-01')",
            order_by="datetime(listened_dt) desc",
        )


        return render_template(
            f"special/stats.html",
            show_title=True,
            show_desc=True,
            books=Books,
            movies=movies,
            albums=albums,
        )

    return stats_blueprint
