---
 tags:
   - py
---

# Строки в python 2

- 2 типа: `str`, `unicode`
- `str` - для английских букв (рус буквы нельзя юзать): `'stroka'`
- `unicode` - для всех букв (рус буквы можно юзать): `u'строка'`
- Лучше везде использовать `unicode`

## Как сделать unicode-строку из str-строки?

```python
assert 'oppa'.decode('utf-8') == u'oppa'
```

## Как сделать str-строку из unicode-строки?

```python
assert u'oppa'.encode('utf-8') == 'oppa'
```

## Когда это может понадобиться?

- Когда нужно использовать `urllib.urlencode`: https://stackoverflow.com/a/6481120/5500609
