import sqlite3

from potyk_io_back.core import BASE_DIR

db = ...
# db = "potyk-io.db"
# db = "tv_ta.db"
assert db, "No db set!"

sqlite_conn = sqlite3.connect(BASE_DIR / db, check_same_thread=False)
sqlite_cursor = sqlite_conn.cursor()

try:
    sqlite_cursor.execute("VACUUM")
except Exception as e:
    print(f"Failed to VACUUM: {e}")
finally:
    sqlite_cursor.close()
