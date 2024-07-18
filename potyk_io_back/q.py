import inspect
import sqlite3
from contextlib import contextmanager
from typing import Type, Callable, Any

As = Type | Callable[[sqlite3.Row], Any]


class Q:
    """
    q = Q(
      sqlite_conn_or_cursor=...,
      select_all_as=..., # type: cls | func
    )
    BookQ = Q.factory(
      select_all_as=..., # type: cls | func
    )
    q = BookQ(sqlite_cur)

    q.select_all(sql)
    q.select_all(sql, as=...)
    q.select_one(sql)
    q.select_val(sql)

    q.execute(sql)
    q.execute(sql, commit=True)
    q.commit(sql)
    with q.commit_after():
      q.execute(...)
      q.execute(...)

    class BookQ:
      def __init__(sqlite_cur):
        self.q = Q(sqlite_cur, select _all_as=Book)

      def select_wip():
        return self.q.select_all('select * from books where status = "wip"')

    book_q.q.select_all('select * from books')
    book_q.q.select_val('select count(*) from books')
    """

    def __init__(
        self,
        sqlite_conn_or_cursor: sqlite3.Connection | sqlite3.Cursor,
        *,
        select_as: As | None = None,
        table: str | None = None,
    ):
        if isinstance(sqlite_conn_or_cursor, sqlite3.Connection):
            self.sqlite_cur = sqlite_conn_or_cursor.cursor()
        elif isinstance(sqlite_conn_or_cursor, sqlite3.Cursor):
            self.sqlite_cur = sqlite_conn_or_cursor

        self.sqlite_cur.row_factory = sqlite3.Row

        self._select_all_as = select_as
        self._table = table

    @classmethod
    def factory(
        cls,
        select_as: As | None = None,
        table: str | None = None,
    ):
        def new(
            sqlite_conn_or_cursor: sqlite3.Connection | sqlite3.Cursor,
        ):
            return cls(
                sqlite_conn_or_cursor,
                select_as=select_as,
                table=table,
            )

        return new

    def list_all(
        self,
        *,
        table: str | None = None,
        as_: As | None = None,
    ):
        table = table or self._table
        assert table, "{table} param should be set"
        return self.select_all(f"select * from {table}", as_=as_)

    def select_all(self, sql, params=(), *, as_: As | None = None) -> list:
        if not isinstance(params, (list, tuple)):
            params = (params,)

        rows = self.sqlite_cur.execute(sql, params).fetchall()

        rows = self._apply_as(rows, as_)

        return rows

    def select_one(self, sql, params=(), *, as_: As | None = None) -> Any:
        if not isinstance(params, (list, tuple)):
            params = (params,)

        row = self.sqlite_cur.execute(sql, params).fetchone()

        row = self._apply_as(row, as_)

        return row

    def select_val(
        self,
        sql,
        params=(),
    ) -> Any:
        if not isinstance(params, (list, tuple)):
            params = (params,)

        return self.sqlite_cur.execute(sql, params).fetchone()[0]

    def execute(self, sql, params=(), *, commit=False):
        if not isinstance(params, (list, tuple)):
            params = (params,)

        self.sqlite_cur.execute(sql, params)

        if commit:
            self.commit()

    def commit(self):
        self.sqlite_cur.connection.commit()

    @contextmanager
    def commit_after(self):
        yield
        self.commit()

    def _apply_as(self, row_or_rows, as_: As | None = None):
        as_ = as_ or self._select_all_as
        if not as_:
            return row_or_rows

        is_func = inspect.isfunction(as_) or inspect.ismethod(as_)
        is_list = isinstance(row_or_rows, (list, tuple))

        if is_func and is_list:
            return [as_(row) for row in row_or_rows]
        elif is_func and not is_list:
            return as_(row_or_rows)
        elif not is_func and is_list:
            return [as_(**row) for row in row_or_rows]
        else:
            return as_(**row_or_rows)


class QQ:
    def __init__(self, q: Q, table: str | None = None):
        self.q = q
        self._table = table or q._table

    def list_all(self, *, as_: As | None = None):
        return self.q.select_all(f"select * from {self._table}", as_=as_)

    @classmethod
    def factory(cls, cursor_factory: Callable[[sqlite3.Cursor], Q]):
        def new(cursor: sqlite3.Cursor):
            return cls(cursor_factory(cursor))

        return new
