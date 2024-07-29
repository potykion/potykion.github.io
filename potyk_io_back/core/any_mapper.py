from functools import partial
from typing import Any, Callable, TypeVar

try:
    from pydantic import BaseModel
    from pydantic_core import PydanticUndefined
except ImportError:
    ...

ToCls = TypeVar("ToCls")


def map_from_to(
    from_: Any,
    to: type[ToCls],
    field_funcs: None | dict[str, Callable[[Any], Any]] = None,
) -> ToCls:
    field_funcs = field_funcs or {}

    from_supports_mapping = hasattr(from_, "__getitem__")
    from_kwargs: dict[str, Any]
    if from_supports_mapping:
        from_kwargs = from_

    to_is_pydantic = issubclass(to, BaseModel)
    if to_is_pydantic:
        to_kwargs = {}

        for field_key, field_value in to.model_fields.items():
            try:
                to_kwargs[field_key] = from_kwargs[field_key]
            except (KeyError, IndexError):
                to_kwargs[field_key] = None

            # from_kwargs[field_key] is None => set default from {to}
            if to_kwargs[field_key] is None:
                if field_value.default is not PydanticUndefined:
                    to_kwargs[field_key] = field_value.default
                elif field_value.default_factory is not None:
                    to_kwargs[field_key] = field_value.default_factory()
            # from_kwargs[field_key] is not None => apply {fields} func
            else:
                if field_key in field_funcs:
                    to_kwargs[field_key] = field_funcs[field_key](to_kwargs[field_key])

        return to(**to_kwargs)


def pipe(*funcs):
    """
    >>> pipe(str.upper, int)('1')
    1
    """

    def _pipe(x):
        for func in funcs:
            x = func(x)
        return x

    return _pipe


def str_split(str_: str, sep: str | None = None):
    return str_.split(sep)


comma_split = partial(str_split, sep=",")
