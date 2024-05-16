# [sqlite](https://www.sqlite.org/index.html)

## Преимущества

- Один файл / in-memory
- Ничего ставить не нужно
- В Python уже есть обертка над бд - пакет `sqlite3`
- Есть scalable-hosted-вариант - [Turso](https://turso.tech/)

## Типы

- Всего несколько типов
  - `INTEGER`
  - `TEXT`
  - `REAL`
  - `BLOB`

### Как делать Boolean?

- Делаем `INTEGER` со значениями 0 / 1

### Как делать Datetime?

- Делаем `TEXT` со значениями `YYYY-MM-DD HH:MM:SS`
- Как фильтровать по дате? Использовать функцию `datetime`:  `where datetime(watched_dt) >= datetime('2024-01-01')`

### Как делать JSON?

- Аналогично datetime - `text` + [json-функции](https://www.sqlite.org/json1.html)

### Материалы по теме

- https://www.sqlite.org/quirks.html
- https://www.sqlite.org/datatype3.html
- https://www.sqlite.org/lang_datefunc.html
