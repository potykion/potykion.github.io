from operator import attrgetter
from typing import TypedDict

import flask
import frontmatter
import mistune
from flask import render_template, render_template_string
from flask_wtf import FlaskForm
from jinja2 import TemplateNotFound
from wtforms.fields.choices import SelectField
from wtforms.fields.simple import StringField, TextAreaField
from wtforms.validators import InputRequired

from potyk_io_back.core import BASE_DIR
from potyk_io_back.iter_utils import groupby_dict
from potyk_io_back.pages import BlogPage, BlogPageSection


class FieldKwargs(TypedDict):
    placeholder: str


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
        choices=BlogPageSection.recipe_section_tuples(),
    )

    ingredients_md = TextAreaField(
        "Ингредиенты (.md)",
        validators=[InputRequired()],
        render_kw=dict(placeholder="- Яйца\n- Лук"),
    )

    cooking_youtube = StringField(
        "Ссылка на YouTube (будет добавлена в начало блока Приготовление)",
        render_kw=FieldKwargs(placeholder="https://youtu.be/3QEvEZh8jpc?si=XYOnG_UFmfYoyb0h"),
    )
    cooking_link = StringField(
        "Ссылка на текстовый рецепт (будет добавлена в начало блока Приготовление)",
        render_kw=FieldKwargs(placeholder="https://vk.com/wall-39128795_34992"),
    )
    cooking_md = TextAreaField(
        "Приготовление (.md)",
        validators=[InputRequired()],
        render_kw={"placeholder": "- Яйца отварить\n-Лук обжарить"},
    )


def make_recipe_md_text(form_data) -> str:
    def youtube_to_md(youtube_url):
        return "{{ " + f'"{youtube_url}" | youtube_embed' + " }}"

    def link_to_md(url):
        return f"[{url}]({url})"

    return "\n\n".join(
        filter(
            None,
            [
                "## Ингредиенты",
                form_data["ingredients_md"],
                "## Приготовление",
                youtube_to_md(form_data["cooking_youtube"]) if form_data["cooking_youtube"] else None,
                link_to_md(form_data["cooking_link"]) if form_data["cooking_link"] else None,
                form_data["cooking_md"],
            ],
        )
    )


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

                return f"""
                Результат: <a class='btn btn-link btn-sm' href="{page.url}">{page.title}</a>
                
                <div class="toast animate-fadeOut">
  <div class="alert alert-success">
    <span>Записал!</span>
  </div>
</div>"""
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
