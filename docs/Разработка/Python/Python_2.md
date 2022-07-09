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