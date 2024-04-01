import sqlite3

from flask import Blueprint, render_template

from potyk_io_back.beer import BeerStorage
from potyk_io_back.lazy import SimpleStorage


def make_feed_blueprint(sqlite_cur: sqlite3.Cursor):
    feed_blueprint = Blueprint(
        "feed",
        __name__,
    )

    tech_storage = SimpleStorage(sqlite_cur, "tech_tools")

    @feed_blueprint.route("/")
    def index():
        return feed_6()

    @feed_blueprint.route("/feed/2024-04-01")
    def feed_6():
        return render_template(
            "index.html",
            beer=BeerStorage(sqlite_cur).get_by_id(39),
            tech_tool=tech_storage.get_by_id(8),
            feed_date="2024-04-01",
            prev_date="2024-03-31",
            next_date=None,
        )

    @feed_blueprint.route("/feed/2024-03-31")
    def feed_5():
        return render_template(
            "feed/2024-03-31.html",
            beer=BeerStorage(sqlite_cur).get_by_id(39),
            tech_tool=tech_storage.get_by_id(8),
            feed_date="2024-03-31",
            prev_date="2024-03-30",
            next_date="2024-04-01",
        )

    @feed_blueprint.route("/feed/2024-03-30")
    def feed_4():
        return render_template(
            "feed/2024-03-30.html",
            beer=BeerStorage(sqlite_cur).get_by_id(39),
            tech_tool=tech_storage.get_by_id(8),
            feed_date="2024-03-30",
            prev_date="2024-03-29",
            next_date="2024-03-31",
        )

    @feed_blueprint.route("/feed/2024-03-27")
    def feed_1():
        return render_template(
            "feed/2024-03-27.html",
            beer=BeerStorage(sqlite_cur).get_by_id(21),
            feed_date="2024-03-27",
            prev_date=None,
            next_date="2024-03-28",
        )

    @feed_blueprint.route("/feed/2024-03-28")
    def feed_2():
        return render_template(
            "feed/2024-03-28.html",
            beer=BeerStorage(sqlite_cur).get_by_id(21),
            feed_date="2024-03-28",
            prev_date="2024-03-27",
            next_date="2024-03-29",
        )

    @feed_blueprint.route("/feed/2024-03-29")
    def feed_3():
        return render_template(
            "feed/2024-03-29.html",
            beer=BeerStorage(sqlite_cur).get_by_id(38),
            feed_date="2024-03-29",
            prev_date="2024-03-28",
            next_date="2024-03-30",
        )

    return feed_blueprint
