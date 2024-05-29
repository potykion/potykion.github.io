from operator import attrgetter

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
        "Ингредиенты.md",
        validators=[InputRequired()],
        render_kw={"placeholder": "Неплохая индийка"},
    )
    cooking_md = TextAreaField(
        "Ингредиенты.md",
        validators=[InputRequired()],
        render_kw={"placeholder": "Неплохая индийка"},
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

                with open(
                    BASE_DIR / f"templates/recipes/{form_data['file_slug']}.md",
                    "w",
                    encoding="utf-8",
                ) as f:
                    f.write(
                        f"""## Ингредиенты

{form_data['ingredients_md']}

## Приготовление

{form_data['cooking_md']}"""
                    )

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
