import json

from keep_board_back.src.yc import Event, Resp
from src.api_cli import KeepCli


def handler(event: Event, context) -> Resp:
    """
    https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf
    """
    label = event['queryStringParameters'].get('label', 'daily')
    daily = KeepCli().setup().notes(label=label)
    daily = sorted(daily, key=lambda note: note.created)
    return {
        'statusCode': 200,
        'body': json.dumps([note.to_json() for note in daily]),
    }
