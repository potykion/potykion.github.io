from flask import Flask, render_template

what_to_render = [
    ("/", "index.html"),
    ("/recipes", "recipes/index.html"),
    ("/recipes/banh-mi", "recipes/banh-mi.html"),
]


def render_pages(app=None):
    print("Rendering...")
    app = (app or create_app()).test_client()

    rendered = []

    for idx, url_and_path in enumerate(what_to_render):
        url, html_path = url_and_path
        html = app.get(url).text
        rendered.append((html_path, html))
        print(f"{idx+1}/{len(what_to_render)}: {url} -> {html_path}: ok")

    print("Done")
    return rendered


def create_app():
    app = Flask(__name__)

    @app.route("/")
    def index_page():
        return render_template("index.html")

    @app.route("/recipes")
    def recipes_page():
        return render_template("recipes/index.html")

    @app.route("/recipes/<recipe_key>")
    def recipe_page(recipe_key):
        return render_template(f"recipes/{recipe_key}.html")

    render_pages(app)

    return app
