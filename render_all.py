import glob
import os
import shutil
from pathlib import Path


def make_server():
    from app import app

    return app.test_client()


def clean_and_create_dir(dist):
    if os.path.exists(dist):
        shutil.rmtree(dist)
    os.mkdir(dist)


def list_articles():
    return glob.glob("./articles/*.*")


def render_article(article, server):
    path = article_path_to_filename(article)
    # FlaskUrl = "http://127.0.0.1:5000"
    # return requests.get(urljoin(FlaskUrl, path)).text
    return server.get(f'/{path}').text


def article_path_to_filename(article):
    return os.path.split(article)[-1]


def make_filename(article):
    filename = article_path_to_filename(article)
    if filename.endswith('.md'):
        filename = filename[:-3] + '.html'
    return filename


def write_article(dist, filename):
    with open(dist / filename, 'w', encoding='utf-8') as f:
        f.write(rendered)


def copy_static(dist):
    shutil.copytree("./static", dist / 'static', symlinks=False, ignore=None)


if __name__ == '__main__':
    server = make_server()

    dist = Path("dist")
    clean_and_create_dir(dist)

    articles = list_articles()
    for index, article in enumerate(articles):
        rendered = render_article(article, server)
        filename = make_filename(article)
        write_article(dist, filename)
        print(f"Rendering articles: Progress: {index + 1} / {len(articles)}")

    print("Coping static")
    copy_static(dist)

    print(f'Done! See {dist}')

