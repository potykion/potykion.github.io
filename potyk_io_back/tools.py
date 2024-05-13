import enum
import sqlite3

from pydantic import BaseModel, ConfigDict

from potyk_io_back.lazy import SimpleStorage
from potyk_io_back.q import Q


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
    return Tool(
        id=tool_sql["id"],
        title=tool_sql["title"],
        type=tool_sql["type"],
        tags=tuple(tool_sql["tags"].split(",")),
        desc=tool_sql["desc"],
        url=tool_sql["url"],
        img=tool_sql["img"],
        pinned=tool_sql["pinned"] or False,
    )


ToolStore = Q.factory(
    select_all_as=tool_from_sql,
    table="tech_tools",
)
