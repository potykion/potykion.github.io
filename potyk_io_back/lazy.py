import sqlite3


class SimpleStorage:
    def __init__(self, sqlite_cur: sqlite3.Cursor, table: str) -> None:
        self.sqlite_cur = sqlite_cur
        self.table = table

        self.sqlite_cur.row_factory = sqlite3.Row

    def list_all(self, filter: str = None) -> list:
        q = f"select * from {self.table}"
        if filter is not None:
            q += f" where {filter}"
        rows = self.sqlite_cur.execute(q).fetchall()
        return rows
