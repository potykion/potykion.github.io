import dataclasses
from typing import Callable, Tuple, Union

__all__ = ['HttpRes', 'Json', 'StatusCode', 'Code', 'Response']

Json = Union[dict, list]
StatusCode = Code = int
Response = Tuple[Json, StatusCode]


@dataclasses.dataclass()
class HttpRes:
    success: bool
    msg: str = ''
    code: int = None

    @classmethod
    def ok(cls, msg='', code=200, **kwargs):
        return HttpRes(success=True, msg=msg, code=code)

    @classmethod
    def err(cls, msg='', code=400, **kwargs):
        return HttpRes(success=False, msg=msg, code=code)

    def map(self, callable_: Callable[[], 'HttpRes']):
        if self.success:
            return callable_()
        else:
            return self

    @property
    def as_response(self) -> Response:
        return {'success': self.success, 'msg': self.msg}, self.code


def test_HttpRes():
    assert HttpRes.ok().code == 200
    assert HttpRes.err().code == 400
    assert HttpRes.ok('sam').as_response == ({'success': True, 'msg': 'sam'}, 200)
    assert HttpRes.ok('sam').map(lambda: HttpRes.ok('sam2')).msg == 'sam2'
    assert HttpRes.err('sam').map(lambda: HttpRes.ok('sam2')).msg == 'sam'
