import sqlite3

from flask import Blueprint, render_template

from potyk_io_back.beer import BeerStorage


def make_feed_blueprint(sqlite_cur: sqlite3.Cursor):
    feed_blueprint = Blueprint(
        "feed",
        __name__,
    )

    @feed_blueprint.route("/")
    def index():
        return render_template(
            "index.html",
            beer=BeerStorage(sqlite_cur).get_by_id(39),
        )

    @feed_blueprint.route("/feed/2024-03-30")
    def feed_4():
        return index()

    @feed_blueprint.route("/feed/2024-03-27")
    def feed_1():
        return render_template(
            "feed/2024-03-27.html",
            beer=BeerStorage(sqlite_cur).get_by_id(21),
            feed_date="2024-03-27",
        )

    @feed_blueprint.route("/feed/2024-03-28")
    def feed_2():
        return render_template(
            "feed/2024-03-28.html",
            beer=BeerStorage(sqlite_cur).get_by_id(21),
            feed_date="2024-03-28",
        )

    @feed_blueprint.route("/feed/2024-03-29")
    def feed_3():
        return render_template(
            "feed/2024-03-29.html",
            beer=BeerStorage(sqlite_cur).get_by_id(38),
            feed_date="2024-03-29",
        )

    return feed_blueprint
