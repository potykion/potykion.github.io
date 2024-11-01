import datetime
import enum
import sqlite3
from collections import defaultdict
from itertools import groupby
from operator import attrgetter
from typing import cast

from flask import render_template, Flask, url_for
from pydantic import BaseModel, Field


class BeerStyle(BaseModel):
    id: int
    title: str
    desc: str
    parent_style: int | None = None
    sub_styles: list[str] = Field(default_factory=list)


class BeerStore(enum.StrEnum):
    vkusvill = "vkusvill"
    winelab = "winelab"
    perekrestok = "perekrestok"
    av = "av"
    beruvyhodnoy = "beruvyhodnoy"
    am = "am"
    winestyle = "winestyle"
    litra = "litra"
    citycraft = "citycraft"
    rusbeer = "rusbeer"
    superkhmel = "superkhmel"

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
        if self == BeerStore.litra:
            return "Лит.ра"
        if self == BeerStore.citycraft:
            return "Сити Крафт"
        if self == BeerStore.rusbeer:
            return "РусБир"
        if self == BeerStore.superkhmel:
            return "СуперХмель"

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
    review: str | None
    brewery_id: int | None = None
    prices: list[BeerPrice] = Field(default_factory=list)

    @property
    def last_prices(self) -> list[BeerPrice]:
        price_by_dates = sorted(self.prices, key=lambda price: price.date, reverse=True)
        stores = {price.store for price in self.prices if price.store}
        store_prices = [
            next((price for price in price_by_dates if price.store == store), None) for store in stores
        ]
        store_prices = sorted(store_prices, key=lambda price: price.price)
        return store_prices

    @property
    def stores(self) -> list[BeerStore]:
        return {price.store for price in self.prices}


class Brewery(BaseModel):
    id: int
    title: str
    untappd_url: str
    img: str
    country: str
    styles: list[str]
    beers: list[Beer] = Field(default_factory=list)


class BeerStorage:
    def __init__(self, sqlite_cur: sqlite3.Cursor) -> None:
        self.sqlite_cur = sqlite_cur
        self.sqlite_cur.row_factory = sqlite3.Row

    def list_all(self, filters=None, order_by=None) -> list[Beer]:
        q = "select * from beers"
        if filters is not None:
            q += f" where {filters}"
        if order_by is not None:
            q += f" order by {order_by}"
        raw_beers = self.sqlite_cur.execute(q).fetchall()

        beers = [beer_from_dict(beer) for beer in raw_beers]

        raw_beer_prices = self.sqlite_cur.execute(
            "select id, beer_id, price, store, date, url from beers_prices order by beer_id"
        )
        beer_prices = [
            BeerPrice(id=id, beer_id=beer_id, price=price, store=store, date=date, url=url)
            for id, beer_id, price, store, date, url in raw_beer_prices
        ]

        beer_prices_by_beer_id = {
            beer_id: list(beer_id_prices)
            for beer_id, beer_id_prices in groupby(beer_prices, lambda price: price.beer_id)
        }
        for beer in beers:
            beer.prices = beer_prices_by_beer_id.get(beer.id, [])

        return beers

    def list_stores(self):
        return [(store, store_enum.label) for store, store_enum in BeerStore.__members__.items()]

    def get_by_id(self, id):
        return self.list_all(f"id = {id}")[0]


def beer_from_dict(raw_beer):
    raw_beer = dict(raw_beer)
    raw_beer["wishlist"] = raw_beer["wishlist"] or False
    return Beer(**raw_beer)


class Checkin(BaseModel):
    name: str
    url: str
    img: str
    brewery: str
    review: str
    style_id: int | None


class BeerStyle2(BaseModel):
    id: int
    title: str
    title_en: str | None
    desc: str
    examples: list[str]
    tags: list[str]
    abv_range: str | None
    bjcp: str | None
    taste: str | None
    color_srm: int | None
    aroma: str | None
    mouthfeel: str | None
    img: str | None

    checkins: list[Checkin] = Field(default_factory=list)

    @classmethod
    def from_sql(cls, row: sqlite3.Row) -> "BeerStyle2":
        row = dict(**row)
        row.update(
            dict(
                examples=(row["examples"]).split(",") if row["examples"] else [],
                tags=(row["tags"]).split(",") if row["tags"] else [],
            )
        )
        if row["img"]:
            row["img"] = url_for("static", filename=row["img"])

        return cls(**row)


def add_beer_routes(app: Flask, deps) -> None:
    @app.route("/beer")
    def beer_page():
        beers = deps.q.select_all("select * from beers order by brewery_id", as_=beer_from_dict)

        beer_prices = deps.q.select_all(
            "select * from beers_prices order by beer_id",
            as_=BeerPrice,
        )
        beer_prices_by_beer_id = {
            beer_id: list(beer_id_prices)
            for beer_id, beer_id_prices in groupby(beer_prices, lambda price: price.beer_id)
        }
        beers = [
            beer.model_copy(update={"prices": beer_prices_by_beer_id.get(beer.id, [])}) for beer in beers
        ]

        beers_by_brewery = {
            brewery_id: list(beers) for brewery_id, beers in groupby(beers, attrgetter("brewery_id"))
        }
        breweries: list[Brewery] = deps.q.select_all(
            "select * from beer_breweries",
            as_=lambda row: Brewery(
                **{
                    **row,
                    "styles": list(map(str.strip, row["styles"].split(","))),
                }
            ),
        )
        breweries = [
            brew.model_copy(update={"beers": beers_by_brewery.get(brew.id, [])}) for brew in breweries
        ]

        styles: list[BeerStyle] = deps.q.select_all(
            "select * from beer_styles order by parent_style", as_=BeerStyle
        )
        parent_styles = [style for style in styles if not style.parent_style]
        child_styles_by_parent = {
            parent_id: list(styles)
            for parent_id, styles in groupby(
                [style for style in styles if style.parent_style], attrgetter("parent_style")
            )
        }
        styles = [
            style.model_copy(update={"sub_styles": child_styles_by_parent.get(style.id, [])})
            for style in parent_styles
        ]

        stores = [(store, store_enum.label) for store, store_enum in BeerStore.__members__.items()]

        return render_template(
            "food/beer/index.html",
            page=deps.page,
            breweries=breweries,
            styles=styles,
            beers=beers,
            stores=stores,
        )

    @app.route("/beer/styles")
    def beer_styles_page():
        styles: list[BeerStyle2] = deps.q.select_all(
            "select * from beer_styles_2 order by priority desc, title",
            as_=BeerStyle2.from_sql,
        )

        checkins = deps.q.select_all(
            "select * from beer_my_untappd_beers",
            as_=Checkin,
        )
        checkins_by_style = defaultdict(list)
        for checkin in checkins:
            if checkin.style_id:
                checkins_by_style[checkin.style_id].append(checkin)

        for style in styles:
            style.checkins = checkins_by_style.get(style.id, [])

        # tags = {tag for beer in beers for tag in beer.tags}
        tag_beers = defaultdict(list)

        for beer in styles:
            for tag in beer.tags:
                tag_beers[tag].append(beer)

        return render_template(
            "food/beer/styles.html",
            page=deps.page,
            tried_styles=styles,
            tag_beers=tag_beers,
        )
