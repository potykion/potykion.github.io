---
tags:
  - django
---


# Тестирование

## Как переопределить настройки?

```python
from django.test import TestCase


class AnyTestCase(TestCase):
    def test_call(self):
        with self.settings(USE_TELEGRAM_BOT=True):
            ...
```

[Источник](https://docs.djangoproject.com/en/4.0/topics/testing/tools/#overriding-settings)

## Как сгенерировать DRF-Request?

_`rest_framework.test.APIRequestFactory` возвращает джанговский `WSGIRequest`, а хочется DRF-Request_

```python
from rest_framework.parsers import JSONParser
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

req_f = APIRequestFactory()
url: str
params: dict
raw_req = req_f.post(url, params, format='json')
req = Request(raw_req, parsers=[JSONParser()])

assert hasattr(req, 'data')
```

[Источник](https://github.com/encode/django-rest-framework/issues/3608)

## Работа со временем

### Как получить текущее время с таймзоной?

```python
from django.utils import timezone

timezone.now()
```

### Как сделать дейттайм с таймзоной?

```python
from django.utils import timezone

timezone.make_aware(dt.datetime(2022, 6, 5, 23, 59, 59, 999000))
```

### Как парсить время?

```python
from rest_framework.fields import DateTimeField

assert (
    DateTimeField().run_validation('2022-06-05T23:59:59.999') ==
    timezone.make_aware(dt.datetime(2022, 6, 5, 23, 59, 59, 999000))
)
```

### Как сериализовать время?

```python
from rest_framework.fields import DateTimeField

assert (
    DateTimeField().to_representation(dt.datetime(2022, 6, 5, 23, 59, 59, 999000)) ==
    '2022-06-05T23:59:59.999'
)
```

## pytest

[pytest-django](https://pytest-django.readthedocs.io/en/latest/) - pytest-плагин для Джанго

### Конфиг

```ini
[pytest]
;Тестоывые настройки
DJANGO_SETTINGS_MODULE = root.test_settings
;Переиспользование бд, аналогично флагу keep-db
addopts = --reuse-db
```