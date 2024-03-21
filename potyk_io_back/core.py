import os
from pathlib import Path

import flask
import frontmatter
import mistune
from flask import render_template, render_template_string

BASE_DIR = Path(__file__).resolve().parent.parent

SUPPORTED_ARTICLE_TYPES = (".html", ".md")

def make_article_template_name(article, app=None):
    app = app or flask.current_app
    if article.endswith(SUPPORTED_ARTICLE_TYPES):
        return article

    for ext in SUPPORTED_ARTICLE_TYPES:
        article_template_name = article + ext
        if os.path.exists(Path(app.template_folder) / article_template_name):
            return article_template_name

    return None


def render_md_as_html(md_template):
    raw_md = render_template(md_template)
    md = frontmatter.loads(raw_md)
    html = mistune.html(md.content.replace('iframe width="560" height="315"', "iframe"))
    ctx = dict(md.metadata)
    return html, ctx


def wrap_html_to_base_template(html, ctx=None):
    ctx = ctx or {}
    return render_template_string(
        "{% extends 'templates/base.html' %}"
        "{% block main %}" + html + "{% endblock %}",
        **ctx,
    )
