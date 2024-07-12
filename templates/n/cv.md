{% extends "_layouts/blank.html" %}


{% block title %}

<div class="my-2 flex justify-between">

<div>

# Лейбович Никита

<div class="flex gap-2 my-4">
<a class="btn btn-sm btn-primary" href="mailto:potykion@gmail.com">Почта</a> 
<a class="btn btn-sm btn-primary" href="https://t.me/potykion">Telegram</a> 
<a class="btn btn-sm btn-primary" href="https://github.com/potykion">Github</a> 
</div>


## Python Backend Developer

- **Желаемая зарплата:** 400 000 ₽
- **Навыки:** Django • Flask • pytest • mypy • Google Cloud • BitBucket Pipelines
- **Open Source:** [pydantic#444](https://github.com/pydantic/pydantic/pull/444) • [yc-sls-container-deploy#427](https://github.com/yc-actions/yc-sls-container-deploy/pull/427) • [typeshed#2278](https://github.com/python/typeshed/pull/2278)
- **Мои проекты:** [potyk.io](https://potyk.io/) • [jinja2xlsx](https://github.com/potykion/jinja2xlsx) • [repka](https://github.com/potykion/repka)
</div>

<div>

<img src="/static/images/me.jpeg" class="w-32 ">

</div>

</div>

{% endblock %}


{% block main %}

## Опыт работы

### [RuBeacon](https://rbcn.mobi/) • 2016 — 2024

- Сервер для мобильных приложений по доставке еды **[Google App Engine, webapp2, Flask]**
- Перевод 100000 строк кода с Python 2 на Python 3 **[six, Flask]**
- CI для проверки качества кода и деплоя **[Bitbucket Pipelines, pytest, mypy, ruff]** 
- Оптимизация трат в облаке **[Google Cloud Monitoring, Google Cloud Logging, BigQuery]**
- Система электронного документооборота **[Django, pydantic, openpyxl, pdfKit, docxtpl]**
- Интеграции с системами доставки: Iiko, FrontPad, Mobidel **[requests, xmltodict, lxml]**
- Telegram бот для уведомлений о заказах **[python-telegram-bot]**
- Система синхронизации данных из Google DataStore в BigQuery **[Google ndb, BigQuery]**

### [WebAspect](https://web-aspect.ru/) • 2021 — 2023

- Интеграции с медицинскими системами ЕРИС ЕМИАС **[requests, lxml]**
- Поддержка нескольких бд, оптимизация и кеширование запросов **[Django, Redis, pandas]**
- Межсерверное взаимодействие между медицинскими организациями **[Django, requests]**

### [McDonald's](https://mcdonalds.ru/) • 2017 — 2019

- Админка и API для мобильного приложения McDonald's **[Django, Gentelella]**
- API для акции "Монополия" **[Django Rest Framework, Celery, requests]**
- Плагин для кассы для сканирования QR-кодов **[wxPython, PyInstaller]**

{% endblock %}
