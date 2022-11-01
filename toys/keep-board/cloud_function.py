import json

from keep_board_back.cases import ListNotes, Mode
from keep_board_back.yc import Resp, Event


def handler(event: Event, context) -> Resp:
    """
    https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf
    """
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
