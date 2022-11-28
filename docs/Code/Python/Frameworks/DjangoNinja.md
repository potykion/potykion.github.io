# Django Ninja

## Что это?

- https://django-ninja.rest-framework.com/
- Надстройка над Django позволяющая юзать pydantic, аналогично FastAPI
- Аналогично FastAPI автоматически генерит Swagger-доку по пути `/api/docs`
- Важно: все что работает для Django, должно работать и для Django Ninja, напр. [CORS](./Django/CORS.md)

## Как использовать енамы?

- Для int-enum использовать `enum.IntEnum`
- Для str-enum использовать `(str, enum.Enum)`
