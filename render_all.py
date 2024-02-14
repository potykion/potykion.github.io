import glob
import os
import shutil
from pathlib import Path

from app import create_app

app = create_app()

what_to_render = [
    ("/", "index.html"),
    ("/notes", "notes/index.html"),
    *[
        (f"/notes/{note_key}", f"notes/{note_key}.html")
        for note_key in [
            os.path.basename(note).rsplit(".")[0]
            for note in glob.glob(f"{app.template_folder}/notes/**/*.*")
        ]
    ],
    ("/special", "special/index.html"),
    *[
        (f"/special/{note_key}", f"special/{note_key}.html")
        for note_key in [
            os.path.basename(note).rsplit(".")[0]
            for note in glob.glob(f"{app.template_folder}/special/**/*.*", recursive=True)
        ]
    ],
]


def make_server():
    return app.test_client()


def clean_and_create_dir(dist):
    if os.path.exists(dist):
        shutil.rmtree(dist)
    os.mkdir(dist)


def render(route, server):
    resp = server.get(route, follow_redirects=True)
    if resp.status_code != 200:
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
    path = dist / filename
    os.makedirs(os.path.dirname(path), exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
        f.write(rendered)


def copy_static(dist):
    shutil.copytree("./static", dist / "static", symlinks=False, ignore=None)


if __name__ == "__main__":
    server = make_server()

    dist = Path("docs")
    clean_and_create_dir(dist)

    for index, route_and_path in enumerate(what_to_render):
        route, path = route_and_path
        rendered = render(route, server)
        write_article(dist, path)
        print(f"Rendering articles: Progress: {index + 1} / {len(what_to_render)}")

    print("Coping static")
    copy_static(dist)
    shutil.copy(Path(app.static_folder) / "CNAME", dist / "CNAME")

    print(f"Done! See {dist}")
