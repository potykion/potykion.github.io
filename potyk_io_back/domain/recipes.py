import json
import re
from operator import attrgetter
from typing import ClassVar

import flask
from flask import render_template
from flask_wtf import FlaskForm
from jinja2 import TemplateNotFound
from pydantic import BaseModel, computed_field
from wtforms.fields.choices import SelectField
from wtforms.fields.simple import StringField, TextAreaField, BooleanField
from wtforms.validators import InputRequired

from potyk_io_back.domain.blog_pages import BlogPage, BlogPageSection, render_md_as_html_template
from potyk_io_back.core.config import BASE_DIR
from potyk_io_back.core.iter_utils import groupby_dict
from potyk_io_back.core.services import sql
from potyk_io_back.core.form import FieldRenderKw


class ProstoKuhnyaRecipe(BaseModel):
    title: str = ""


class ProstoKuhnyaIssue(BaseModel):
    recipes_amount: ClassVar[int] = 5

    id: int
    issue_number: str
    youtube_url: str
    recipes: list[ProstoKuhnyaRecipe]

    @computed_field
    @property
    def sort_key(self) -> tuple[int, str]:
        parts = self.issue_number.split("_")
        return int(parts[0]), (parts[1] if len(parts) > 1 else "")

    @classmethod
    def from_json(cls, json_):
        json_ = {**json_}

        json_["recipes"] = json.loads(json_["recipes"])
        issue = ProstoKuhnyaIssue(**json_)

        for rec in issue.recipes:
            if rec.title.startswith("\"'"):
                rec.title = rec.title.strip("\"'")

        return issue

    @computed_field
    @property
    def recipes_pad(self) -> list[ProstoKuhnyaRecipe]:
        return self.recipes + [ProstoKuhnyaRecipe()] * max(self.recipes_amount - len(self.recipes), 0)


class RecipeForm(FlaskForm):
    file_slug = StringField(
        "Файл / slug",
        validators=[InputRequired()],
        render_kw=dict(placeholder="asian-fried-rice"),
    )
    title = StringField(
        "Название",
        validators=[InputRequired()],
        render_kw=dict(placeholder="Жареный рисик в азиатском стиле"),
    )
    desc = StringField(
        "Описание",
        validators=[InputRequired()],
        render_kw=dict(
            placeholder="Наипростейшая азиаточка: тупа все что есть в холодосе сваливаешь в сковороду"
        ),
    )
    section = SelectField(
        "Раздел",
        validators=[InputRequired()],
        choices=BlogPageSection.recipe_section_options(),
    )

    ingredients_md = TextAreaField(
        "Ингредиенты (.md)",
        validators=[InputRequired()],
        render_kw=dict(placeholder="- Яйца\n- Лук"),
    )
    ingredients_make_list = BooleanField("Сделать список?", default=True)
    ingredients_remove_brackets = BooleanField("Убрать скобки?")

    cooking_youtube = StringField(
        "Ссылка на YouTube (будет добавлена в начало блока Приготовление)",
        render_kw=FieldRenderKw(placeholder="https://youtu.be/3QEvEZh8jpc?si=XYOnG_UFmfYoyb0h"),
    )
    cooking_link = StringField(
        "Ссылка на текстовый рецепт (будет добавлена в начало блока Приготовление)",
        render_kw=FieldRenderKw(placeholder="https://vk.com/wall-39128795_34992"),
    )
    cooking_md = TextAreaField(
        "Приготовление (.md)",
        validators=[InputRequired()],
        render_kw={"placeholder": "- Яйца отварить\n-Лук обжарить"},
    )
    cooking_make_list = BooleanField("Сделать список?", default=True)
    cooking_remove_quotes = BooleanField("Убрать кавычки?", default=False)


