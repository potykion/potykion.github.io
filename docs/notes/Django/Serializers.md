---
tags:
  - django
---

# Сериализаторы

## Как посмотреть поля сериализатора?

```python
ser = AnySerializer()
ser.fields()
```

## Как модифицировать тело запроса перед запуском валидации?

Написать кастомный Parser:

```python
from django.core.handlers.wsgi import WSGIRequest
from rest_framework.parsers import JSONParser


class AnyParser(JSONParser):
    def parse(self, stream: WSGIRequest, media_type=None, parser_context=None):
        data: dict = super().parse(stream, media_type, parser_context)
        return {
            **data,
            # Для примера добавим в Request.data еще и user.pk из request.user
            'user': stream.user.pk,
        }


...

from rest_framework.viewsets import ModelViewSet


class AnyViewSet(
    ModelViewSet,
):
    serializer_class = ...
    parser_classes = (AnyParser,)
    queryset = ...
```

Теперь при валидации в `request.data` будет лежать `user`