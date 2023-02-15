---
tags:
  - flask
hide:
  - toc
---

# Как получить данные запроса во Flask?

[Топ ответ на стеке](https://stackoverflow.com/a/16664376/5500609):

- `flask.request.get_json(silent=True, force=True)` - получить json даже если `ContentType` не указан
- `flask.request.args` - query-параметры
- `flask.request.form` - form-data
- `flask.request.values = flask.request.args + flask.request.form`
- `request.files` - файлы

