import sqlite3
from flask import Blueprint, render_template

from potyk_io_back.beer import BeerStore, BeerStorage
from potyk_io_back.lazy import SimpleStorage


def make_wishlist_blueprint(
    sqlite_cur: sqlite3.Cursor,
):
    wishlist_blueprint = Blueprint("wishlist_blueprint", __name__)
    beer_storage = BeerStorage(sqlite_cur)
    mu_storage = SimpleStorage(sqlite_cur, 'music_albums')

    @wishlist_blueprint.route("/special/wishlist")
    def get_wishlist() -> str:
        beers = beer_storage.list_all("wishlist = 1")
        stores = beer_storage.list_stores()

        albums = mu_storage.list_all("wishlist = 1")

        return render_template(
            f"special/wishlist.html",
            show_title=True,
            show_desc=True,
            beers=beers,
            stores=stores,
            albums=albums,
        )

    return wishlist_blueprint
