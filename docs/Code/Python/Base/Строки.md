---
description: Как работать со строками в Python
---

# Строки

## Что это?

- последовательность символов: букв, цифр, знаков
- тип `str`

## Как создать строку?

```python
a: str = 'privet'
b: str = "zdarov"
```

## Как форматировать строки?

Куча разных способов:

|                     | `%`                                    | `{}`                                    |
|---------------------|----------------------------------------|-----------------------------------------|
| Простая подстановка | `'Name = %s' % 'Nikita'`               | `'Name = {}'.format('Nikita')`          |
| По индексу          |                                        | `'Name = {0}'.format('Nikita')`         |
| По параметру        | `'Name = %(name)s' % {'name': 'Nikita'}` | `'Name = {name}'.format(name='Nikita')` |

### f-строки

- Доступно с python 3.6

```python
name = 'Nikita'
f'Name = {name}'
```

## Как форматировать числа?

 ```python 
 a = 13.946 
 assert "{:.2f}".format(a) == '13.95' 
 assert format(a, '.2f') == '13.95' 
 assert f"{a:.2f}" == '13.95'  # py3.6+ 
 ```

## Как в python 2?

- 2 типа: `str`, `unicode`
- `str` - для английских букв (рус буквы нельзя юзать): `'stroka'`
- `unicode` - для всех букв (рус буквы можно юзать): `u'строка'`
- Лучше везде использовать `unicode`

### Как сделать unicode-строку из str-строки?

```python
assert 'oppa'.decode('utf-8') == u'oppa'
```

### Как сделать str-строку из unicode-строки?

```python
assert u'oppa'.encode('utf-8') == 'oppa'
```

### Когда это может понадобиться?

- Когда нужно использовать `urllib.urlencode`: https://stackoverflow.com/a/6481120/5500609
