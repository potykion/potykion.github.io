---
title: Все в одном месте
created: 2024-02-21 20:50
tags:
  - tech
---

Раз я тут пищу, дампну еще мыслей. Каждую версию блога я делаю с использованием новых технологий или подходов, и в этот
раз осенило: а зачем мне всякие Вьюхи, Наксты, если у меня просто Маркдаун?! Я же могу просто рендерить маркдаун в хтмл
и все (чем mkdocs и занимается лол)! И мне достаточно по-сути Фласка и либы для рендеринга маркдауна, и все. Ведь в
блоге статика в основном, динамика практически не нужна. Для динамики надо прям
выдумывать <s>блядь меня опять ебнул босс в начале волны</s> юзкейсы: комменты сделать (но можно просто сторонний сервис
прикрутить), почтовые уведомления (тоже можно сторонний сервис прикрутить), как сказал, внезапно, Bes (тот что из днб
дуэта Gydra): "Современный
кодинг - это склеивание разных сервисов воедино"

Так вот, о чем это я? Я о том, что появилась фантазия все свои штуки, типа там книги рецептов, сюда перенести. Ведь
опять же, какая там динамика в кулинарной книге? Ну сделать формочку для создания рецептов - но это можно делать и
поднимая Sqlite на локалке, и не надо никакие Postgres кластеры поднимать и оплачивать, и виртуалки никакие не надо, и
безопасность из коробки: не надо никакую авторизацию делать, пермишены - у тебя в итоге пачка статичных хтмлок
сгенерится и все, никак там с базой не пошабишь.

Крч пацаны всем рекоммендую, если хотите делать свои приложения, то просто статики достаточно!