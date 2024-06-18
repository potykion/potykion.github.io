import enum
from enum import auto

import flask
import frontmatter
import mistune
from mistune import HTMLRenderer
from mistune.plugins.task_lists import task_lists
from flask import render_template_string, render_template
from flask_wtf import FlaskForm
from pydantic import BaseModel, Field
from wtforms.fields.choices import SelectField
from wtforms.fields.simple import StringField, BooleanField, HiddenField
from wtforms.validators import Optional

from potyk_io_back.lazy import SimpleStorage
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

    breadcrumbs: list["BlogPage"] = Field(default_factory=list)


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
        self.store = SimpleStorage(self.sqlite_cursor, "blog_pages", BlogPage)
        self.q = Q(self.sqlite_cursor, select_all_as=BlogPage)

    def insert(self, page):
        self.q.execute(
            "insert into blog_pages " "(url, html_path, title, desc, section) " "values " "(?, ?, ?, ?, ?)",
            (page.url, page.html_path, page.title, page.desc, page.section),
            commit=True,
        )

    def list_index(self):
        return self.q.select_all("select * from blog_pages where include_in_index = 1 order by section")

    def list_recipe_pages(self) -> list[BlogPage]:
        return self.q.select_all(
            "select * from blog_pages where url like '/recipes/%' and url != '/recipes/form' order by section"
        )

    def list_all(self, breadcrumbs=False, **kwargs):
        pages = self.store.list_all(**kwargs)
        return [self._row_to_page(page, breadcrumbs=breadcrumbs) for page in pages]

    def list_where_url_in(self, urls, breadcrumbs=False):
        placeholders = ", ".join("?" for _ in urls)
        where = f"url in ({placeholders})"
        pages = self.list_all(where=where, where_params=urls, order_by="url", breadcrumbs=breadcrumbs)
        return pages

    def get_by_url(self, url) -> BlogPage:
        page: BlogPage = self.list_where_url_in([url], breadcrumbs=True)[0]
        return page

    def _row_to_page(self, row_or_page, *, breadcrumbs=False):
        page = row_or_page

        if breadcrumbs:
            subpaths = generate_breadcrumbs(page.url)
            page.breadcrumbs = self.list_where_url_in(urls=subpaths)

        page.breadcrumbs_title = page.breadcrumbs_title or page.title

        return page


class BlogPageForm(FlaskForm):
    action = HiddenField(default='page')
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


class CustomTaskListsRenderer(HTMLRenderer):
    def task_list_item(self, text, checked=False, **attrs):
        return render_template("_components/md_checkbox.html", checked=checked, text=text)


renderer = CustomTaskListsRenderer(escape=False)
markdown = mistune.Markdown(renderer, plugins=[task_lists])


def render_md_as_html_template(template, **kwargs):
    md = flask.render_template(template)
    md = frontmatter.loads(md).content
    html = markdown(md)
    html = render_template_string(
        '{% extends "_layouts/base.html" %}{% block main %}' + html + "{% endblock %}",
        **kwargs,
    )
    return html
