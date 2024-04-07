import datetime
import enum
import os
import sqlite3
from pathlib import Path
from unittest import mock

import flask
import frontmatter
import mistune
import yaml
from bs4 import BeautifulSoup
from dateutil.parser import parse
from pydantic import BaseModel, Field

from potyk_io_back.lazy import SimpleStorage
from potyk_io_back.notes import smart_truncate


class PageExt(enum.StrEnum):
    md = "md"
    html = "html"


class Page(BaseModel):
    key: str = ""
    ext: PageExt
    # abs_path=r"C:\Users\GANSOR\PycharmProjects\potykion.github.io\content\notes\1-again\15-01.md",
    # ="notes/1-again/15-01.md",
    template_path: str
    # ="Что в твоей тарелке 15.01",
    title: str
    desc: str
    url: str = ""
    created: datetime.datetime
    tags: list[str] = Field(default_factory=list)

    @classmethod
    def parse_from_template(cls, template_path: str, full_path: Path) -> "Page":
        title, ext = os.path.basename(template_path).rsplit(".", maxsplit=1)
        defaults = {
            "created": datetime.datetime.fromtimestamp(full_path.stat().st_ctime),
            "title": title,
        }

        if ext == PageExt.html:
            return Page.parse_from_html_template(template_path, **defaults)
        if ext == PageExt.md:
            return Page.parse_from_md_template(template_path, **defaults)

    @classmethod
    def parse_from_html_template(cls, html_template_path: str, **defaults) -> "Page":
        html = flask.render_template(
            html_template_path,
            beer=mock.MagicMock(),
            tech_tool=mock.MagicMock(),
            feed_date=mock.MagicMock(),
            prev_date=mock.MagicMock(),
            next_date=mock.MagicMock(),
            feed_items=mock.MagicMock(),
        )
        soup = BeautifulSoup(html, "html.parser")

        title = soup.find("meta", property="og:title").get("content") or defaults.get(
            "title"
        )
        desc = (
            soup.find("meta", property="og:description").get("content")
            or defaults.get("desc")
            or ""
        )
        created = defaults.get("created")
        tags = []

        return Page(
            ext=PageExt.html,
            template_path=html_template_path,
            title=title,
            desc=desc,
            tags=tags,
            created=created,
            url=html_template_path.rsplit('.', 1)[0],
        )

    @classmethod
    def parse_from_md_template(cls, md_template_path: str, **defaults) -> "Page":
        md = frontmatter.loads(flask.render_template(md_template_path))

        title = md.get("title") or defaults.get("title")
        assert title, f"No title for {md_template_path}"

        desc = md.get("desc") or defaults.get("desc")
        if not desc:
            html = mistune.html(flask.render_template_string(md.content))
            soup = BeautifulSoup(html, "html.parser")
            desc = smart_truncate(soup.get_text())

        created = parse_dt(md.get("created") or defaults.get("created"))

        tags = md.get("tags") or []

        return Page(
            ext=PageExt.md,
            template_path=md_template_path,
            title=title,
            desc=desc,
            tags=tags,
            created=created,
            url=md_template_path.rsplit('.', 1)[0],
        )

    def render(self, ctx: dict):
        if self.ext == PageExt.md:
            md = frontmatter.loads(flask.render_template(self.template_path))
            html = mistune.html(flask.render_template_string(md.content, **ctx))
            return html
        if self.ext == PageExt.html:
            return flask.render_template(self.template_path, **ctx)


class Section(BaseModel):
    key: str
    url: str
    title: str
    desc: str | None = None
    dates: str
    subsections: list["Section"] = Field(default_factory=list)
    pages: list[Page] = Field(default_factory=list)

    def get_subsection(self, section):
        return next(sec for sec in self.subsections if sec.key == section)


def read_content(content_path) -> Section:
    content_section = _parse_section("content", os.walk(content_path), content_path)
    return content_section


def _parse_section(key, walk, content_path, ignore_dirs=("templates",)):
    path, sub_sections, files = next(walk)

    if ignore_dirs:
        sub_sections = [sec for sec in sub_sections if sec not in ignore_dirs]
        while any(dir_ in path for dir_ in ignore_dirs):
            path, sub_sections, files = next(walk)

    files = [file for file in files if file != "index.html" and file != "index.md"]

    meta_yml = any(file == "meta.yml" for file in files)
    if meta_yml:
        files = [file for file in files if file != "meta.yml"]
        with open(Path(path) / "meta.yml", encoding="utf-8") as f:
            meta = yaml.load(f, Loader=yaml.Loader)
        title = meta.get("title") or key
        dates = meta.get("dates", "")
        if meta.get("ignore"):
            return None
        order = meta.get("order")
        desc = meta.get("desc")
    else:
        title = key
        dates = ""
        order = None
        desc = ""

    section = Section(
        key=key,
        desc=desc,
        url=make_relative_path(path, content_path),
        title=title,
        dates=dates,
        pages=sorted(
            files and _parse_files(files, path, content_path),
            key=lambda page: page.created,
            reverse=True,
        ),
        subsections=sorted(
            filter(
                None,
                [
                    _parse_section(sub_section, walk, content_path)
                    for sub_section in sub_sections
                ],
            ),
            key=lambda sec: (
                int(key_num)
                if (key_num := sec.key.split("-")[0]).isdigit()
                else sec.key
            ),
        ),
    )
    if order == "desc":
        section.pages = section.pages[::-1]
        section.subsections = section.subsections[::-1]

    return section


