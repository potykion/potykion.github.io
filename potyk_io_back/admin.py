import flask
from flask import render_template

from potyk_io_back.blog_pages import BlogPageForm, BlogPage
from potyk_io_back.index_and_feed import FeedForm


def add_admin_routes(app, deps):
    @app.route("/admin", methods=["GET", "POST"])
    def admin_page():
        page_form = BlogPageForm()
        feed_form = FeedForm()



        if flask.request.method == "POST":
            action = flask.request.form.get("action")

            if action == 'feed':
                s = 'as'

            elif not action:
                if page_form.validate_on_submit():
                    page = BlogPage(**page_form.data)
                    deps.page_store.insert(page)
                    return render_template("_components/htmx_success.html", page=page)
                else:
                    return render_template("_components/htmx_error.html", error=page_form.errors)


        return render_template(
            "admin/index.html",
            page=deps.page,
            page_form=page_form,
            feed_form=feed_form,
        )
