---
 tags:
   - py
---

# Работа с файлами в Python

## Как открыть файл на чтение и запись?

```python
with open('path_to_file', 'r+', encoding='utf-8') as f:
    ...
```

А вообще вот хороший ответ со стека: https://stackoverflow.com/a/58925279/5500609

## Как вычислять хеш файла?

```python
import hashlib

md5 = hashlib.md5()

with open(path, 'rb') as f:
    data = f.read()
    md5.update(data)

print("MD5: {0}".format(md5.hexdigest()))
```

[Источник](https://stackoverflow.com/a/22058673/5500609)


## Как получить путь к текущему файлу?

- Использовать `__file__`:
    - `os.path.dirname(__file__)`
    - `pathlib.Path(__file__).parent`
- https://stackoverflow.com/a/46061872/5500609

## Чем `pathlib` лучше `os.path`?

[pathlib](https://docs.python.org/3/library/pathlib.html) красивее

Рассмотрим на примере: допустим, нужно получить путь к директории `templates`, которая находится в той же директории,
где и текущий файл

На `os.path` это будет выглядеть так:

```python
import os

os.path.join(os.path.dirname(__file__), 'templates')
```

На `pathlib` это будет так:

```python
from
import Path

Path(__file__).parent / 'templates'
```

### pathlib на Python 2

Для Python 2 нужно поставить [backport](https://pypi.org/project/pathlib2/):

- `pip install pathlib2`
- `from pathlib2 import Path`
- https://stackoverflow.com/questions/49720878/cant-import-pathlib


