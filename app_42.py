import dataclasses
import datetime
import sqlite3
from pathlib import Path
from typing import Literal

import flask
import frontmatter
import mistune
from flask import Flask, render_template, send_from_directory, render_template_string
from jinja2 import TemplateNotFound
from pydantic import BaseModel, Field

from potyk_io_back.core import BASE_DIR, render_md_as_html
from potyk_io_back.lazy import SimpleStorage
from potyk_io_back.q import Q
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


class BlogPage(BaseModel):
    url: str
    html_path: str
    title: str
    desc: str | None = ""

    breadcrumbs: list["BlogPage"] = Field(default_factory=list)
    breadcrumbs_title: str | None = ""


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


def generate_subpaths(path):
    """
    >>> generate_subpaths('/recipes/banh-mi')
    ['/', '/recipes', '/recipes/banh-mi']
    """
    subpaths = ["/"]
    current_path = ""
    for segment in path.split("/"):
        if segment:  # Ignore empty segments
            current_path += "/" + segment
            subpaths.append(current_path)
    return subpaths


class BlogPageStore:
    def __init__(self, sqlite_cursor):
        self.sqlite_cursor = sqlite_cursor
        self.store = SimpleStorage(self.sqlite_cursor, "blog_pages", BlogPage)
        self.q = Q(self.sqlite_cursor, select_all_as=BlogPage)

    def list_all(self, breadcrumbs=False, **kwargs):
        pages = self.store.list_all(**kwargs)
        return [self._row_to_page(page, breadcrumbs=breadcrumbs) for page in pages]

    def list_where_url_in(self, urls, breadcrumbs=False):
        placeholders = ", ".join("?" for _ in urls)
        where = f"url in ({placeholders})"
        pages = self.list_all(where=where, where_params=urls, order_by="url", breadcrumbs=breadcrumbs)
        return pages

    def get_by_url(self, url) -> BlogPage:
        page: BlogPage = self.list_where_url_in([url], breadcrumbs=True)[0]
        return page

    def _row_to_page(self, row_or_page, *, breadcrumbs=False):
        page = row_or_page

        if breadcrumbs:
            subpaths = generate_subpaths(page.url)
            page.breadcrumbs = self.list_where_url_in(urls=subpaths)

        page.breadcrumbs_title = page.breadcrumbs_title or page.title

        return page


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

    @app.template_filter("render_md")
    def render_md(md):
        return mistune.html(md)

    @app.route("/<path:path>")
    def serve_file(path):
        return flask.send_file(path)

    @app.route("/")
    def index_page():
        return render_template(
            "index.html",
            pages=deps.page_store.list_all(where="include_in_index=1"),
            page=deps.page,
        )

    # region recipes
    @app.route("/recipes")
    def recipes_page():
        recipe_pages = deps.page_store.q.select_all("select * from blog_pages where url like '/recipes/%'")

        return render_template(
            "recipes/index.html",
            page=deps.page,
            recipe_pages=recipe_pages,
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
        return render_template("beer/index.html", page=deps.page)

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
        image_tools = [tool for tool in tools if ToolTag.image_proc in tool.tags]
        ai_tools = [tool for tool in tools if ToolTag.ai in tool.tags]
        python_tools = [tool for tool in tools if ToolType.python == tool.type]

        tools = set(tools) - set(image_tools) - set(python_tools)

        return render_template(
            "tools/index.html",
            page=deps.page,
            tools=tools,
            image_tools=image_tools,
            ai_tools=ai_tools,
            python_tools=python_tools,
        )

    @app.route("/tools/codegen", methods=["GET", "POST"])
    def codegen_page():
        if flask.request.method == "POST":
            md = flask.request.form["md"]
            return mistune.escape(mistune.html(md))

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

    render_pages(app, deps)

    return app
