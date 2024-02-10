import os.path
from pathlib import Path

import flask
import frontmatter
import mistune
from flask import Flask, render_template, render_template_string

from potyk_io_back.articles import Articles, get_prev_article, get_next_article

SUPPORTED_ARTICLE_TYPES = ('.html', '.md')

app = Flask(__name__, template_folder="content")


@app.route("/")
def index():
    return render_template("index.html", articles=Articles)


@app.route("/<article>")
def article(article: str):
    if article.startswith('favicon.ico'):
        return ''

    if article.startswith('index'):
        return flask.redirect("/")

    ctx = {
        "prev": get_prev_article(article),
        "next": get_next_article(article),
    }

    article_template_name = make_article_template_name(article)
    if not article_template_name:
        return flask.abort(404)

    if article_template_name.endswith('.md'):
        raw_md = render_template(article_template_name)
        md = frontmatter.loads(raw_md)

        html = mistune.html(md.content)
        ctx.update({
            "show_title": True,
            **md.metadata
        })
        return render_template_string(
            "{% extends 'templates/base.html' %}"
            "{% block main %}" + html + '{% endblock %}',
            **ctx
        )
    else:
        # html
        return render_template(article_template_name, **ctx)


def make_article_template_name(article):
    if article.endswith(SUPPORTED_ARTICLE_TYPES):
        return article

    for ext in SUPPORTED_ARTICLE_TYPES:
        article_template_name = article + ext
        if os.path.exists(Path(app.template_folder) / article_template_name):
            return article_template_name

    return None
