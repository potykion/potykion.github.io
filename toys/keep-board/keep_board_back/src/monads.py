import dataclasses
from typing import TypeVar, Generic, cast

T = TypeVar('T')


class Result(Generic[T]):
    def and_then(self, res_callable):
        if isinstance(self, Ok):
            return res_callable(cast(Ok, self).val)
        else:
            return self

    def or_else(self, res_callable):
        if isinstance(self, Ok):
            return self
        else:
            return res_callable(cast(Err, self).val)

    def unwrap(self):
        assert isinstance(self, Ok), f'Result is not Ok: {self}'
        return self.val


@dataclasses.dataclass(frozen=True)
class Ok(Result[T]):
    val: T = None


@dataclasses.dataclass(frozen=True)
class Err(Result[T]):
    val: T = None
