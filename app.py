import frontmatter
import mistune
from flask import Flask, render_template, render_template_string

from potyk_io_back.articles import Articles, get_prev_article, get_next_article

app = Flask(__name__, template_folder="articles")


@app.route("/")
def index():
    return render_template("index.html", articles=Articles)


@app.route("/<article>")
def article(article: str):
    ctx = {
        "prev": get_prev_article(article),
        "next": get_next_article(article),
    }

    if article.endswith('.md'):
        raw_md = render_template(article)
        md = frontmatter.loads(raw_md)

        html = mistune.html(md.content)
        ctx.update( {
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
        return render_template(article, **ctx)
