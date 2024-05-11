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

    q.q(...)
    q.q_all(...)
    q.select_all(sql)
    q.select_all(sql, as=...)
    q.select_one(sql)
    q.select_val(sql)
    q.sel_all(...)
    q.sel_val(...)
    q.val(...)

    q.execute(sql)
    q.execute(sql, commit=True)
    q.commit(sql)
    with q.commit_after():
      q.exec(...)
      q.exec(...)
    ---

    class BookQ:
      def __init__(sqlite_cur):
        self.q = Q(sqlite_cur, select _all_as=Book)

      def select_wip():
        return self.q.select_all('select * from books where status = "wip"')

    book_q.q.select_all('select * from books')
    book_q.q.val('select count(*) from books')

    """

    def __init__(
        self,
        sqlite_conn_or_cursor: sqlite3.Connection | sqlite3.Cursor,
        *,
        select_all_as: As | None = None,
        select_one_as: As | None = None,
    ):
        if isinstance(sqlite_conn_or_cursor, sqlite3.Connection):
            self.sqlite_cur = sqlite_conn_or_cursor.cursor()
        elif isinstance(sqlite_conn_or_cursor, sqlite3.Cursor):
            self.sqlite_cur = sqlite_conn_or_cursor

        self.sqlite_cur.row_factory = sqlite3.Row

        self._select_all_as = select_all_as
        self._select_one_as = select_one_as

    @classmethod
    def factory(
        cls,
        select_all_as: As | None = None,
        select_one_as: As | None = None,
    ):
        def new(
            sqlite_conn_or_cursor: sqlite3.Connection | sqlite3.Cursor,
        ):
            return cls(
                sqlite_conn_or_cursor,
                select_all_as=select_all_as,
                select_one_as=select_one_as,
            )

        return new

    def select_all(self, sql, params=(), as_: As | None = None) -> list:
        rows = self.sqlite_cur.execute(sql, params).fetchall()
        rows = self._apply_as(rows, as_)
        return rows

    def select_one(self, sql, params=(), as_: As | None = None) -> Any:
        row = self.sqlite_cur.execute(sql, params).fetchone()
        row = self._apply_as(row, as_)
        return row

    one = select_one

    def select_val(self, sql, params=()) -> Any:
        return self.sqlite_cur.execute(sql, params).fetchone()[0]

    val = select_val

    def execute(self, sql, params=(), commit=False):
        self.sqlite_cur.execute(sql, params)

        if commit:
            self.commit()

    exec = execute

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

        is_func = inspect.isfunction(as_)
        is_list = isinstance(row_or_rows, (list, tuple))

        if is_func and is_list:
            return [as_(row) for row in row_or_rows]
        elif is_func and not is_list:
            return as_(row_or_rows)
        elif not is_func and is_list:
            return [as_(**row) for row in row_or_rows]
        else:
            return as_(**row_or_rows)
