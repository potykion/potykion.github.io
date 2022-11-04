import json

from potyk_fp.http import HttpRes

from src.cases import Mode
from src.yc import Resp, Event, resp_cors


def handler(event: Event, context) -> Resp:
    """
    https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf
    """
    if event['httpMethod'] == 'OPTIONS':
        return resp_cors()

    res = HttpRes.safe(Mode.from_event(event).mode_case).flatten()
    resp, code = res.as_response

    return {
        'statusCode': code,
        'body': json.dumps(resp),
    }
