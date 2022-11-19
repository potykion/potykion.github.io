# FP

## Монады

### Вдохновиться

- https://returns.readthedocs.io/en/latest/pages/result.html
- https://doc.rust-lang.org/std/result/enum.Result.html
- https://doc.rust-lang.org/std/result/
- https://pypi.org/project/result/

### Result

```python
import dataclasses
from functools import partial
from typing import Generic, Any, cast, Iterable, Tuple, Optional, TypeVar

T = TypeVar('T')

OkT = TypeVar('OkT')
ErrT = TypeVar('ErrT')


class Result(Generic[OkT, ErrT]):
    def __iter__(self):
        # type: () -> Iterator[Tuple[Optional[OkT], Optional[ErrT]]]
        if isinstance(self, Ok):
            return iter(cast(Iterable[Tuple[Optional[OkT], Optional[ErrT]]], (self.value, None)))
        elif isinstance(self, Err):
            return iter(cast(Iterable[Tuple[Optional[OkT], Optional[ErrT]]], (None, self.value)))
        else:
            raise RuntimeError('Наследовать Result могут только Ok и Err')

    def map(self, any_):
        # type: (Callable[..., object]) -> Result
        """
        >>> Ok(2).map(lambda v: v + 2)
        Ok(value=4)
        >>> Err(2).map(lambda v: v + 2)
        Err(value=2)
        """
        if isinstance(self, Err):
            return self
        else:
            return Result.safe(partial(any_, cast(Ok, self).value))

    def map_err(self, any_):
        # type: (Callable[..., object]) -> Result
        """
        >>> Ok(2).map_err(lambda v: v + 2)
        Ok(value=2)
        >>> Err(2).map_err(lambda v: v + 2)
        Err(value=4)
        """
        if isinstance(self, Ok):
            return self
        else:
            return Err(any_(cast(Err, self).value))

    def or_else(self, any_):
        # type: (Callable[..., Result]) -> Result
        """
        >>> Ok(2).or_else(lambda v: Ok(v + 2))
        Ok(value=2)
        >>> Err(2).or_else(lambda v: Ok(v + 2))
        Ok(value=4)
        """
        if isinstance(self, Ok):
            return self
        else:
            return any_(cast(Err, self).value)

    def and_then(self, any_):
        # type: (Callable[..., Result]) -> Result
        """
        >>> Ok(2).and_then(lambda v: Ok(v + 2))
        Ok(value=4)
        >>> Err(2).and_then(lambda v: Ok(v + 2))
        Err(value=2)
        """
        if isinstance(self, Ok):
            return any_(cast(Ok, self).value)
        else:
            return self

    @classmethod
    def safe(cls, callable_):
        """
        >>> Result.safe(lambda: 2)
        Ok(value=2)
        >>> def raise_e():
        ...   raise Exception('err')
        >>> Result.safe(raise_e)
        Err(value=Exception('err',))
        """
        try:
            return Ok(callable_())
        except Exception as e:
            return Err(e)

    def flatten(self):
        if isinstance(self.value, Result):
            return self.value
        else:
            return self


@dataclasses.dataclass()
class Ok(Result):
    value: Any = None

    def __attrs_post_init__(self):
        if isinstance(self.value, Ok):
            self.value = self.value.value


@dataclasses.dataclass()
class Err(Result):
    value: Any = None

```

### Maybe

```python
import dataclasses
from typing import TypeVar, Generic, Callable

T = TypeVar('T')


class Maybe(Generic[T]):
    def or_else(self, maybe_callable: Callable[[], 'Maybe']):
        if isinstance(self, Some):
            return self
        else:
            return maybe_callable()

    def or_(self, maybe: 'Maybe'):
        if isinstance(self, Some):
            return self
        else:
            return maybe

    def unwrap(self):
        if isinstance(self, Some):
            return self.val
        else:
            raise ValueError('Нельзя вызвать unwrap для Nothing')


@dataclasses.dataclass()
class Some(Generic[T], Maybe[T]):
    val: T


class Nothing(Maybe):
    ...
```

### Either

```python
from collections import Callable

import attr
from typing import TypeVar, Generic, cast, Union

LeftT = TypeVar('LeftT')
RightT = TypeVar('RightT')


class Either(Generic[LeftT, RightT], object):
    def map_left(self, callable_):
        # type: (Callable) -> Union[Left, Right]
        if isinstance(self, Left):
            return Left(callable_(self.val))
        else:
            return cast(Right, self)

    def into_inner(self):
        # type: () -> Union[LeftT, RightT]
        if isinstance(self, Left):
            return self.val
        else:
            return cast(Right, self).val


@attr.s
class Left(Either):
    val = attr.ib()


@attr.s
class Right(Either):
    val = attr.ib()


EitherT = TypeVar('EitherT', bound=Either)

```