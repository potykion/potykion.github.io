import datetime
import os
from pathlib import Path

from pydantic import BaseModel, Field


class Page: ...


class Section(BaseModel):
    key: str
    subsections: list["Section"] = Field(default_factory=list)
    pages: list[Page] = Field(default_factory=list)

    # def __getattr__(self, item):
    #     for section in self.subsections:
    #         if section.key ==


def read_content(content_path) -> Section:
    # todo ignore templates & todo dirs
    # todo read categories: notes, special
    # todo read special: 1 dimentional nameless section
    # todo read notes: index + sections with notes
    # todo return content-tree
    return Section(
        # dir name
        key="content",
        subsections=[
            Section(
                key="notes",
                subsections=[
                    Section(
                        key="1-again",
                        pages=[
                            Page(
                                key="15-01",
                                ext="md",
                                abs_path=r"C:\Users\GANSOR\PycharmProjects\potykion.github.io\content\notes\1-again\15-01.md",
                                relative_path="notes/1-again/15-01.md",
                                title="Что в твоей тарелке 15.01",
                                # smart_truncate(html)
                                desc="Есть идея поделать мини-заметки, пока мысли в голове есть, так что го",
                                created=datetime.datetime(2024, 1, 15, 10, 8),
                            ),
                            # other pages
                            ...,
                        ],
                    ),
                    #
                    ...,
                ],
            ),
            Section(
                key="special",
                pages=[
                    Page(
                        key="beer",
                        ext="md",
                    ),
                    Page(
                        key="stats",
                        ext="html",
                    ),
                ],
            ),
        ],
    )


if __name__ == "__main__":
    content_path = Path("..").resolve() / "content"
    read_content(content_path)
