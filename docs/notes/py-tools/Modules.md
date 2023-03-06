---
 tags:
   - py
---

# Модули

## Зач надо?

- В PyCharm до сих пор нельзя просто запустить какую-нибудь команду, типа `mkdocs serve`, через кнопку, а не терминал
- Python-проги, типа того же mkdocs - это по сути запускаемые Python-модули => а запускать Python в PyCharm можно => запуская модули, можно
  запускать проги в PyCharm

## Как запускать модули?

```shell
python -m mkdocs serve
```

## Как запускать модули из кода?

```python
import sys
import runpy

sys.argv = ['serve']
runpy.run_module('mkdocs')
```