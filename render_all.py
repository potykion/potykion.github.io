import glob
import os
import shutil
from itertools import chain
from pathlib import Path
from urllib.parse import urljoin

import flask

from app import create_app

os.environ["FLASK_ENV"] = "prod"
# os.environ["FLASK_ENV"] = "development"
# os.environ["FLASK_DEBUG"] = "1"
app = create_app()


def make_server():

    return app.test_client()


def clean_and_create_dir(dist):
    if os.path.exists(dist):
        shutil.rmtree(dist)
    os.mkdir(dist)


def render(route, server):
    resp = server.get(route, follow_redirects=True)
    if resp.status_code != 200:
        if resp.status_code == 500 and os.environ.get("FLASK_DEBUG"):
            print(resp.text)
        raise RuntimeError(f"Failed to render page: {route}")
    return resp.text


def article_path_to_filename(article):
    return os.path.split(article)[-1]


def make_filename(article):
    filename = article_path_to_filename(article)
    if filename.endswith(".md"):
        filename = filename[:-3] + ".html"
    return filename


def write_article(dist, filename):
    path = dist / filename.strip("/")
    os.makedirs(os.path.dirname(path), exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
        f.write(rendered)


def copy_static(dist):
    shutil.copytree("./static", dist / "static", symlinks=False, ignore=None)


def _add_section_to_render(section, with_section=True):
    return [
        *([(section.url, section.url + "/index.html")] if with_section else []),
        *((page.url, f"{page.url}.html") for page in section.pages),
        *chain.from_iterable(
            (
                _add_section_to_render(
                    sub,
                    with_section=section.key != "notes" and section.key != "special",
                )
                for sub in section.subsections
            )
        ),
    ]


def make_sitemap(routes, save_dir):
    import xmltodict

    # Example list of URLs
    urls = [urljoin("https://potyk.io", route) for route in routes]

    # Prepare the sitemap structure
    sitemap = {
        "urlset": {"@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9", "url": []}
    }

    # Populate the sitemap with URLs
    for url in urls:
        sitemap["urlset"]["url"].append({"loc": url})

    # Convert the sitemap dictionary to XML
    sitemap_xml = xmltodict.unparse(sitemap, pretty=True)

    # Save the sitemap to a file
    with open(save_dir / "sitemap.xml", "w") as f:
        f.write(sitemap_xml)

    print("Sitemap generated successfully.")


if __name__ == "__main__":
    server = make_server()

    dist = Path("docs")
    clean_and_create_dir(dist)

    with app.app_context():
        content_section = app.config["CONTENT"]

    what_to_render = _add_section_to_render(content_section)

    for index, route_and_path in enumerate(what_to_render):
        route, path = route_and_path
        rendered = render(route, server)
        write_article(dist, path)
        print(f"Rendering articles: Progress: {index + 1} / {len(what_to_render)}")

    make_sitemap([route for route, path in what_to_render], dist)

    print("Coping static")
    copy_static(dist)
    shutil.copy(Path(app.static_folder) / "CNAME", dist / "CNAME")

    print(f"Done! See {dist}")
