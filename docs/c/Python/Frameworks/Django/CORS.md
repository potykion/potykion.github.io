# CORS

- Ставим [django-cors-headers](https://pypi.org/project/django-cors-headers/)
- Сетапим настройки:

```python
# Не заморачиваемся
CORS_ALLOW_ALL_ORIGINS = True
# Если фронт юзает кастомные хедеры, то указываем их здесь
# https://stackoverflow.com/a/49286437/5500609
CORS_EXPOSE_HEADERS = ['Content-Disposition']
```