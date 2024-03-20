import datetime
import enum
import sqlite3
from itertools import groupby
from typing import cast

from flask import Blueprint, render_template
from pydantic import BaseModel, Field

from potyk_io_back.core import (
    render_md_as_html,
    wrap_html_to_base_template,
)


class BeerStore(enum.StrEnum):
    vkusvill = "vkusvill"
    winelab = "winelab"
    perekrestok = "perekrestok"
    av = "av"
    beruvyhodnoy = "beruvyhodnoy"
    am = "am"
    winestyle = "winestyle"

    @property
    def label(self):
        if self == BeerStore.vkusvill:
            return "ВВ"
        if self == BeerStore.winelab:
            return "Винлаб"
        if self == BeerStore.perekrestok:
            return "Перек"
        if self == BeerStore.av:
            return "АВ"
        if self == BeerStore.beruvyhodnoy:
            return "Беру Выходной"
        if self == BeerStore.am:
            return "АМ"
        return cast(str, self.value).title()


class BeerPrice(BaseModel):
    id: int
    beer_id: int
    price: int
    store: BeerStore
    date: datetime.date
    url: str | None = None

    @property
    def store_label(self) -> str:
        return self.store.label


class Beer(BaseModel):
    id: int
    title: str
    img: str
    untappd_url: str | None
    wishlist: bool

    prices: list[BeerPrice] = Field(default_factory=list)

    @property
    def last_prices(self) -> list[BeerPrice]:
        price_by_dates = sorted(self.prices, key=lambda price: price.date, reverse=True)
        stores = {price.store for price in self.prices if price.store}
        store_prices = [
            next((price for price in price_by_dates if price.store == store), None)
            for store in stores
        ]
        store_prices = sorted(store_prices, key=lambda price: price.price)
        return store_prices

    @property
    def stores(self) -> list[BeerStore]:
        return {price.store for price in self.prices}


class BeerStorage:
    def __init__(self, sqlite_cur: sqlite3.Cursor) -> None:
        self.sqlite_cur = sqlite_cur

    def list_all(self, filters=None):
        q = "select id, title, img,untappd_url, wishlist from beers"
        if filters is not None:
            q += f" where {filters}"
        raw_beers = self.sqlite_cur.execute(q).fetchall()
        beers = [
            Beer(
                id=id,
                title=title,
                img=img,
                untappd_url=untappd_url,
                wishlist=wishlist or False,
            )
            for id, title, img, untappd_url, wishlist in raw_beers
        ]

        raw_beer_prices = self.sqlite_cur.execute(
            "select id, beer_id, price, store, date, url from beers_prices order by beer_id"
        )
        beer_prices = [
            BeerPrice(
                id=id, beer_id=beer_id, price=price, store=store, date=date, url=url
            )
            for id, beer_id, price, store, date, url in raw_beer_prices
        ]

        beer_prices_by_beer_id = {
            beer_id: list(beer_id_prices)
            for beer_id, beer_id_prices in groupby(
                beer_prices, lambda price: price.beer_id
            )
        }
        for beer in beers:
            beer.prices = beer_prices_by_beer_id.get(beer.id, [])

        return beers

    def list_stores(self):
        return [
            (store, store_enum.label)
            for store, store_enum in BeerStore.__members__.items()
        ]


def make_beer_blueprint(sqlite_cur: sqlite3.Cursor) -> Blueprint:
    beer_bp = Blueprint("beer_bp", __name__)
    beer_storage = BeerStorage(sqlite_cur)

    @beer_bp.route("/special/beer/guide")
    def get_beer():
        ctx = {"show_title": True, "show_desc": True}

        html, md_ctx = render_md_as_html("special/beer/guide.md")
        ctx.update(md_ctx)
        return wrap_html_to_base_template(html, ctx)

    @beer_bp.route("/special/beer/base")
    def get_beer_base():
        return render_template(
            "special/beer/base.html",
            show_title=True,
            show_desc=True,
            beers=beer_storage.list_all(),
            stores=beer_storage.list_stores(),
        )

    return beer_bp