def make_recipe_md_text(form_data) -> str:
    def youtube_to_md(youtube_url):
        return "{{ " + f'"{youtube_url}" | youtube_embed' + " }}"

    def link_to_md(url):
        return f"[{url}]({url})"

    def make_list(raw_list, *, remove_brackets=False, remove_quotes=False):
        lines = raw_list.strip().splitlines()

        list_lines = []
        for line in lines:
            list_line = line

            list_line = trim_quotes(list_line) if remove_quotes else list_line

            if list_line.startswith(">") or list_line.strip() == "":
                list_line = list_line
            else:
                list_line = list_line if list_line.startswith("- ") else f"- {list_line}"

                list_line = remove_brackets_from_str(list_line) if remove_brackets else list_line

            list_lines.append(list_line)

        return "\n".join(list_lines)

    ingredients_md: str = form_data["ingredients_md"]
    if form_data["ingredients_make_list"]:
        ingredients_md = make_list(ingredients_md, remove_brackets=form_data["ingredients_remove_brackets"])

    cooking_md = form_data["cooking_md"]
    if form_data["cooking_make_list"]:
        cooking_md = make_list(cooking_md, remove_quotes=form_data["cooking_remove_quotes"])

    return "\n\n".join(
        filter(
            None,
            [
                "## Ингредиенты",
                ingredients_md,
                "## Приготовление",
                youtube_to_md(form_data["cooking_youtube"]) if form_data["cooking_youtube"] else None,
                link_to_md(form_data["cooking_link"]) if form_data["cooking_link"] else None,
                cooking_md,
            ],
        )
    )


def remove_brackets_from_str(text):
    """
    >>> remove_brackets_from_str('sample (text) (text 2)')
    'sample'
    """
    return re.sub(r"\(.*?\)", "", text).strip()


def trim_quotes(text: str):
    """
    >>> remove_brackets_from_str('"sample"')
    'sample'
    """
    return text.strip('"')


def add_recipes_routes(app, deps):
    @app.route("/recipes")
    def recipes_page():
        recipe_pages = deps.page_store.list_recipe_pages()
        pages_by_section = groupby_dict(recipe_pages, attrgetter("section"))

        tags = BlogPageSection.recipe_section_options()

        return render_template(
            "food/recipes/index.html",
            page=deps.page,
            tags=tags,
            recipe_pages=[page.model_dump() for page in recipe_pages],
            pages_by_section=pages_by_section,
        )

    @app.route("/recipes/form", methods=["GET", "POST"])
    def recipes_form_page():
        form = RecipeForm()

        if flask.request.method == "POST":
            if form.validate_on_submit():
                form_data = form.data

                recipe_md_path = BASE_DIR / f"templates/recipes/{form_data['file_slug']}.md"
                with open(recipe_md_path, "w", encoding="utf-8") as f:
                    f.write(make_recipe_md_text(form_data))

                page = BlogPage(
                    url=f'/recipes/{form_data["file_slug"]}',
                    html_path=f'recipes/{form_data["file_slug"]}.html',
                    title=form_data["title"],
                    desc=form_data["desc"],
                    section=form_data["section"],
                )
                deps.page_store.insert(page)

                return render_template("_components/htmx_success.html", page=page)
            else:
                return form.errors, 400

        return render_template("food/recipes/form.html", page=deps.page, form=form)

    @app.route("/recipes/prosto-kuhnya")
    def route_recipes_prosto_kuhnya():
        issues: list[ProstoKuhnyaIssue] = deps.q.select_all(
            "select * from recipes_prosto_kuhnya_issues",
            as_=ProstoKuhnyaIssue.from_json,
        )
        issues = sorted(issues, key=lambda issue: issue.sort_key, reverse=True)

        return render_template(
            "food/recipes/prosto-kuhnya.html",
            page=deps.page,
            issues=[i.model_dump() for i in issues],
        )

    @app.route("/recipes/breakfast")
    def route_recipes_breakfast():
        recipes = sql().select_all(
            "select * from blog_pages where section = 'recipes_breakfast'",
            as_=BlogPage.from_sql,
        )
        recipes = sorted(recipes, key=lambda recipe: recipe.tags)

        tags = list({tag for recipe in recipes for tag in recipe.tags})
        recipes_json = [rec.model_dump() for rec in recipes]


        return render_template(
            "food/recipes/breakfast.html",
            page=deps.page,
            recipes=recipes_json,
            tags=tags,
        )

    @app.route("/recipes/<recipe_key>")
    def recipe_page(recipe_key):
        try:
            # noinspection PyUnresolvedReferences
            return render_template(
                f"food/recipes/{recipe_key}.html",
                page=deps.page,
            )
        except TemplateNotFound:
            try:
                return render_md_as_html_template(
                    f"recipes/{recipe_key}.md",
                    page=deps.page,
                )
            except TemplateNotFound:
                raise Exception(f"Failed to find {recipe_key}.html / {recipe_key}.md")
