---
tags:
  - py
---

# Как написать возвращаемое значение для classmethod абстрактного класса?

!!! note
    
    В Python 3.11 завезли тип [`Self`](https://peps.python.org/pep-0673/), который делает все то же самое

Допустим есть абстрактный класс, который делает сущность из json:

```python
class WithFromJson:
    @classmethod
    def from_json(cls, json_: dict) -> ?:
        ...
```

И его наследник:

```python
import dataclasses


@dataclasses.dataclass()
class Resp(WithFromJson):
    code: int
    msg: str

    def from_json(self, json_: dict) -> Resp:
        return {
            'code': json_['code'],
            'msg': json_['msg'],
        }
```

Как написать тайпинг для `WithFromJson`? - использовать `TypeVar`:

```python
from typing import TypeVar


class WithFromJson:
    @classmethod
    def from_json(cls, json_: dict) -> 'WithFromJsonT':
        ...

WithFromJsonT = TypeVar('WithFromJsonT', bound=WithFromJson)
```

 