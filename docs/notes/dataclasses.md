---
description: Зачем нужны датаклассы в Python
tags:
  - py
---

# Датаклассы

## Зачем нужно?

- Для удобной работы с данными / классами
- Для сравнения классов по значениям полей, а не по ссылкам
- Для валидации полей классов
- Для сериализации классов в json и другие примитивы
- Для иммутабельности - неизменности полей и хеширования (использование в сетах и словарях)

## Пример

```python
import dataclasses


@dataclasses.dataclass()
class FlatRentAd:
    link: str
    phone: str
    address: str
    metro: str
    price: int
    meters: int
    floor: int
    has_dishwasher: bool
    has_conditioner: bool
```

### Как без датаклассов?

```python
class FlatRentAd:
    def __init__(
        self,
        link: str,
        address: str,
        metro: str,
        price: int,
        meters: int,
        floor: int,
        has_dishwasher: bool,
        has_conditioner: bool,
        phone: str,
    ):
        self.link = link
        self.address = address
        self.metro = metro
        self.price = price
        self.meters = meters
        self.floor = floor
        self.has_dishwasher = has_dishwasher
        self.has_conditioner = has_conditioner
        self.phone = phone
```

- Без датаклассов, мы написали класс, который умеет только сеттить поля, и он уже занимает в 2 раза больше места
- А в датаклассах помимо более компактной записи, мы получаем пачку фич
- Напр. сравнение по значению - доступно из коробки, а для обычного класса нужно реализовать метод `__eq__`:

```python
class FlatRentAd:
    def __init__(
        self,
        link: str,
        address: str,
        metro: str,
        price: int,
        meters: int,
        floor: int,
        has_dishwasher: bool,
        has_conditioner: bool,
        phone: str,
    ):
        self.link = link
        self.address = address
        self.metro = metro
        self.price = price
        self.meters = meters
        self.floor = floor
        self.has_dishwasher = has_dishwasher
        self.has_conditioner = has_conditioner
        self.phone = phone

    def __eq__(self, other):
        return (
            self.link == other.link and
            self.address == other.address and
            self.metro == other.metro and
            self.price == other.price and
            self.meters == other.meters and
            self.floor == other.floor and
            self.has_dishwasher == other.has_dishwasher and
            self.has_conditioner == other.has_conditioner and
            self.phone == other.phone
        )
```

- Метод `__eq__`, помимо того что он занимает много места, нужно обновлять каждый раз при добавлении новых полей
- А у датаклассов фич много, реализовывать каждую из них в обычном классе - смысла мало

## Виды датаклассов

- [dataclasses](https://docs.python.org/3/library/dataclasses.html) - встроено в Python 3.7+
    - [Raymond Hettinger - Dataclasses - PyCon 2018](https://www.youtube.com/watch?v=T-TwcmT6Rcw) - топ видос по теме
- [pydantic](https://pydantic-docs.helpmanual.io/) - улучшенные датаклассы: есть возможность парсить из json, различные
  валидаторы, возможность генерировать swagger и многое другое (требуется Python 3.6+)
- [attrs](https://www.attrs.org/en/stable/) - еще одна альтернатива стандартным датаклассам, есть поддержка старых
  версий Python (Python 2, Python < 3.6)
    - есть парсилка из json - [cattrs](https://cattrs.readthedocs.io/en/latest/)
