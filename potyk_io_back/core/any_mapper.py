import inspect
import typing
from functools import partial
from typing import Any, Callable, TypeVar, Tuple

try:
    import attr
except ImportError:  # pragma: no cover
    ...

try:
    from pydantic import BaseModel
    from pydantic_core import PydanticUndefined
except ImportError:
    ...

ToCls = TypeVar("ToCls")


def parse_pydantic(to, from_field_key_func, from_field_getter, to_field_val_funcs):
    to_kwargs = {}

    for field_key, field_value in to.model_fields.items():
        try:
            to_kwargs[field_key] = from_field_getter(field_key)
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
            if field_key in to_field_val_funcs:
                to_kwargs[field_key] = to_field_val_funcs[field_key](to_kwargs[field_key])

    return to(**to_kwargs)


def parse_attrs(to, from_field_key_func, from_field_getter, to_field_val_funcs):
    to_kwargs = {}
    for field_key, field_value in attr.fields_dict(to).items():
        if is_basic_type(field_value.type):
            to_kwargs[field_key] = field_value.type(from_field_getter(field_key))
        elif is_sequence_type(field_value.type):
            to_kwargs[field_key] = init_seq(
                field_value.type,
                (
                    map_from_to(
                        item,
                        field_value.type.__args__[0],
                        from_field_key_func,
                        to_field_val_funcs,
                    )
                    for item in from_field_getter(field_key)
                ),
            )
        elif is_class_type(field_value.type):
            to_kwargs[field_key] = map_from_to(
                from_field_getter(field_key),
                field_value.type,
                from_field_key_func,
                to_field_val_funcs,
            )
        elif field_value.type is None:
            to_kwargs[field_key] = from_field_getter(field_key)

    return to(**to_kwargs)


extensions = {
    lambda to: issubclass(to, BaseModel): parse_pydantic,
    attr.has: parse_attrs,
}


def map_from_to(
    from_: Any,
    to: type[ToCls],
    from_field_key_func: Callable[[Any], Any] | None = None,
    to_field_val_funcs: None | dict[str, Callable[[Any], Any]] = None,
) -> ToCls:
    to_field_val_funcs = to_field_val_funcs or {}

    from_field_getter: Callable[[str], Any]
    if is_dict(from_):
        from_field_getter = lambda key: from_[key]
    elif is_class_type(type(from_)):
        from_field_getter = lambda key: getattr(from_, key)

    if from_field_key_func is not None:
        from_field_getter = pipe(from_field_key_func, from_field_getter)

    parse_func = next((parser for checker, parser in extensions.items() if checker(to)), None)
    if parse_func is not None:
        return parse_func(to, from_field_key_func, from_field_getter, to_field_val_funcs)


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


def camel_to_snake(camel_str: str):
    """
    >>> camel_to_snake("camelCase")
    'camel_case'
    """

    def _gen():
        for i, c in enumerate(camel_str):
            if i and c.isupper():
                yield "_"
            yield c.lower()

    return "".join(_gen())


def snake_to_camel(snake_str: str):
    """
    >>> snake_to_camel('snake_case')
    'snakeCase'
    """

    return "".join(p.title() if index else p for index, p in enumerate(snake_str.split("_")))


def is_basic_type(type_):
    return type_ in (int, float, str, bool)


def init_seq(type_, seq):
    """
    >>> init_seq(Tuple[int, str], [1, "2"])
    (1, '2')
    """
    try:
        return type_(seq)
    except TypeError:
        return typing.get_origin(type_)(seq)


def is_sequence_type(type_):
    """
    >>> is_sequence_type(list)
    True
    >>> is_sequence_type(tuple)
    True
    >>> is_sequence_type(Tuple)
    True
    >>> is_sequence_type([])
    True
    """
    return type_ in (list, tuple) or typing.get_origin(type_) in (list, tuple)


def is_class_type(type_):
    """
    >>> class A: pass
    >>> is_class_type(A)
    True
    >>> is_class_type(A())
    True
    """
    return inspect.isclass(type_)


def is_dict(type_):
    """
    >>> is_dict({})
    True
    >>> is_dict(dict)
    True
    """
    return hasattr(type_, "__getitem__")
