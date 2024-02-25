import datetime
import enum
import os
from pathlib import Path

import flask
import frontmatter
import mistune
import yaml
from bs4 import BeautifulSoup
from dateutil.parser import parse
from pydantic import BaseModel, Field, root_validator, validator

from potyk_io_back.notes import smart_truncate


class PageExt(enum.StrEnum):
    md = "md"
    html = "html"


class Page(BaseModel):
    key: str
    ext: PageExt
    # abs_path=r"C:\Users\GANSOR\PycharmProjects\potykion.github.io\content\notes\1-again\15-01.md",
    # ="notes/1-again/15-01.md",
    template_path: str
    # ="Что в твоей тарелке 15.01",
    title: str
    desc: str
    url: str
    created: datetime.datetime


class Section(BaseModel):
    key: str
    url: str
    title: str
    dates: str
    subsections: list["Section"] = Field(default_factory=list)
    pages: list[Page] = Field(default_factory=list)

    def get_subsection(self, section):
        return next(sec for sec in self.subsections if sec.key == section)


def read_content(content_path) -> Section:
    content_section = _parse_section("content", os.walk(content_path), content_path)
    return content_section


def _parse_section(key, walk, content_path):
    path, sub_sections, files = next(walk)

    sub_sections = [sec for sec in sub_sections if sec != "templates"]
    while "templates" in path:
        path, sub_sections, files = next(walk)

    files = [file for file in files if file != "index.html"]

    meta_yml = any(file == "meta.yml" for file in files)
    if meta_yml:
        files = [file for file in files if file != "meta.yml"]
        with open(Path(path) / "meta.yml", encoding="utf-8") as f:
            meta = yaml.load(f, Loader=yaml.Loader)
        title = meta.get("title") or key
        dates = meta.get("dates", "")
    else:
        title = key
        dates = ""

    section = Section(
        key=key,
        url=make_relative_path(path, content_path),
        title=title,
        dates=dates,
        pages=files and _parse_files(files, path, content_path),
        subsections=[
            _parse_section(sub_section, walk, content_path)
            for sub_section in sub_sections
        ],
    )

    return section


def parse_dt(raw):
    if isinstance(raw, datetime.date):
        return datetime.datetime.combine(raw, datetime.time())
    if isinstance(raw, datetime.datetime):
        return raw
    return parse(raw)


def make_relative_path(path, root) -> str:
    return path[len(str(root)) :].replace("\\", "/") or '/'


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

        elif ext == PageExt.html:
            html = flask.render_template(template_path)
            soup = BeautifulSoup(html, "html.parser")
            title = soup.find("meta", property="og:title").get("content")
            desc = soup.find("meta", property="og:description").get("content")

        else:
            raise ValueError(f"Cannot parse file with such ext: {ext}")

        pages.append(
            Page(
                key=key,
                ext=ext,
                template_path=template_path,
                title=title,
                desc=desc,
                created=created,
                url=url,
            )
        )
    return pages


if __name__ == "__main__":
    content_path = Path("..").resolve() / "content"
    read_content(content_path)
