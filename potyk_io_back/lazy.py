import sqlite3
from typing import Type

from pydantic import BaseModel


class SimpleStorage:
    def __init__(
        self,
        sqlite_cur: sqlite3.Cursor,
        table: str,
        model: Type[BaseModel] | None = None,
    ) -> None:
        self.sqlite_cur = sqlite_cur
        self.table = table
        self.model = model
        self.sqlite_cur.row_factory = sqlite3.Row

    def list_all(
        self,
        *,
        where: str = None,
        where_params: list | tuple = (),
        order_by=None,
    ) -> list:
        q = f"select * from {self.table}"
        if where is not None:
            q += f" where {where}"
        if order_by is not None:
            q += f" order by {order_by}"
        rows = self.sqlite_cur.execute(q, where_params).fetchall()
        if self.model:
            return [self.model(**row) for row in rows]
        return rows

    def get_by_id(self, id: int) -> sqlite3.Row:
        return self.list_all(where=f"id= {id}")[0]
