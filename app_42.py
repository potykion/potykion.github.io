import dataclasses
import datetime
import os
import re
import sqlite3
from itertools import groupby
from operator import attrgetter
from typing import Literal

import flask
import frontmatter
import mistune
from flask import Flask, render_template, render_template_string
from jinja2 import TemplateNotFound
from pydantic import BaseModel

from potyk_io_back.beer import Beer, Brewery, BeerPrice, BeerStyle
from potyk_io_back.core import BASE_DIR
from potyk_io_back.iter_utils import groupby_dict
from potyk_io_back.lazy import SimpleStorage
from potyk_io_back.pages import BlogPageStore, BlogPage
from potyk_io_back.q import Q
from potyk_io_back.restaurants import AddRestForm, Restaurant, RestaurantStorage
from potyk_io_back.tools import ToolStore, ToolTag, ToolType


class Game(BaseModel):
    id: int
    title: str
    img: str
    genre: str
    steam: str
    review: str
    played_date: datetime.date


class GameStore:
    def __init__(self, sqlite_cursor: sqlite3.Cursor):
        self.sqlite_cursor = sqlite_cursor
        self.store = SimpleStorage(sqlite_cursor, "games", Game)

    def list_all(self, order_by=None):
        return self.store.list_all(order_by=order_by)

    def get_current(self):
        raw_game = self.sqlite_cursor.execute("select * from games order by played_date desc ").fetchone()
        return Game(**raw_game)


class Book(BaseModel):
    title: str | None
    author: str | None
    desc: str | None = ""
    pdf: str | None = ""
    bookmate: str | None = ""
    summary: str | None = ""
    title_en: str | None = ""
    url: str | None = ""
    status: Literal["wip", "wishlist"] = "wishlist"

    summary_html: str = ""


class BookStore:
    def __init__(self, sqlite_cursor):
        self.sqlite_cursor = sqlite_cursor
        self.store = SimpleStorage(self.sqlite_cursor, "books", Book)

    def first_by_url(self, url):
        book: Book = self.store.first_where(url=url)
        book.summary_html = mistune.html(book.summary or "")
        return book

    def list_all(self) -> list[Book]:
        return self.store.list_all()


@dataclasses.dataclass
class Deps:
    sqlite_conn: sqlite3.Connection
    sqlite_cursor: sqlite3.Cursor

    @property
    def q(self):
        return Q(self.sqlite_cursor)

    @property
    def places_table(self):
        return SimpleStorage(self.sqlite_cursor, "travel_places")

    @property
    def books_table(self):
        return SimpleStorage(self.sqlite_cursor, "books")

    @property
    def book_store(self):
        return BookStore(self.sqlite_cursor)

    @property
    def page_store(self):
        return BlogPageStore(self.sqlite_cursor)

    @property
    def page(self):
        return self.page_store.get_by_url(flask.request.path)

    @property
    def game_store(self):
        return GameStore(self.sqlite_cursor)

    @property
    def tool_store(self):
        return ToolStore(self.sqlite_cursor)

    @property
    def restaurant_store(self):
        return RestaurantStorage(self.sqlite_cursor)


def render_pages(app, deps: Deps):
    print("Rendering...")
    app = (app or create_app()).test_client()

    rendered = []

    what_to_render = [(page.url, page.html_path) for page in deps.page_store.list_all()]

    for idx, url_and_path in enumerate(what_to_render):
        url, html_path = url_and_path
        html = app.get(url).text
        rendered.append((html_path, html))
        print(f"{idx + 1}/{len(what_to_render)}: {url} -> {html_path}: ok")

    print("Done")
    return rendered


