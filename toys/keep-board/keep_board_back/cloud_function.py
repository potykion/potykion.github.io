import json

from dotenv import load_dotenv

from src.api_cli import KeepCli


def handler(event, context):
    """
    https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf
    """
    load_dotenv()
    daily = KeepCli().setup().notes(label='daily')
    daily = sorted(daily, key=lambda note: note.created)
    return {
        'statusCode': 200,
        'body': json.dumps([note.to_json() for note in daily]),
    }
