# Модули

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