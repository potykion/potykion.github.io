---
tags:
  - flask
---

# Чем мне нравится Flask

## Глобальные штуки

- В любом месте кода можно получить доступ к запросу - `flask.request`
- Это значит не надо заниматься пробрасыванием запроса через кучу слоев абстракции

Помимо переменных, есть полезные функции:

- `flask.render_template` - рендер jinja в любом месте
- `flask.abort` - прекращение работы кода, с отправкой кода 400

## Отсутствие объекта response

Че хочешь отдать, то и отдавай:

- Хочешь отдать json - юзай `return flask.jsonify`
- Хочешь отдать html - просто отдай строку, или `flask.render_template`
- Хочешь отдать статус, отличный от 200 - просто возвращай тьюпл с кодом:

  `return flask.jsonify({'msg': 'err'}), 400`

## Простой i18n

Сетапим либу

```
from flask import Flask
from flask_babel import Babel

app_ = Flask(__name__)

babel = Babel(app_, default_locale='ru')
babel.localeselector(locale_selector)
app_.config['BABEL_TRANSLATION_DIRECTORIES'] = 'i18n/locales'
```

**Всё!** - юзаем `flask_babel._` для переводов 