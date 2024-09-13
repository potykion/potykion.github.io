import dataclasses
import os
import re
import sqlite3
from functools import reduce

import flask
import frontmatter
import mistune
from flask import Flask, render_template

from potyk_io_back.core.flask_city import FlaskCity
from potyk_io_back.domain.admin import add_admin_routes
from potyk_io_back.domain.beer import add_beer_routes
from potyk_io_back.domain.blog_pages import BlogPageStore, BlogPage, render_md_as_html_template
from potyk_io_back.domain.books import BookStore
from potyk_io_back.core.config import BASE_DIR
from potyk_io_back.domain.game import GameStore
from potyk_io_back.domain.food import Food, set_restaurants_for_food
from potyk_io_back.domain.index_and_feed import FeedStorage, get_pages_by_section, get_events, get_feed_items
from potyk_io_back.core.iter_utils import groupby_dict
from potyk_io_back.domain.movie import MovieStore, add_movie_routes
from potyk_io_back.core.q import Q
from potyk_io_back.domain.recipes import add_recipes_routes
from potyk_io_back.domain.restaurants import AddRestForm, Restaurant, RestaurantStorage
from potyk_io_back.domain.rewardy import add_rewardy_routes
from potyk_io_back.domain.tools import ToolQQ, ToolTag, ToolType
from potyk_io_back.domain.travel import get_travel_places


@dataclasses.dataclass
class Deps:
    sqlite_conn: sqlite3.Connection
    sqlite_cursor: sqlite3.Cursor

    @property
    def feed_storage(self):
        return FeedStorage(self.sqlite_cursor)

    @property
    def movie_store(self):
        return MovieStore(self.sqlite_cursor)

    @property
    def q(self):
        return Q(self.sqlite_cursor)

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
        return ToolQQ(self.sqlite_cursor)

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
        try:
            html = app.get(url).text
        except Exception:
            print(f"{idx + 1}/{len(what_to_render)}: {url} -> {html_path}: error")
            raise
        else:
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

    flask_city = FlaskCity(
        app,
        deps,
        ctx=dict(
            page=lambda: deps.page,
        ),
    )

    flask_city.template(
        "/",
        lambda: flask.render_template("index.html"),
        ctx=dict(
            pages_by_section=get_pages_by_section,
            events=get_events,
            feed_items=get_feed_items,
        ),
    )

    flask_city.template(
        "/sections",
        lambda: flask.render_template("sections.html"),
        ctx=dict(pages_by_section=get_pages_by_section),
    )

    flask_city.template(
        "/feed/<index>",
        lambda index: flask.render_template(f"feed/{index}"),
        ignore_global_ctx=True,
    )

    flask_city.template(
        "/login",
        lambda: flask.render_template(f"login.html"),
    )

    flask_city.template(
        "/travel",
        lambda: flask.render_template(f"fun/travel/index.html"),
        ctx=dict(places=get_travel_places),
    )

    add_recipes_routes(app, deps)

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
            f"fun/books/index.html",
            page=deps.page,
            wip_books=wip_books,
            wishlist_books=wishlist_books,
            done_books=done_books,
        )

    @app.route("/books/<book_key>")
    def book_page(book_key):
        book = deps.book_store.first_by_url(url=flask.request.path)

        return render_template(
            f"fun/books/book.html",
            page=deps.page,
            book=book,
        )

    # endregion books

    add_beer_routes(app, deps)

    # region money
    @app.route("/money")
    def money_page():
        return render_template("work/money/index.html", page=deps.page)

    # endregion money

    # region wishlist
    @app.route("/wishlist")
    def wishlist_page():
        return render_template("fun/wishlist/index.html", page=deps.page)

    # endregion wishlist

    # region mu
    @app.route("/mu")
    def mu_page():
        return render_template("fun/mu/index.html", page=deps.page)

    # endregion mu

    # region games
    @app.route("/games")
    def games_page():
        games = deps.game_store.list_all(order_by="played_date desc")
        wishlist = [game for game in games if game.wishlist]
        games = [game for game in games if not game.wishlist]
        current = games[0]

        return render_template(
            "fun/games/index.html",
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

        tools = reduce(
            lambda x, y: x - y,
            map(set, [image_tools, python_tools, pinned_tools, ai_tools]),
            set(tools),
        )

        return render_template(
            "work/tools/index.html",
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
            "work/tools/codegen.html",
            page=deps.page,
        )

    @app.route(
        "/tools/turik",
    )
    def turik_page():

        return render_template(
            "work/tools/turik.html",
            page=deps.page,
        )

    @app.route("/n/projects")
    def projects_page():
        return render_md_as_html_template(
            "n/projects.md",
            page=deps.page,
        )

    @app.route("/hardware")
    def hardware_page():
        return render_template(
            "fun/hardware/index.html",
            page=deps.page,
        )

    @app.route("/n/<page>")
    def n_any_page(page):
        try:
            return render_md_as_html_template(
                f"n/{page}.md",
                page=deps.page,
            )
        except FileNotFoundError:
            return render_template(
                f"n/{page}.html",
                page=deps.page,
            )

    @app.route("/mind/<page>")
    def mind_any_page(page):
        return render_md_as_html_template(
            f"mind/{page}.md",
            page=deps.page,
        )

    @app.route("/mind")
    def mind_index():
        return render_md_as_html_template(
            f"mind/index.md",
            page=deps.page,
        )

    @app.route("/n")
    def n_page():
        return render_md_as_html_template(
            "n/index.md",
            page=deps.page,
        )

    @app.route("/n/cv")
    def n_cv_page():
        return render_template(
            "n/cv.html",
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
            "food/rest/index.html",
            page=deps.page,
            restaurants=deps.restaurant_store.list_all(),
        )

    @app.route("/food")
    def food_page():
        food = deps.q.select_all("select * from mmm_food", as_=Food.from_sql)

        food = set_restaurants_for_food(food)

        food_by_cuisine = groupby_dict(food, lambda food: food.cuisine or "Без категории")
        return render_template(
            "food/index.html",
            page=deps.page,
            food_by_cuisine=food_by_cuisine,
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
            "food/rest/add.html",
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

    return app
