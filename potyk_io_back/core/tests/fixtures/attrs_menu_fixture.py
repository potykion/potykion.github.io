from typing import Tuple

import attr
from typing_extensions import Literal


@attr.s(frozen=True, slots=True)
class IikoTransportGroup(object):
    id = attr.ib(type=str)
    name = attr.ib(type=str)
    is_group_modifier = attr.ib(type=bool)
    parent_group = attr.ib(type=str)
    image_links = attr.ib(type=Tuple[str, ...])
    order = attr.ib(type=int)


@attr.s(frozen=True, slots=True)
class Price(object):
    current_price = attr.ib(type=int)
    is_included_in_menu = attr.ib(type=bool)


@attr.s(frozen=True, slots=True)
class SizePrice(object):
    size_id = attr.ib(type=str)
    price = attr.ib(type=Price)


@attr.s(frozen=True, slots=True)
class IikoGroupModifierChoice(object):
    default_amount = attr.ib(type=int)
    max_amount = attr.ib(type=int)
    required = attr.ib(type=bool)
    min_amount = attr.ib(type=int)
    id = attr.ib(type=str)


@attr.s(frozen=True, slots=True)
class IikoGroupModifier(object):
    id = attr.ib(type=str)
    required = attr.ib(type=bool)
    max_amount = attr.ib(type=int)
    min_amount = attr.ib(type=int)
    child_modifiers = attr.ib(type=Tuple[IikoGroupModifierChoice, ...])
    splittable = attr.ib(type=bool, default=True)
    child_modifiers_have_min_max_restrictions = attr.ib(type=bool, default=False)


@attr.s(frozen=True, slots=True)
class IikoSingleModifier(object):
    id = attr.ib(type=str)
    default_amount = attr.ib(type=int)
    max_amount = attr.ib(type=int)
    required = attr.ib(type=bool)
    min_amount = attr.ib(type=int)


@attr.s(frozen=True, slots=True)
class IikoTransportProduct(object):
    id = attr.ib(type=str)
    name = attr.ib(type=str)
    code = attr.ib(type=str)

    type = attr.ib()  # type: Literal["Dish", "Good", "Modifier"]
    order_item_type = attr.ib()  # type: Literal["Product", "Compound"]
    parent_group = attr.ib(type=str)
    size_prices = attr.ib(type=Tuple[SizePrice, ...])
    group_modifiers = attr.ib(type=Tuple[IikoGroupModifier, ...])
    modifiers = attr.ib(type=Tuple[IikoSingleModifier, ...])
    group_id = attr.ib(type=str)
    description = attr.ib(type=str)
    image_links = attr.ib(type=Tuple[str, ...])

    weight = attr.ib(type=float)

    fat_amount = attr.ib(type=float)
    proteins_amount = attr.ib(type=float)
    carbohydrates_amount = attr.ib(type=float)
    energy_amount = attr.ib(type=float)

    fat_full_amount = attr.ib(type=float)
    proteins_full_amount = attr.ib(type=float)
    carbohydrates_full_amount = attr.ib(type=float)
    energy_full_amount = attr.ib(type=float)

    order = attr.ib(type=int)
    splittable = attr.ib(type=bool, default=True)


@attr.s(frozen=True, slots=True)
class IikoTransportSize(object):
    id = attr.ib(type=str)
    name = attr.ib(type=str)
    priority = attr.ib(type=int)
    is_default = attr.ib(type=bool)


@attr.s(frozen=True, slots=True)
class IikoTransportMenu(object):
    products = attr.ib(type=Tuple[IikoTransportProduct, ...])
    groups = attr.ib(type=Tuple[IikoTransportGroup, ...])
    sizes = attr.ib(type=Tuple[IikoTransportSize, ...])
