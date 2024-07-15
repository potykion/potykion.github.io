import os.path

import flask
from flask import render_template

from potyk_io_back.blog_pages import BlogPageForm, BlogPage, BlogPageStore
from potyk_io_back.index_and_feed import (
    FeedForm,
    FeedCard,
    feed_card_from_form_data,
    RelFeedForm,
    feed_card_from_rel_form_data,
)


def create_page(page_form, page_store: BlogPageStore, templates_path: str):
    page = BlogPage(**page_form.data)
    page_store.insert(page)

    page_path = os.path.join(templates_path, page.html_path)
    if not os.path.exists(page_path):
        os.makedirs(os.path.dirname(page_path), exist_ok=True)
        with open(page_path, 'w', encoding='utf-8') as f:
            f.write('''{% extends "_layouts/base.html" %}
{% block main %}

TODO

{% endblock %}''')

    return page


def add_admin_routes(app: flask.Flask, deps):
    @app.route("/admin", methods=["GET", "POST"])
    def admin_page():
        page_form = BlogPageForm()
        feed_form = FeedForm()
        rel_feed_form = RelFeedForm()

        if flask.request.method == "POST":
            if page_form.validate_on_submit():
                page = create_page(page_form, deps.page_store, flask.current_app.template_folder)
                return render_template("_components/htmx_success.html", page=page)
            else:
                return render_template("_components/htmx_error.html", error=page_form.errors)

        return render_template(
            "admin/index.html",
            page=deps.page,
            page_form=page_form,
            feed_form=feed_form,
            rel_feed_form=rel_feed_form,
        )

    @app.post("/admin/feed")
    def post_admin_feed():
        feed_form = FeedForm()
        if feed_form.validate_on_submit():
            feed_card = feed_card_from_form_data(feed_form.data, app)
            deps.feed_storage.insert(feed_card)
            return render_template("_components/htmx_success.html")
        else:
            return render_template("_components/htmx_error.html", error=feed_form.errors)

    @app.post("/admin/feed/digest")
    def post_admin_feed_digest():
        feed_cards: list[FeedCard] = deps.q.select_all("select * from feed f where f.date = date()", as_=FeedCard)
        return "<br>".join(
            [
                render_template("_components/feed_card_text.html", feed_card=feed_card)
                for feed_card in feed_cards
            ]
        )

    @app.post("/admin/rel_feed")
    def post_admin_rel_feed():
        feed_form = RelFeedForm()
        if feed_form.validate_on_submit():
            feed_card = feed_card_from_rel_form_data(feed_form.data)
            deps.feed_storage.insert(feed_card)
            return render_template("_components/htmx_success.html")
        else:
            return render_template("_components/htmx_error.html", error=feed_form.errors)
