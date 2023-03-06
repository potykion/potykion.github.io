---
 tags:
   - py
---

# Что делать если у либы нет тайпингов?

Игнорить жестко:

```ini
[mypy]
;Собсно игнор
ignore_missing_imports = True
;Следовать импортам, но по тихому: модуль использует сторонний пакет, но нет тайпингов - игнорим это, импортим дальше
follow_imports = silent
```

## Что делать если у либы нет тайпингов, а хочется?

Писать тайпинги самому:

- Создаем директорию `stubs` - в ней будут самописные тайпинги
- Прописываем в конфиги путь к `stubs`:

```ini
[mypy]
mypy_path = stubs
```

- Пишем тайпинги создавая `.pyi`-файлы с аналогичным путем

Напр. для `openpyxl.worksheet.worksheet.Worksheet` создаем `stubs.openpyxl.worksheet.worksheet.pyi` и создаем там
тайпинг:

```python
from typing import Iterable


class Worksheet:
    def append(self, iterable: Iterable) -> None: ...

```

- Реализацию писать не нужно, достаточно указать `...`
- Можно реализовывать только то, что используется в коде
    - так у `Worksheet` куча методов, а мы используем только `append`

## Что если тайпинг возвращает библиотечную сущность?

Просто пишем импорты

Так `Workbook` определен в `openpyxl.workbook`, но также импортируется в `openpyxl`

Тогда в `openpyxl/__init__.pyi` пишем:

```python
from openpyxl.workbook import Workbook

__all__ = ('Workbook',)
```

Так как в `__init__.pyi` `Workbook` лишь импортируется, достаточно добавить класс в `__all__`

