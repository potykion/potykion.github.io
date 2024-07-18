import enum
from typing import Mapping, Self, Callable

from pydantic import BaseModel, ConfigDict

from potyk_io_back.core.q import Q, QQ, SqliteConnOrCursor


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

    @classmethod
    def from_sql(cls, tool_sql: Mapping) -> Self:
        tool_sql = {**tool_sql}
        tool_sql["tags"] = tuple(tool_sql["tags"].split(","))
        tool_sql["pinned"] = tool_sql["pinned"] or False
        return cls(**tool_sql)


ToolQQ: Callable[[SqliteConnOrCursor], QQ[Tool]] = QQ.factory(
    table="tech_tools",
    cursor_factory=Q.factory(select_as=Tool.from_sql),
)
