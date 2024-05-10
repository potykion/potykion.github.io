import sqlite3
from typing import Type, Any, Callable

from pydantic import BaseModel


class SimpleStorage:
    def __init__(
        self,
        sqlite_cur: sqlite3.Cursor,
        table: str,
        model: Type[BaseModel] | None = None,
        model_factory: Callable[[sqlite3.Row], Any] | None = None,
    ) -> None:
        self.sqlite_cur = sqlite_cur
        self.table = table
        self.model = model
        self.model_factory = model_factory
        self.sqlite_cur.row_factory = sqlite3.Row

    def fetch_all(self, q, params=None):
        return self.sqlite_cur.execute(q, params).fetchall()

    def fetch_one(self, q, params=None):
        return self.sqlite_cur.execute(q, params).fetchone()

    def scalar(self, q, params=None):
        return self.fetch_one(q, params)[0]

    def list_all(
        self,
        *,
        where: str = None,
        # where="date = ?", where_params=(date,)
        where_params: list | tuple = (),
        order_by=None,
    ) -> list:
        if not where_params:
            where_params = ()
        if not isinstance(where_params, (tuple, list)):
            where_params = (where_params,)

        q = f"select * from {self.table}"
        if where is not None:
            q += f" where {where}"
        if order_by is not None:
            q += f" order by {order_by}"

        rows = self.sqlite_cur.execute(q, where_params).fetchall()

        if self.model:
            return [self.model(**row) for row in rows]
        if self.model_factory:
            return [self.model_factory(row) for row in rows]

        return rows

    def get_by_id(self, id: int) -> sqlite3.Row:
        return self.list_all(where=f"id= {id}")[0]

    def first_where(self, **kwargs):
        params = list(kwargs.items())

        where = " and ".join((f"{key}=?" for key, val in params))
        try:
            return self.list_all(
                where=where,
                where_params=[val for _, val in params],
            )[0]
        except IndexError:
            raise LookupError(f"Failed to find row with {kwargs}")
