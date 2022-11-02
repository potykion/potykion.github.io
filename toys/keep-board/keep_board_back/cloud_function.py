import json

from src.cases import Mode
from src.yc import Resp, Event, resp_cors


def handler(event: Event, context) -> Resp:
    """
    https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf
    """
    if event['httpMethod'] == 'OPTIONS':
        return resp_cors()

    try:
        json_, status = Mode.from_event(event).apply()
    except AssertionError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)}),
        }
    else:
        return {
            'statusCode': status or 200,
            'body': json.dumps(json_),
        }
