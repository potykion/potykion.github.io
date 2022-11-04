import dataclasses
from typing import Callable, Tuple

__all__ = ['HttpRes']


@dataclasses.dataclass()
class HttpRes:
    success: bool
    msg: str = ''
    _code: int = None

    @classmethod
    def ok(cls, msg='', **kwargs):
        return HttpRes(success=True, msg=msg, **kwargs)

    @classmethod
    def err(cls, msg='', **kwargs):
        return HttpRes(success=False, msg=msg, **kwargs)

    @property
    def code(self):
        if self._code:
            return self._code
        else:
            return 200 if self.success else 400

    def map(self, callable_: Callable[[], 'HttpRes']):
        if self.success:
            return callable_()
        else:
            return self

    @property
    def as_response(self) -> Tuple[dict, int]:
        return {'success': self.success, 'msg': self.msg}, self.code


def test_HttpRes():
    assert HttpRes.ok().code == 200
    assert HttpRes.err().code == 400
    assert HttpRes.ok('sam').as_response == ({'success': True, 'msg': 'sam'}, 200)
    assert HttpRes.ok('sam').map(lambda: HttpRes.ok('sam2')).msg == 'sam2'
    assert HttpRes.err('sam').map(lambda: HttpRes.ok('sam2')).msg == 'sam'
