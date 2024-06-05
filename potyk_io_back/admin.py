import flask
from flask import render_template

from potyk_io_back.blog_pages import BlogPageForm, BlogPage


def add_admin_routes(app, deps):
    @app.route("/admin", methods=["GET", "POST"])
    def admin_page():
        page_form = BlogPageForm()

        if flask.request.method == "POST":
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
        )
