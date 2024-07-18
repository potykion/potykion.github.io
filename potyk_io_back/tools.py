import enum
import sqlite3

from pydantic import BaseModel, ConfigDict

from potyk_io_back.q import Q, QQ


class ToolTag(enum.StrEnum):
    image_proc = "image-proc"
    ai = "ai"


class ToolType(enum.StrEnum):
    python = "python-lib"


class Tool(BaseModel):
    model_config = ConfigDict(frozen=True)

    id: int
    title: str
    type: str | ToolType
    tags: tuple[str | ToolTag, ...]
    desc: str
    url: str
    img: str | None
    pinned: bool


def tool_from_sql(tool_sql: sqlite3.Row) -> Tool:
    tool_sql = {**tool_sql}
    tool_sql["tags"] = tuple(tool_sql["tags"].split(","))
    tool_sql["pinned"] = tool_sql["pinned"] or False
    return Tool(**tool_sql)


ToolStore = QQ.factory(
    Q.factory(
        select_as=tool_from_sql,
        table="tech_tools",
    )
)
