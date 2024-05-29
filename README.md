# потик.ио v4.2

## Флоу добавления новых страничек

- **Любую новую страничку (даже если она типовая, и обрабатывается шаблонным роутом) нужно заносить в `blog_pages`**
- Наследуемся от `"layouts/base.html"` чтобы отрисовался хедер с хлебными
  крошками + `blog_pages.title`, `blog_pages.desc`:

  ```html
  {% extends "_layouts/base.html" %}
  
  {% block main %}
  <!-- Тут содержимое страницы -->
  {% endblock %}
  ```

- Типовой роут:

```python
@app.route("/beer")
def beer_page():
    return render_template(
        "beer/index.html",
        page=deps.page,
    )

```

## Таблички 🗃️

| Табличка     | Назначение                                                                |
|--------------|---------------------------------------------------------------------------|
| `blog_pages` | Все страницы блога, удобно для хлебных крошек, рендеринга, сайтмапы и пр. |
|              |                                                                           |


## Формочки

### Наследуемся от `flask_wtf.FlaskForm` + объявляем поля

  ```python
  from flask_wtf import FlaskForm
  from wtforms.fields.choices import SelectMultipleField
  from wtforms.fields.numeric import IntegerRangeField, DecimalRangeField
  from wtforms.fields.simple import StringField, BooleanField, URLField, TextAreaField
  from wtforms.validators import InputRequired
  
  
  class AddRestForm(FlaskForm):
    name = StringField("Название", validators=[InputRequired()], render_kw=dict(placeholder="Тхали и Карри"))
    score = DecimalRangeField(
      "Оценка",
      validators=[InputRequired()],
      render_kw={"min": 0, "max": 10, "step": 0.5, "class": "range-primary"},
      default=7.5,
    )
    url = URLField(
      "Ссылка", render_kw={"placeholder": "https://yandex.ru/maps/org/tkhali_i_karri/154048393265"}
    )
    visited = BooleanField("Были?", default=True)
    location = StringField("Место", validators=[InputRequired()], render_kw={"placeholder": "Пушка"})
    price_range = IntegerRangeField(
      "Цены",
      render_kw={"min": 0, "max": 2, "steps": ["Низкие", "Средние", "Высокие"], "class": "range-accent"},
    )
    tags = SelectMultipleField(
      "Теги",
      validators=[InputRequired()],
      choices=RestTag.__members__.values(),
    )
    comment = TextAreaField(
      "Коммент", validators=[InputRequired()], render_kw={"placeholder": "Неплохая индийка"}
    )
  
  ```
  
### Передаем форму в шаблон + тут же обрабатываем сабмит формы

  ```python
  @app.route("/rest/add", methods=["GET", "POST"])
  def rest_add_page():
      form = AddRestForm()

      if form.validate_on_submit():
          form_data = form.data
          form_data["location"] = [form_data["location"]]
          rest = Restaurant(**form_data)
          deps.restaurant_store.insert(rest)
          return flask.redirect("/rest")

      return render_template(
          "rest/add.html",
          page=deps.page,
          form=form,
      )
  ```
  
### Располагаем поля формы в шаблоне

  ```html
  {% extends '_layouts/base.html' %}
  {% from '_components/form.html' import input %}
  
  {% block main %}
      <form method="POST" class="flex flex-col gap-3">
          {{ form.csrf_token }}
  
          {{ input(form.name) }}
          {{ input(form.score) }}
          {{ input(form.url) }}
          {{ input(form.visited) }}
          {{ input(form.location) }}
          {{ input(form.price_range) }}
          {{ input(form.tags) }}
          {{ input(form.comment) }}
  
          <div class="flex justify-end ">
              <button type="submit" class="btn btn-primary">Добавить</button>
          </div>
      </form>
  {% endblock %}
  ```