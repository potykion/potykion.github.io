import sqlite3

from potyk_io_back.core import BASE_DIR
from potyk_io_back.q import Q


def sqlite_db(db="potyk-io.db"):
    return sqlite3.connect(BASE_DIR / db, check_same_thread=False)


def sql(sqlite_db_=None):
    return Q(sqlite_db_ or sqlite_db())
