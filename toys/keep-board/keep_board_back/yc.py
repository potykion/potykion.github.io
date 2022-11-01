from typing import Literal, TypedDict, Dict


class Event(TypedDict):
    """
    https://cloud.yandex.ru/docs/functions/concepts/function-invoke#request
    """
    body: str
    httpMethod: Literal['POST', 'OPTIONS']
    queryStringParameters: Dict[str, str]
    headers: Dict[str, str]


class Resp(TypedDict, total=False):
    """
    https://cloud.yandex.ru/docs/functions/concepts/function-invoke#response
    """
    statusCode: Literal[200, 400]
    body: str
    headers: dict
