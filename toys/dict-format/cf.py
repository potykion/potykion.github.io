from dict_format_back.yc import Event, Resp

from dict_format_back.cases import format_dict


def handler(event: Event, context) -> Resp:
    return {
        'statusCode': 200,
        'body': format_dict(
            event['body'],
            as_json=event['queryStringParameters'].get('as_json'),
            sort_keys=event['queryStringParameters'].get('sort_keys'),
        ),
    }
