# [sqlite + Python](https://github.com/343dev/optimizt)

- В Python уже есть обертка над бд - пакет `sqlite3`

## init

Для совершения любых запросов нужно подключиться к бд и создать курсор:

```python
import sqlite3

sqlite_conn = sqlite3.connect(
    # Путь к бд
    "potyk-io.db",
    # Выставляем если работаем с flask или другими веб-фреймворками, иначе будут ошибки
    check_same_thread=False,  
)
sqlite_cur = sqlite_conn.cursor()
```

## select

```python
rows: list[tuple] = sqlite_cur.execute("select * from beers").fetchall()
```

- `sqlite_cur.execute` для вызыва запросов
- `.fetchall()` - возвращает список тьюплов

### select as Row

- C тьюплами бывает неудобно работать - можно вовращать `sqlite3.Row`
- `sqlite3.Row` - это и словарь и объект с полями из select

```python
sqlite_cur.row_factory = sqlite3.Row
rows: list[sqlite3.Row] = sqlite_cur.execute("select * from beers").fetchall()
```

### select as Pydantic

- Можно тьюпл разъименовывать, или `sqlite3.Row` дестроить:

```python
q = "select id, title, img, untappd_url, wishlist from beers"
rows: list[tuple] = self.sqlite_cur.execute(q).fetchall()

beers = [
    Beer(
        id=id,
        title=title,
        img=img,
        untappd_url=untappd_url,
        wishlist=wishlist or False,
    )
    for id, title, img, untappd_url, wishlist in raw_beers
]

###

sqlite_cur.row_factory = sqlite3.Row
rows: list[sqlite3.Row] = sqlite_cur.execute("select * from beers").fetchall()
beers = [Beer(**row) for row in rows]
```

## insert


```python
sqlite_cur.execute(
    'insert into habit_performings (habit_id, status, "date") values (?, ?, ?);',
    (habit_id, status, date),
)
# ВАЖНО вызывать .commit() иначе в бд ничего не сохранится
sqlite_cur.connection.commit()
```

## Example Repo

```python
import sqlite3


class SimpleStorage:
    def __init__(self, sqlite_cur: sqlite3.Cursor, table: str) -> None:
        self.sqlite_cur = sqlite_cur
        self.table = table

        self.sqlite_cur.row_factory = sqlite3.Row

    def list_all(self, where: str = None, order_by=None) -> list[sqlite3.Row]:
        q = f"select * from {self.table}"
        if where is not None:
            q += f" where {where}"
        if order_by is not None:
            q += f" order by {order_by}"
        rows = self.sqlite_cur.execute(q).fetchall()
        return rows


sqlite_conn = sqlite3.connect("potyk-io.db", check_same_thread=False)
sqlite_cur = sqlite_conn.cursor()
movie_storage = SimpleStorage(sqlite_cur, 'movies')
```