def create_app():
    app = Flask(
        __name__,
    )
    deps = Deps(
        sqlite_conn=(sqlite_conn := sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False)),
        sqlite_cursor=sqlite_conn.cursor(),
    )
    # RuntimeError: A secret key is required to use CSRF.
    app.config["SECRET_KEY"] = os.urandom(24)

    @app.template_filter("render_md")
    def render_md(md):
        return mistune.html(md)

    @app.template_filter("youtube_embed")
    def youtube_embed(link: str, height: int | None = None):
        """
        >>> youtube_embed('https://youtu.be/PJPzhXXBMV8?si=5ZtyJ7ibg9Aa_j4R')
        '<iframe src="https://www.youtube.com/embed/PJPzhXXBMV8?si=5ZtyJ7ibg9Aa_j4R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
        >>> youtube_embed('https://www.youtube.com/watch?v=j9cPe8Y7Rzk')
        '<iframe src="https://www.youtube.com/embed/j9cPe8Y7Rzk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

        """

        if re.match(r"https://youtu.be/(.+)?si=(.+)", link):
            id = link.rsplit("/", 1)[1]
        elif re.match(r"https://www\.youtube\.com/watch\?v=(.+)", link):
            id = link.rsplit("=")[1]
        elif re.match("https://www.youtube.com/embed/(.+)?si=(.+)", link):
            id = link.rsplit("/", 1)[1]
        else:
            return ""

        if height:
            height_tag = f'height="{height}"'
        else:
            height_tag = ""

        return f'<iframe {height_tag} src="https://www.youtube.com/embed/{id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

    @app.route("/<path:path>")
    def serve_file(path):
        return flask.send_file(path)

    @app.route("/")
    def index_page():
        pages = deps.page_store.list_index()
        pages_by_section = groupby_dict(pages, attrgetter("section"))
        return render_template(
            "index.html",
            pages_by_section=pages_by_section,
            page=deps.page,
        )

    # region recipes
    @app.route("/recipes")
    def recipes_page():
        recipe_pages = deps.page_store.list_recipe_pages()
        pages_by_section = groupby_dict(recipe_pages, attrgetter("section"))
        return render_template(
            "recipes/index.html",
            page=deps.page,
            pages_by_section=pages_by_section,
        )

    @app.route("/recipes/<recipe_key>")
    def recipe_page(recipe_key):
        try:
            # noinspection PyUnresolvedReferences
            return render_template(
                f"recipes/{recipe_key}.html",
                page=deps.page,
            )
        except TemplateNotFound:
            return _render_md_as_html_template(
                f"recipes/{recipe_key}.md",
                page=deps.page,
            )

    def _render_md_as_html_template(template, **kwargs):
        md = render_template(template)
        md = frontmatter.loads(md).content
        html = render_template_string(
            '{% extends "_layouts/base.html" %}{% block main %}' + render_md(md) + "{% endblock %}",
            **kwargs,
        )
        return html

    # endregion recipes

    # region travel
    @app.route("/travel")
    def travel_page():
        places = deps.places_table.list_all(order_by="date desc")
        return render_template(
            f"travel/index.html",
            page=deps.page,
            places=places,
        )

    # endregion travel

    # region books
    @app.route("/books")
    def books_page():
        wip_books = []
        wishlist_books = []

        books = deps.book_store.list_all()
        for book in books:
            if book.status == "wip":
                wip_books.append(book)
            if book.status == "wishlist":
                wishlist_books.append(book)

        return render_template(
            f"books/index.html",
            page=deps.page,
            wip_books=wip_books,
            wishlist_books=wishlist_books,
        )

    @app.route("/books/<book_key>")
    def book_page(book_key):
        book = deps.book_store.first_by_url(url=flask.request.path)

        return render_template(
            f"books/book.html",
            page=deps.page,
            book=book,
        )

    # endregion books

    # region beer
    @app.route("/beer")
    def beer_page():
        beers = deps.q.select_all("select * from beers order by brewery_id", as_=Beer)

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

        return render_template(
            "beer/index.html",
            page=deps.page,
            breweries=breweries,
            styles=styles,
        )

    # endregion beer

    # region money
    @app.route("/money")
    def money_page():
        return render_template("money/index.html", page=deps.page)

    # endregion money

    # region wishlist
    @app.route("/wishlist")
    def wishlist_page():
        return render_template("wishlist/index.html", page=deps.page)

    # endregion wishlist

    # region mu
    @app.route("/mu")
    def mu_page():
        return render_template("mu/index.html", page=deps.page)

    # endregion mu

    # region games
    @app.route("/games")
    def games_page():
        games = deps.game_store.list_all(order_by="played_date desc")
        current = deps.game_store.get_current()
        return render_template(
            "games/index.html",
            page=deps.page,
            games=games,
            current=current,
        )

    # endregion games

    # region tools
    @app.route("/tools")
    def tools_page():
        tools = deps.tool_store.list_all()

        pinned_tools = [tool for tool in tools if tool.pinned]
        image_tools = [tool for tool in tools if ToolTag.image_proc in tool.tags]
        ai_tools = [tool for tool in tools if ToolTag.ai in tool.tags]
        python_tools = [tool for tool in tools if ToolType.python == tool.type]

        tools = set(tools) - set(image_tools) - set(python_tools) - set(pinned_tools)

        return render_template(
            "tools/index.html",
            page=deps.page,
            tools=tools,
            pinned_tools=pinned_tools,
            image_tools=image_tools,
            ai_tools=ai_tools,
            python_tools=python_tools,
        )

    @app.route("/tools/codegen", methods=["GET", "POST"])
    def codegen_page():
        if flask.request.method == "POST":
            action = flask.request.form["action"]
            if action == "md_to_html":
                md = flask.request.form["md"]
                return mistune.escape(mistune.html(md))

            if action == "sync_recipes":
                recipes_dir = BASE_DIR / "templates" / "recipes"
                _, __, recipe_pages = next(os.walk(recipes_dir))

                existing_recipe_pages = {
                    page.html_path.split("/")[-1].rsplit(".", 1)[0]
                    for page in deps.page_store.list_recipe_pages()
                }
                existing_recipe_pages |= {"index"}

                new_pages = []

                for page in recipe_pages:
                    recipe_key = page.rsplit(".", 1)[0]

                    if recipe_key in existing_recipe_pages:
                        continue

                    fm = frontmatter.load(recipes_dir / page)
                    title = fm.get("title")
                    if not title:
                        raise ValueError(f"{page} has no title!")

                    desc = fm.get("desc")

                    new_page = BlogPage(
                        url=f"/recipes/{recipe_key}",
                        html_path=f"recipes/{recipe_key}.html",
                        title=title,
                        desc=desc,
                    )
                    new_pages.append(new_page)

                with deps.page_store.q.commit_after():
                    for page in new_pages:
                        deps.page_store.q.execute(
                            'insert into blog_pages (url, html_path, title, "desc") values (?, ?, ?, ?)',
                            (page.url, page.html_path, page.title, page.desc),
                        )

                return "ok"

        return render_template(
            "tools/codegen.html",
            page=deps.page,
        )

    # endregion tools

    # region drafts
    @app.route("/drafts/<key>")
    def drafts_page(key):
        return render_template(
            f"_drafts/{key}.html",
        )

    # endregion drafts

    # region rest

    @app.route("/rest")
    def rest_page():
        return render_template(
            "rest/index.html",
            page=deps.page,
            restaurants=deps.restaurant_store.list_all(),
        )

    @app.route("/rest/add", methods=["GET", "POST"])
    def rest_add_page():
        form = AddRestForm()

        if form.validate_on_submit():
            form_data = form.data
            form_data["location"] = [form_data["location"]]
            rest = Restaurant(**form_data)
            deps.restaurant_store.insert(rest)
            return flask.redirect("/rest")

        return render_template(
            "rest/add.html",
            page=deps.page,
            form=form,
        )

    # endregion rest

    render_pages(app, deps)

    return app
