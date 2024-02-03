import frontmatter
import mistune
from flask import Flask, render_template, render_template_string

app = Flask(__name__, template_folder="articles")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/<article>")
def article(article: str):
    if article.endswith('.md'):
        raw_md = render_template(article)
        md = frontmatter.loads(raw_md)

        html = mistune.html(md.content)
        ctx = {
            "show_title": True,
            **md.metadata
        }
        return render_template_string(
            "{% extends 'templates/base.html' %}"
            "{% block main %}" + html + '{% endblock %}',
            **ctx
        )
    else:
        # html
        return render_template(article)
