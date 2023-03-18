---
tags:
  - django
---


# Django Ninja

## Что это?

- https://django-ninja.rest-framework.com/
- Надстройка над Django позволяющая юзать pydantic, аналогично FastAPI

## Чем хорош?

- Аналогично FastAPI: автоматически генерит Swagger-доку по пути `/api/docs`
- Аналогично FastAPI: Хорошие валидационные ошибки: `body.ctx.services.0.order_fee.0.__root__` - максимально подробный
  путь, где возникла ошибка
- Все что работает для Django, должно работать и для Django Ninja, напр. [CORS](DjangoORS.md)

## Как использовать енамы?

- Для int-enum использовать `enum.IntEnum`
- Для str-enum использовать `(str, enum.Enum)`
