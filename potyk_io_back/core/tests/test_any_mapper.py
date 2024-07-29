import enum

from pydantic import BaseModel, Field

from potyk_io_back.core.any_mapper import map_from_to, pipe, comma_split


class BlogPageSection(enum.StrEnum):
    fun = enum.auto()
    work = enum.auto()
    food = enum.auto()
    n = enum.auto()


class BlogPage(BaseModel):
    url: str
    html_path: str
    title: str
    desc: str | None = ""
    section: BlogPageSection | None = None
    include_in_index: bool | None = False
    breadcrumbs_title: str | None = ""
    tags: tuple[str, ...] = Field(default_factory=tuple)

    breadcrumbs: list["BlogPage"] = Field(default_factory=list)


def test_map_from_to():
    page = map_from_to(
        {
            "url": "/recipes/burger",
            "html_path": "recipes/burger.html",
            "tags": "beef,sauce",
            "title": "burger",
            "desc": "tasty",
        },
        BlogPage,
        field_funcs={"tags": pipe(comma_split, sorted)},
    )

    assert page == BlogPage(
        url="/recipes/burger",
        html_path="recipes/burger.html",
        title="burger",
        desc="tasty",
        tags=("beef", "sauce"),
    )


def test_map_from_to_no_tags():
    page = map_from_to(
        {
            "url": "/recipes/burger",
            "html_path": "recipes/burger.html",
            "title": "burger",
            "desc": "tasty",
        },
        BlogPage,
        field_funcs={"tags": pipe(comma_split, sorted)},
    )

    assert page == BlogPage(
        url="/recipes/burger",
        html_path="recipes/burger.html",
        title="burger",
        desc="tasty",
        tags=(),
    )
