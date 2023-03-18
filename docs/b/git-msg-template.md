---
tags:
  - ops
---

# Шаблон коммитов

## Что это?

- Для сообщений в коммите можно использовать шаблоны
- Полезно, чтобы напомнить себе, что нужно указать тикет в сообщении
- Или когда нужно коммитить, придерживаясь структуры

## Как сделать?

- Создать файл `.gitmessage` - в нем описываем шаблон
- Используем `#` для комментариев - они в коммит попадать не будут
- Выставить шаблон в гите:

```
git config commit.template ~/.gitmessage
```

- [Источник](https://gist.github.com/lisawolderiksen/a7b99d94c92c6671181611be1641c733)

## Пример шаблона

```
# Что было сделано
:gitmoji:

# Ссылка на доку
:memo:
# Ссылка на задачу
:ticket:
```
