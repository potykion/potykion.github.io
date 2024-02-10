import glob
import os
import shutil
from pathlib import Path
from app import app


def make_server():
    return app.test_client()


def clean_and_create_dir(dist):
    if os.path.exists(dist):
        shutil.rmtree(dist)
    os.mkdir(dist)


def list_articles():
    return glob.glob(f"{app.template_folder}/*.*")


def render_article(article, server):
    path = article_path_to_filename(article)
    resp = server.get(f"/{path}", follow_redirects=True)
    if resp.status_code != 200:
        raise RuntimeError(f"Failed to render page: {article}")
    return resp.text


def article_path_to_filename(article):
    return os.path.split(article)[-1]


def make_filename(article):
    filename = article_path_to_filename(article)
    if filename.endswith(".md"):
        filename = filename[:-3] + ".html"
    return filename


def write_article(dist, filename):
    with open(dist / filename, "w", encoding="utf-8") as f:
        f.write(rendered)


def copy_static(dist):
    shutil.copytree("./static", dist / "static", symlinks=False, ignore=None)


if __name__ == "__main__":
    server = make_server()

    dist = Path("docs")
    clean_and_create_dir(dist)

    articles = list_articles()
    for index, article in enumerate(articles):
        rendered = render_article(article, server)
        filename = make_filename(article)
        write_article(dist, filename)
        print(f"Rendering articles: Progress: {index + 1} / {len(articles)}")

    print("Coping static")
    copy_static(dist)
    shutil.copy(Path(app.static_folder) / "CNAME", dist / "CNAME")

    print(f"Done! See {dist}")
