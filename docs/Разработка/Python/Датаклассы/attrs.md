# attrs

## Как использовать валидаторы?

- Дока: https://www.attrs.org/en/stable/examples.html#validators
- Используем готовые из `attr.validators`
    - Напр. `attr.validators.matches_re` валидирует значение поля по регулярке
- Или пишем свой, определяя функцию с 3 аргументами:

```python
def val_req(_, __, val):
    """attrs-валидатор, проверяющий заполнено ли значение"""
    # Для интов 0 возможен, так что чекаем на None
    if isinstance(val, int):
        return val is not None

    return bool(val)
```

- Передаем в аргументе `validator`:

```python
# Как 1 функцию
phone = attr.ib(type=basestring, validator=val_req)
# Как список функций
phone = attr.ib(type=basestring, validator=[val_req, attr.validators.matches_re(r'\d{8}')])
```

## cattrs

### Что это?

[cattrs](https://github.com/python-attrs/cattrs) - парсилка json в attrs

### Как пользоваться?

- `cattrs.structure` - для десериализации
- `cattrs.unstructure` - для сериализации

### Как парсить `Literal`?

Вот так:

```python
from typing_extensions import Literal

import cattr

ABLiteral = Literal['a', 'b']


def parse_a_b_literal(val, cls):
    assert val in ('a', 'b')
    # Для python 3.8+
    # assert val in typing.get_args(cls)
    return val


literal_converter = cattr.Converter()
literal_converter.register_structure_hook(ABLiteral, parse_a_b_literal)

assert literal_converter.structure('a', ABLiteral) == 'a'

try:
    literal_converter.structure('c', ABLiteral)
except AssertionError:
    print('Никаких c!')
```

- По-сути литералы нам достаточно парсить в литералы - то есть ничего не делать с ними
- Но cattrs не слишком умный и если мы передадим строку, отличную от литерала, он ее проглотит
- Так что в функции-парсере литерала пишем проверочку на принадлежность к литералу