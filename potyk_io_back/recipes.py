import re
from operator import attrgetter
from typing import TypedDict

import flask
import frontmatter
import mistune
from flask import render_template, render_template_string
from flask_wtf import FlaskForm
from jinja2 import TemplateNotFound
from wtforms.fields.choices import SelectField
from wtforms.fields.simple import StringField, TextAreaField, BooleanField
from wtforms.validators import InputRequired

from potyk_io_back.core import BASE_DIR
from potyk_io_back.iter_utils import groupby_dict
from potyk_io_back.blog_pages import BlogPage, BlogPageSection
from potyk_io_back.utils.form import FieldRenderKw


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


def make_recipe_md_text(form_data) -> str:
    def youtube_to_md(youtube_url):
        return "{{ " + f'"{youtube_url}" | youtube_embed' + " }}"

    def link_to_md(url):
        return f"[{url}]({url})"

    def make_list(raw_list, *, remove_brackets_=False):
        lines = raw_list.strip().splitlines()

        list_lines = []
        for line in lines:
            if line.startswith(">") or line.strip() == "":
                list_line = line
            else:
                list_line = line if line.startswith("- ") else f"- {line}"

                list_line = remove_brackets(list_line) if remove_brackets_ else list_line

            list_lines.append(list_line)

        return "\n".join(list_lines)

    ingredients_md: str = form_data["ingredients_md"]
    if form_data["ingredients_make_list"]:
        ingredients_md = make_list(ingredients_md, remove_brackets_=form_data["ingredients_remove_brackets"])

    cooking_md = form_data["cooking_md"]
    if form_data["cooking_make_list"]:
        cooking_md = make_list(cooking_md)


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


def remove_brackets(text):
    """
    >>> remove_brackets('sample (text) (text 2)')
    'sample'
    """
    return re.sub(r"\(.*?\)", "", text).strip()


def add_recipes_routes(app, deps):
    @app.route("/recipes")
    def recipes_page():
        recipe_pages = deps.page_store.list_recipe_pages()
        pages_by_section = groupby_dict(recipe_pages, attrgetter("section"))
        return render_template(
            "recipes/index.html",
            page=deps.page,
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

        return render_template("recipes/form.html", page=deps.page, form=form)

    @app.route("/recipes/<recipe_key>")
    def recipe_page(recipe_key):
        try:
            # noinspection PyUnresolvedReferences
            return render_template(
                f"recipes/{recipe_key}.html",
                page=deps.page,
            )
        except TemplateNotFound:
            try:
                return _render_md_as_html_template(
                    f"recipes/{recipe_key}.md",
                    page=deps.page,
                )
            except TemplateNotFound:
                raise Exception(f"Failed to find {recipe_key}.html / {recipe_key}.md")

    def _render_md_as_html_template(template, **kwargs):
        md = render_template(template)
        md = frontmatter.loads(md).content
        html = render_template_string(
            '{% extends "_layouts/base.html" %}{% block main %}' + mistune.html(md) + "{% endblock %}",
            **kwargs,
        )
        return html
