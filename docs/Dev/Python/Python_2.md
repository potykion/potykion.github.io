# Python 2

## Unicode

### Как сделать unicode-строку из str-строки?

```python
assert 'oppa'.decode('utf-8') == u'oppa'
```

### Как сделать str-строку из unicode-строки?

```python
assert u'oppa'.encode('utf-8') == 'oppa'
```

### Когда это может понадобиться?

- `urllib.urlencode`: https://stackoverflow.com/a/6481120/5500609

## Как форматировать строки?

### %

Дока: https://docs.python.org/2.7/library/stdtypes.html#string-formatting

#### Словарь

```python
assert '%(language)s has %(number)03d quote types.' % {"language": "Python", "number": 2} ==
'Python has 002 quote types.'
```