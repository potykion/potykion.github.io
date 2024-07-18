import os
import shutil
import sqlite3
from functools import partial
from pathlib import Path
from urllib.parse import urljoin

import app_42
from app_42 import render_pages, Deps
from potyk_io_back.config import BASE_DIR

os.environ["FLASK_ENV"] = "prod"
# os.environ["FLASK_ENV"] = "development"
# os.environ["FLASK_DEBUG"] = "1"


clean_dir = partial(shutil.rmtree, ignore_errors=True)
make_dir = partial(os.makedirs, exist_ok=True)


def write_article(dist, filename, rendered):
    path = dist / filename.strip("/")
    os.makedirs(os.path.dirname(path), exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
        f.write(rendered)


copy_dir = partial(shutil.copytree, symlinks=False, ignore=None)


def make_sitemap(routes, save_dir):
    import xmltodict

    # Example list of URLs
    urls = [urljoin("https://potyk.io", route) for route in routes]

    # Prepare the sitemap structure
    sitemap = {"urlset": {"@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9", "url": []}}

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
    dist = BASE_DIR / "docs"
    clean_dir(dist)
    make_dir(dist)

    sqlite_conn = sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False)

    app = app_42.create_app(server_name='potyk.io')
    deps = Deps(sqlite_conn=sqlite_conn, sqlite_cursor=sqlite_conn.cursor())

    pages = render_pages(app, deps)
    for _, path, rendered in pages:
        write_article(dist, path, rendered)

    make_sitemap([url for url, _, __ in pages], dist)

    print("Coping static")
    copy_dir(BASE_DIR / "static", dist / "static")
    copy_dir(BASE_DIR / "templates", dist / "templates")
    shutil.copy(Path(app.static_folder) / "CNAME", dist / "CNAME")
    shutil.copy(Path(app.static_folder) / "favicon.ico", dist / "favicon.ico")
    shutil.copy(Path(app.static_folder) / "cv.pdf", dist / "cv.pdf")

    print(f"Done! See {dist}")
