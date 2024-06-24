import sqlite3

import flask
from more_itertools import chunked

import app_42
from apps.script_render_all_pages import clean_dir, make_dir
from potyk_io_back.core import BASE_DIR
from potyk_io_back.index_and_feed import FeedCard


def main(app, deps):
    feed_cards: list[FeedCard] = deps.q.select_all("select * from feed order by date desc, priority desc, id", as_=FeedCard)

    with app.app_context():
        chunks = tuple(chunked(feed_cards, 10))
        for index, cards in enumerate(chunks):
            deps.feed_storage.prep_feed_items(cards)

            feed_card_html = "".join(
                flask.render_template("_components/feed_card.html", feed_card=card) for card in cards
            )

            if index != len(chunks) - 1:
                feed_next_btn_html = flask.render_template("_components/feed_next_btn.html", index=index + 1)
            else:
                feed_next_btn_html = ""

            with open(BASE_DIR / "templates" / "feed" / f"{index}.html", "w", encoding="utf-8") as f:
                f.write(feed_card_html + feed_next_btn_html)
            with open(dist / f"{index}.html", "w", encoding="utf-8") as f:
                f.write(feed_card_html + feed_next_btn_html)


if __name__ == "__main__":
    dist = BASE_DIR / "docs" / "feed"
    clean_dir(dist)
    make_dir(dist)

    clean_dir(BASE_DIR / "templates" / "feed")
    make_dir(BASE_DIR / "templates" / "feed")

    sqlite_conn = sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False)

    app = app_42.create_app(server_name='potyk.io')
    deps = app_42.Deps(sqlite_conn=sqlite_conn, sqlite_cursor=sqlite_conn.cursor())

    main(app, deps)
