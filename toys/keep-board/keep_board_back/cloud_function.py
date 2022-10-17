import json

from src.cases import ListNotes
from src.yc import Event, Resp


def handler(event: Event, context) -> Resp:
    """
    https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf
    """
    mode = event['queryStringParameters'].get('mode', 'daily')
    notes = ListNotes(mode)()
    return {
        'statusCode': 200,
        'body': json.dumps([note.to_json() for note in notes]),
    }
