from flask import Flask, render_template

app = Flask(__name__, template_folder="articles")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/<article>")
def article(article):
    return render_template(article)