def parse_dt(raw):
    if isinstance(raw, datetime.date):
        return datetime.datetime.combine(raw, datetime.time())
    if isinstance(raw, datetime.datetime):
        return raw
    return parse(raw)


def make_relative_path(path, root) -> str:
    return path[len(str(root)) :].replace("\\", "/") or "/"


def _parse_files(files, dir_path, content_path):
    pages = []
    for file in files:
        key, ext = file.rsplit(".", 1)
        relative_path = make_relative_path(dir_path, content_path)
        template_path = f"{relative_path}/{file}"
        url = f"{relative_path}/{key}"
        if relative_path.startswith("/notes"):
            url = f"/notes/{key}"

        file_path = Path(dir_path) / file
        file_created = datetime.datetime.fromtimestamp(file_path.stat().st_ctime)

        created = file_created

        if ext == PageExt.md:
            md = frontmatter.load(file_path)
            title = md.get("title")
            desc = md.get("desc")
            if not desc:
                html = mistune.html(flask.render_template_string(md.content))
                soup = BeautifulSoup(html, "html.parser")
                desc = smart_truncate(soup.get_text())
                if md.get("created"):
                    created = parse_dt(md.get("created"))
            tags = md.get("tags") or []
        elif ext == PageExt.html:
            html = flask.render_template(
                template_path,
                beer=mock.MagicMock(),
                tech_tool=mock.MagicMock(),
                feed_date=mock.MagicMock(),
                prev_date=mock.MagicMock(),
                next_date=mock.MagicMock(),
                feed_items=mock.MagicMock(),
            )
            soup = BeautifulSoup(html, "html.parser")
            title = soup.find("meta", property="og:title").get("content")
            desc = soup.find("meta", property="og:description").get("content")
            tags = []
        else:
            raise ValueError(f"Cannot parse file with such ext: {ext}")

        pages.append(
            Page(
                key=key,
                ext=ext,
                template_path=template_path,
                title=title or key,
                desc=desc,
                created=created,
                url=url,
                tags=tags,
            )
        )
    return pages


class PageStorage:
    def __init__(self, sqlite3_cursor: sqlite3.Cursor):
        self.sqlite3_cursor = sqlite3_cursor
        self.simple_storage = SimpleStorage(sqlite3_cursor, "pages")

    def sync(self, pages):
        existing_templates = [
            row[0]
            for row in self.sqlite3_cursor.execute(
                "select template_path from pages"
            ).fetchall()
        ]

        existing_pages = []
        new_pages = []
        for page in pages:
            if page.template_path in existing_templates:
                existing_pages.append(page)
            else:
                new_pages.append(page)

        for page in new_pages:
            self.sqlite3_cursor.execute(
                "insert into pages (template_path, title, desc, created, url) values (?, ?, ?, ?, ?)",
                (page.template_path, page.title, page.desc, page.created, page.url),
            )
        for page in existing_pages:
            self.sqlite3_cursor.execute(
                "update pages set title = ?, desc = ?, created = ? where template_path = ?",
                (page.title, page.desc, page.created, page.template_path),
            )

        self.sqlite3_cursor.connection.commit()


def sync_pages(
    sqlite3_cursor: sqlite3.Cursor,
    pages_dir_path: Path,
    ignore_dirs=("templates",),
    ignore_pages=("index.html",),
) -> None:
    storage = PageStorage(sqlite3_cursor)

    page_files = []
    for dir_, __, files in os.walk(pages_dir_path):

        for file in files:
            if not file.endswith((".html", ".md")):
                continue

            # content\\drafts\\2024-03-24.md
            full_path = Path(dir_) / file
            # drafts/2024-03-24.md
            template_path = str(full_path)[len(str(pages_dir_path)) + 1 :].replace(
                "\\", "/"
            )

            if template_path.startswith(ignore_dirs):
                continue

            if template_path.endswith(ignore_pages):
                continue

            page_files.append((full_path, template_path))

    all_pages = [
        Page.parse_from_template(
            template_path,
            full_path,
        )
        for full_path, template_path in page_files
    ]

    storage.sync(all_pages)


if __name__ == "__main__":
    content_path = Path("..").resolve() / "content"
    read_content(content_path)
