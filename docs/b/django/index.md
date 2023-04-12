---
 tags:
   - py
---

# Django

[Django](https://www.djangoproject.com) - питонячий веб-фреймворк

## Плюсы

- ORM
- Батарейки
- Батарейки такие, что можно менять фреймворк, напр. Django-Ninja, которая превращает Django в FastAPI

## Минусы

- Старенький (, но не бесполезный)
    - Тренды последних лет: тайпинги, асинхронность - с этим проблемы в Django
- Много магии
    - Напр. фильтры - конечно удобно написать пару строк и фильтр готов, но рефакторинг со строками не работает
    - Так, если переименовать поле в модели, то нужно руками чекать формы/сериализаторы/фильтры

## Команды

- Все делается через `manage.py`

### Миграции

```shell
# Создание миграции
python manage.py makemigrations
# Создание пустой миграции
python manage.py makemigrations {app} --empty
# Применение миграции
python manage.py migrate
```

## CORS

- Ставим [django-cors-headers](https://pypi.org/project/django-cors-headers/)
- Сетапим настройки:

```python
# Не заморачиваемся
CORS_ALLOW_ALL_ORIGINS = True
# Если фронт юзает кастомные хедеры, то указываем их здесь
# https://stackoverflow.com/a/49286437/5500609
CORS_EXPOSE_HEADERS = ['Content-Disposition']
```