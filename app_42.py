import dataclasses
import datetime
import os
import re
import sqlite3
from itertools import groupby
from operator import attrgetter

import flask
import frontmatter
import mistune
from flask import Flask, render_template, render_template_string
from jinja2 import TemplateNotFound
from pydantic import BaseModel

from potyk_io_back.admin import add_admin_routes
from potyk_io_back.beer import Beer, Brewery, BeerPrice, BeerStyle, BeerStore
from potyk_io_back.books import BookStore
from potyk_io_back.core import BASE_DIR
from potyk_io_back.event import Event
from potyk_io_back.index_and_feed import add_index_page, FeedStorage
from potyk_io_back.iter_utils import groupby_dict
from potyk_io_back.lazy import SimpleStorage
from potyk_io_back.movie import MovieStore, MovieTag, MovieList, add_movie_routes
from potyk_io_back.blog_pages import BlogPageStore, BlogPage, render_md_as_html_template
from potyk_io_back.q import Q
from potyk_io_back.recipes import add_recipes_routes
from potyk_io_back.restaurants import AddRestForm, Restaurant, RestaurantStorage
from potyk_io_back.rewardy import add_rewardy_routes
from potyk_io_back.tools import ToolStore, ToolTag, ToolType


class Game(BaseModel):
    id: int
    title: str
    img: str
    genre: str
    steam: str
    review: str
    played_date: datetime.date | None
    wishlist: bool | None


class GameStore:
    def __init__(self, sqlite_cursor: sqlite3.Cursor):
        self.sqlite_cursor = sqlite_cursor
        self.store = SimpleStorage(sqlite_cursor, "games", Game)
        self.q = Q(sqlite_cursor, table="games", select_all_as=Game)

    def list_all(self, order_by=None):
        return self.store.list_all(order_by=order_by)

    def get_current(self):
        raw_game = self.sqlite_cursor.execute("select * from games order by played_date desc ").fetchone()
        return Game(**raw_game)


@dataclasses.dataclass
class Deps:
    sqlite_conn: sqlite3.Connection
    sqlite_cursor: sqlite3.Cursor

    @property
    def feed_storage(self): return FeedStorage(self.sqlite_cursor)

    @property
    def movie_store(self):
        return MovieStore(self.sqlite_cursor)

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
    def page_store(self) -> BlogPageStore:
        return BlogPageStore(self.sqlite_cursor)

    @property
    def page(self) -> BlogPage:
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
        rendered.append((url, html_path, html))

        print(f"{idx + 1}/{len(what_to_render)}: {url} -> {html_path}: ok")

    print("Done")
    return rendered


def create_app(server_name=None):
    app = Flask(
        __name__,
    )
    deps = Deps(
        sqlite_conn=(sqlite_conn := sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False)),
        sqlite_cursor=sqlite_conn.cursor(),
    )
    # RuntimeError: Unable to build URLs outside an active request without 'SERVER_NAME' configured.
    #   Also configure 'APPLICATION_ROOT' and 'PREFERRED_URL_SCHEME' as needed.
    app.config["SERVER_NAME"] = server_name or "127.0.0.1:5000"
    # RuntimeError: A secret key is required to use CSRF.
    app.config["SECRET_KEY"] = os.urandom(24)
    app.config["FLASK_ENV"] = os.environ["FLASK_ENV"]
    app.config["is_prod"] = app.config["FLASK_ENV"] == "prod"

    @app.template_filter("render_md")
    def render_md(md):
        return mistune.html(md)

    @app.template_filter("recipe_layers")
    def recipe_layers(ingredients, prefix_br=True, suffix_br=True):
        return (
            ("<br>" if prefix_br else "")
            + "<br>&nbsp;&nbsp;&nbsp;↓<br>".join(ingredients)
            + ("<br>" if suffix_br else "")
        )

    @app.template_filter("youtube_embed")
    def youtube_embed(link: str, height: int | None = None):
        """
        >>> youtube_embed('https://youtu.be/PJPzhXXBMV8?si=5ZtyJ7ibg9Aa_j4R')
        '<iframe src="https://www.youtube.com/embed/PJPzhXXBMV8?si=5ZtyJ7ibg9Aa_j4R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
        >>> youtube_embed('https://www.youtube.com/watch?v=j9cPe8Y7Rzk')
        '<iframe src="https://www.youtube.com/embed/j9cPe8Y7Rzk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

        """

        if re.match(r"https://youtu.be/(.+)?si=(.+)", link) or re.match(r"https://youtu.be/(.+)", link):
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
        try:
            return flask.send_file(path)
        except FileNotFoundError:
            return flask.send_file(os.path.join(app.static_folder, path))

    add_index_page(app, deps)

    add_recipes_routes(app, deps)

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
        done_books = []

        books = deps.book_store.list_all()
        for book in books:
            if book.status == "wip":
                wip_books.append(book)
            if book.status == "wishlist":
                wishlist_books.append(book)
            if book.status == "done" or book.status == "drop":
                done_books.append(book)

        return render_template(
            f"books/index.html",
            page=deps.page,
            wip_books=wip_books,
            wishlist_books=wishlist_books,
            done_books=done_books,
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

        stores = [(store, store_enum.label) for store, store_enum in BeerStore.__members__.items()]

        return render_template(
            "beer/index.html",
            page=deps.page,
            breweries=breweries,
            styles=styles,
            beers=beers,
            stores=stores,
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
        games = deps.game_store.q.select_all("select * from games order by played_date desc")
        wishlist = [game for game in games if game.wishlist]
        games = [game for game in games if not game.wishlist]
        current = games[0]

        return render_template(
            "games/index.html",
            page=deps.page,
            games=games,
            wishlist=wishlist,
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

    @app.route(
        "/tools/turik",
    )
    def turik_page():

        return render_template(
            "tools/turik.html",
            page=deps.page,
        )

    @app.route("/n/projects")
    def projects_page():
        return render_md_as_html_template(
            "n/projects.md",
            page=deps.page,
        )
    @app.route("/n")
    def n_page():
        return render_md_as_html_template(
            "n/index.md",
            page=deps.page,
        )

    add_rewardy_routes(app, deps)

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

    add_movie_routes(app, deps)

    add_admin_routes(app, deps)

    # region perf
    @app.route("/perf")
    def perf_page():
        return render_md_as_html_template(f"perf/index.md", page=deps.page)

    # endregion perf

    render_pages(app, deps)

    return app
