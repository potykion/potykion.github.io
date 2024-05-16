---
title: Flask
desc: Гайд по Фласку в 2к24, в эпоху нейросетей, ае
---

- Flask - один из лучших веб-фреймворков на Python
- Лучший из-за простоты

## Установка

```sh
pip install Flask
```

## Простейший сервер

```python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
```

### Создание `Flask` через функцию

- Удобно для тестов, можно задавать разные конфигурации

```python
from flask import Flask


def create_app():
    app = Flask(__name__)

    @app.route("/")
    def hello_world():
        return "<p>Hello, World!</p>"

    return app

```

## Запуск

### CLI

При условии, что инстанц `Flask` создан в модуле `app.py`:

```sh
flask run
```

Если модуль называется иначе:

```sh
flask --app {app_module} run
```

#### Запуск во внешний мир

- Речь о запуске в локальной wifi-сети или запуск через Docker на сервере

```sh
flask run --host=0.0.0.0
```

### PyCharm

![img.png]({{ url_for('static', filename='images/tech/flask/flask-run.png') }})

#### Flask Debug

- Опция `Flask Debug` в режиме запуска Debug не работает (на момент 2024.04)
- Так что если хотим отдебажить Фласк-аппу, то убираем этот флаг
- Зачем эта опция в целом?: чтобы работал live-reload, т.е. чтобы при изменении файлов, сервер перезапускался; так что
  сейчас при дебаге нужно перезапускать серв, чтобы изменения вступили в силу

## Параметры запроса

### Path-параметры

#### str - по-умолчанию

```python
@app.route("/<name>")
def hello(name: str):
    return f"Hello, {name}!"
```

#### int

```python
@app.get("/todo/<int:task_id>/edit")
def get_todo_form(task_id: int):
    task = task_db.get_by_id(task_id)

    return render_template_string(
        "{% from 'templates/components/todo.html' import todo_edit_task_form %} {{ todo_edit_task_form(task) }}",
        task=task,
    )
```

### Query / Form параметры

- `flask.request.form` - Form-data параметры
- `flask.request.args` - Query-параметры
- `flask.request.values` - Объединение Query и Form-data параметров
- `flask.request.form.to_dict()` - перевод в нормальный словарь, а не `MultiDict`; полезно при логгировании, и
  использовании form-data как словаря

```python
@app.post("/todo/<int:task_id>/edit")
def edit_todo(task_id):
    title = flask.request.form.get(f"title")

    task = task_db.get_by_id(task_id)
    task.title = title
    task_db.update(task)

    return render_template_string(
        "{% from 'templates/components/todo.html' import todo_task %} {{ todo_task(task) }}",
        task=task,
    )
```

- Параметры будут иметь тип str - так что на плечах разраба кастить типы:

```python
@app.post("/todo/<int:task_id>")
def change_todo_done(task_id):
    done = bool(flask.request.form.get(f"done"))

    task = task_db.get_by_id(task_id)
    task.done = done
    task_db.update(task)

    return render_template_string(
        "{% from 'templates/components/todo.html' import todo_task %} {{ todo_task(task) }}",
        task=task,
    )
```

- Можно писать примитивные парсеры, как в примере выше, можно использовать спец-либы, типа Pydantic

### Json

- `flask.request.json` - работает когда есть хедер `Content-Type: application/json`
- `flask.request.get_json(force=True, silent=True)` - работает даже без хедера; опция `silent=True` не райзит ошибку,
  если не удалось распарсить тело запроса как json

### Headers

- `flask.request.headers`

## Ссылки

- https://flask.palletsprojects.com/en/3.0.x/ - дока по Фласку
- https://flask.palletsprojects.com/en/3.0.x/quickstart/ - быстрый старт
- https://flask.palletsprojects.com/en/3.0.x/api/#url-route-registrations - про path-параметры