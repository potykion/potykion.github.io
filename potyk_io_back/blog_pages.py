import enum
from enum import auto

import flask
import frontmatter
import mistune
from flask import render_template_string, render_template
from flask_wtf import FlaskForm
from mistune import HTMLRenderer
from mistune.plugins.footnotes import footnotes
from mistune.plugins.formatting import strikethrough
from mistune.plugins.table import table
from mistune.plugins.task_lists import task_lists
from pydantic import BaseModel, Field
from wtforms.fields.choices import SelectField
from wtforms.fields.simple import StringField, BooleanField, HiddenField
from wtforms.validators import Optional

from potyk_io_back.core import BASE_DIR
from potyk_io_back.q import Q
from potyk_io_back.utils.form import FieldRenderKw


class BlogPageSection(enum.StrEnum):
    fun = auto()
    work = auto()
    food = auto()
    n = auto()

    recipes_sweet = auto()
    recipes_asian = auto()
    recipes_main = auto()
    recipes_breakfast = auto()
    recipes_pasta = auto()
    recipes_soup = auto()
    recipes_salad = auto()

    @classmethod
    def recipe_sections(cls):
        return [
            cls.recipes_breakfast,
            cls.recipes_main,
            cls.recipes_asian,
            cls.recipes_salad,
            cls.recipes_pasta,
            cls.recipes_soup,
            cls.recipes_sweet,
        ]

    @classmethod
    def recipe_section_options(cls):
        return [(sec, sec.to_str()) for sec in cls.recipe_sections()]

    @classmethod
    def options(cls, *, w_none=True, w_recipes=False):
        options: list[tuple[BlogPageSection | str | None, str]] = []

        if w_none:
            options.append((None, "Не выбран"))

        if w_recipes:
            options += [(sec, sec.to_str()) for sec in cls]
        else:
            options += [(sec, sec.to_str()) for sec in set(cls) - set(cls.recipe_sections())]

        return options

    def to_str(self):
        match self:
            case BlogPageSection.fun:
                return "Развлекуха"
            case BlogPageSection.work:
                return "Работка"
            case BlogPageSection.food:
                return "<i>#чепожрать?</i>"
            case BlogPageSection.n:
                return "Личное"

            case BlogPageSection.recipes_sweet:
                return "Сладости"
            case BlogPageSection.recipes_asian:
                return "Азиатка"
            case BlogPageSection.recipes_main:
                return "Основное"
            case BlogPageSection.recipes_breakfast:
                return "Завтрак"
            case BlogPageSection.recipes_pasta:
                return "Паста"
            case BlogPageSection.recipes_soup:
                return "Суп"
            case BlogPageSection.recipes_salad:
                return "Салат"


class BlogPage(BaseModel):
    url: str
    html_path: str
    title: str
    desc: str | None = ""
    section: BlogPageSection | None = None
    include_in_index: bool | None = False
    breadcrumbs_title: str | None = ""
    tags: tuple[str, ...] = Field(default_factory=tuple)

    breadcrumbs: list["BlogPage"] = Field(default_factory=list)

    @classmethod
    def from_sql(cls, row):
        row = {**row}
        row["tags"] = sorted(
            (row["tags"] or "").split(","),
        )
        return cls(**row)


def generate_breadcrumbs(path):
    """
    >>> generate_breadcrumbs('/recipes/banh-mi')
    ['/', '/recipes', '/recipes/banh-mi']
    """
    subpaths = ["/"]
    current_path = ""
    for segment in path.split("/"):
        if segment:  # Ignore empty segments
            current_path += "/" + segment
            subpaths.append(current_path)
    return subpaths


class BlogPageStore:
    def __init__(self, sqlite_cursor):
        self.sqlite_cursor = sqlite_cursor
        self.q = Q(self.sqlite_cursor, select_as=BlogPage.from_sql)

    def insert(self, page):
        self.q.execute(
            "insert into blog_pages (url, html_path, title, desc, section, include_in_index, breadcrumbs_title) values (?, ?, ?, ?, ?, ?, ?)",
            (
                page.url,
                page.html_path,
                page.title,
                page.desc,
                page.section,
                page.include_in_index,
                page.breadcrumbs_title,
            ),
            commit=True,
        )

    def list_index(self):
        return self.q.select_all(
            "select * from blog_pages where include_in_index = 1 order by section", as_=BlogPage.from_sql
        )

    def list_recipe_pages(self) -> list[BlogPage]:
        return self.q.select_all(
            "select * from blog_pages where section like 'recipes_%' order by section",
            as_=BlogPage.from_sql,
        )

    def list_all(self):
        return self.q.select_all(
            "select * from blog_pages",
        )

    def get_by_url(self, url) -> BlogPage:
        page: BlogPage = self.q.select_one("select * from blog_pages where url = ?", (url,))
        self._row_to_page(page, breadcrumbs=True)
        return page

    def _row_to_page(self, row_or_page, *, breadcrumbs=False):
        page = row_or_page

        if breadcrumbs:
            subpaths = generate_breadcrumbs(page.url)

            placeholders = ", ".join("?" for _ in subpaths)

            page.breadcrumbs = self.q.select_all(
                f"select * from blog_pages where url in ({placeholders}) order by url",
                params=subpaths,
            )

        page.breadcrumbs_title = page.breadcrumbs_title or page.title

        return page


class BlogPageForm(FlaskForm):
    action = HiddenField(default="page")
    url = StringField("Url", render_kw=FieldRenderKw(placeholder="/recipes"))
    html_path = StringField(
        "Путь к HTML файлу после рендеринга",
        render_kw=FieldRenderKw(placeholder="recipes/index.html"),
    )
    title = StringField("Название", render_kw=FieldRenderKw(placeholder="Рецептики"))
    desc = StringField("Описание", render_kw=FieldRenderKw(placeholder="Вкусные и не очень"))
    section = SelectField(
        "Раздел",
        coerce=lambda val: val if str(val) != str(None) else None,
        validators=[Optional()],
        choices=BlogPageSection.options(w_recipes=False),
    )
    include_in_index = BooleanField("Показывать на главной?")
    breadcrumbs_title = StringField(
        "Название в хлебных крошках (опц.)", render_kw=FieldRenderKw(placeholder="Рецы")
    )


class TaskListsAndNoEscapeRenderer(HTMLRenderer):
    def task_list_item(self, text, checked=False, **attrs):
        return render_template("_components/md_checkbox.html", checked=checked, text=text)

    def text(self, text: str) -> str:
        return text

    def paragraph(self, text: str) -> str:
        if text.strip().startswith(("{%", "{{")):
            return text
        else:
            return "<p>" + text + "</p>\n"


markdown_to_html = mistune.Markdown(
    TaskListsAndNoEscapeRenderer(escape=False),
    plugins=[
        strikethrough,
        footnotes,
        table,
        task_lists,
    ],
)


def render_md_as_html_template(template, **kwargs):
    template_path = BASE_DIR / flask.current_app.template_folder / template

    md = frontmatter.load(str(template_path)).content

    html = markdown_to_html(md)

    if html.startswith("{% extends"):
        html_template = html
    else:
        html_template = '{% extends "_layouts/base.html" %}{% block main %}' + html + "{% endblock %}"

    html = render_template_string(
        html_template,
        **kwargs,
    )
    return html
