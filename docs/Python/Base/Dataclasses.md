# Датаклассы

## Зач нужно?

- Для удобной работы с данными / классами
- Для декларативного (красивого) описания классов
- Для сравнения классов по значениям полей, а не по ссылкам
- Для валидации полей классов
- Для (де)сериализации классов в json и другие примитивы
- Для иммутабельности - неизменности полей и хеширования (использование в сетах и словарях)

## Виды

- [dataclasses](https://docs.python.org/3/library/dataclasses.html) - встроено в Python 3.7+
- [pydantic](https://pydantic-docs.helpmanual.io/) - для парса из примитивов (Python 3.6+)
- [attrs](https://www.attrs.org/en/stable/) - для старых версий python (Python 2, Python < 3.6) +
  есть парсилка - [cattrs](https://cattrs.readthedocs.io/en/latest/)

## dataclasses

- https://www.youtube.com/watch?v=T-TwcmT6Rcw - топ видос по теме

