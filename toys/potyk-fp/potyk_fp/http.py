import dataclasses
from typing import Callable, Tuple, Union, Any

__all__ = ['HttpRes', 'Json', 'StatusCode', 'Code', 'Response']

Json = Union[dict, list]
StatusCode = Code = int
Response = Tuple[Json, StatusCode]


@dataclasses.dataclass()
class HttpRes:
    success: bool
    msg: str = ''
    _code: int = None

    @property
    def code(self):
        return self._code or (200 if self.success else 400)

    @classmethod
    def ok(cls, msg='', **kwargs):
        return HttpRes(success=True, msg=msg, **kwargs)

    @classmethod
    def err(cls, msg='', **kwargs):
        return HttpRes(success=False, msg=msg, **kwargs)

    def map(self, callable_: Callable[[], Union['HttpRes', Any]]):
        if self.success:
            res = callable_()
            return res if isinstance(res, HttpRes) else HttpRes(success=bool(res))
        else:
            return self

    then = map

    @property
    def as_response(self) -> Response:
        return {'success': self.success, 'msg': self.msg}, self.code


def test_HttpRes():
    assert HttpRes.ok().code == 200
    assert HttpRes.err().code == 400
    assert HttpRes.ok('sam').as_response == ({'success': True, 'msg': 'sam'}, 200)
    assert HttpRes.ok('sam').map(lambda: HttpRes.ok('sam2')).msg == 'sam2'
    assert HttpRes.err('sam').map(lambda: HttpRes.ok('sam2')).msg == 'sam'
    assert HttpRes.ok('sam').map(lambda: 'sam2').msg == ''
    assert HttpRes.ok('sam').map(lambda: 'sam2').code == 200
    assert HttpRes.ok('sam').map(lambda: False).msg == ''
    assert HttpRes.ok('sam').map(lambda: False).code == 400
    assert HttpRes.ok('sam').then(lambda: HttpRes.ok('sam2')).msg == 'sam2'
