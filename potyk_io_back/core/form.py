from typing import TypedDict, Any


class FieldRenderKw(TypedDict, total=False):
    placeholder: str | Any
    min: int
    max: int
    step: int
    steps: list[str]
    # class: str
