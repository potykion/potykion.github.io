import dataclasses
import sqlite3
from pathlib import Path

import flask
from flask import Flask, render_template, send_from_directory
from pydantic import BaseModel, Field

from potyk_io_back.core import BASE_DIR
from potyk_io_back.lazy import SimpleStorage


class BlogPage(BaseModel):
    url: str
    html_path: str
    title: str
    desc: str | None = ""

    breadcrumbs: list["BlogPage"] = Field(default_factory=list)


@dataclasses.dataclass
class Deps:
    sqlite_conn: sqlite3.Connection
    sqlite_cursor: sqlite3.Cursor

    @property
    def places_table(self):
        return SimpleStorage(self.sqlite_cursor, "travel_places")

    @property
    def page_store(self):
        return BlogPageStore(self.sqlite_cursor)

    @property
    def page(self):
        return self.page_store.get_by_url(flask.request.path)


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

    def list_all(self):
        return self.store.list_all()

    def list_where_url_in(self, urls):
        placeholders = ", ".join("?" for _ in urls)
        where = f"url in ({placeholders})"

        return self.store.list_all(where=where, where_params=urls, order_by="url")

    def get_by_url(self, url) -> BlogPage:
        page: BlogPage = self.store.first_where(url=url)
        subpaths = generate_subpaths(page.url)
        page.breadcrumbs = self.list_where_url_in(urls=subpaths)
        return page


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

    @app.route("/<path:path>")
    def serve_file(path):
        return flask.send_file(path)

    @app.route("/")
    def index_page():
        return render_template(
            "index.html",
            pages=deps.page_store.list_where_url_in(["/recipes", "/travel"]),
            page=deps.page,
        )

    @app.route("/recipes")
    def recipes_page():
        return render_template(
            "recipes/index.html",
            page=deps.page,
        )

    @app.route("/recipes/<recipe_key>")
    def recipe_page(recipe_key):
        return render_template(
            f"recipes/{recipe_key}.html",
            page=deps.page,
        )

    @app.route("/travel")
    def travel_page():
        places = deps.places_table.list_all()
        return render_template(
            f"travel/index.html",
            page=deps.page,
            places=places,
        )

    render_pages(app, deps)

    return app
