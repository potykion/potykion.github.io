---
tags:
  - flask
---

# Flask-серв в тестах

Чтобы протестировать html-хендлеры с тестовыми данными, можно рендерить html-странички, сохранять в файл, смотреть че
там

А можно запустить Flask-серв прям во время тестов и **дебажить в интерактивном режиме**:

```python
import threading

import flask
import pytest
import requests


@pytest.fixture()
def flask_server(app):
    @app.route('/shutdown', methods=('POST',))
    def shutdown():
        flask.request.environ.get('werkzeug.server.shutdown')()
        return 'ok'

    yield threading.Thread(target=app.run).start()

    requests.post('http://localhost:5000/shutdown')
```

[Основа](https://stackoverflow.com/a/60597712/5500609)