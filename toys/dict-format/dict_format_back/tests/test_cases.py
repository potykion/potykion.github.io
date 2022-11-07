from pathlib import Path

import pytest

from dict_format_back.cases import format_dict


def test_format_dict_simple():
    formatted = format_dict('{"a": 1}')
    assert formatted == '{"a": 1}\n'


@pytest.mark.parametrize(
    'dict_module',
    [
        # 'raw_dict.py',
        'ya_dict.py'
    ]
)
def test_format_dict(dict_module, snapshot):
    with open(Path(__file__).resolve().parent / dict_module, encoding='utf-8') as f:
        raw_dict = f.read()
        formatted = format_dict(raw_dict)
        snapshot.assert_match(formatted, dict_module)


def test_format_dict_with_sort():
    formatted = format_dict({'b': 2, 'a': 1}, sort_keys=True)
    assert formatted == '{"a": 1, "b": 2}\n'


# def test_format():
#     d = "[{u'networkId': u'', u'website': None, u'maxBonus': 0, u'description': u'', u'averageCheque': None, u'workTime': u';;;;;;', u'logoImage': None, u'longitude': 37.61937, u'organizationType': 0, u'timezone': u'Russian Standard Time', u'phone': u'', u'minBonus': 0, u'contact': {u'phone': u'', u'email': u'', u'location': u''}, u'isActive': True, u'address': u'', u'latitude': 54.192152, u'logo': None, u'homePage': None, u'id': u'', u'currencyIsoName': u'RUB', u'name': u''}, {u'networkId': u'fe470000-906b-0025-205f-08d94cf63244', u'website': None, u'maxBonus': 0, u'description': u'\u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041b\u0435\u043d\u0438\u043d\u0430, \u0434. 33', u'logo': None, u'averageCheque': None, u'address': u'\u0433. \u0422\u0443\u043b\u0430, \u0443\u043b. \u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041b\u0435\u043d\u0438\u043d\u0430, \u0434. 33', u'workTime': u'-;-;-;-;-;-;-', u'logoImage': None, u'longitude': u'', u'id': u'fe470000-906b-0025-7a4e-08d920444f42', u'phone': u'', u'contact': {u'phone': u'', u'email': u'', u'location': u'\u0433. \u0422\u0443\u043b\u0430, \u0443\u043b. \u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041b\u0435\u043d\u0438\u043d\u0430, \u0434. 33'}, u'currencyIsoName': u'RUB', u'minBonus': 0, u'latitude': u'', u'timezone': u'Russian Standard Time', u'homePage': None, u'organizationType': 0, u'isActive': True, u'name': u'\u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041b\u0435\u043d\u0438\u043d\u0430, \u0434. 33'}, {u'networkId': u'fe470000-906b-0025-205f-08d94cf63244', u'website': None, u'maxBonus': 0, u'description': u'\u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041b\u0435\u043d\u0438\u043d\u0430, \u0434. 77', u'averageCheque': None, u'workTime': u'08:00-22:00;08:00-22:00;08:00-22:00;08:00-22:00;08:00-23:00;09:00-23:00;09:00-22:00', u'logoImage': None, u'longitude': 37.603986, u'organizationType': 0, u'timezone': u'Russian Standard Time', u'phone': u'+79207777020', u'minBonus': 0, u'contact': {u'phone': u'+79207777020', u'email': u'roman@barycoffee.com', u'location': u'\u0433. \u0422\u0443\u043b\u0430, \u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041b\u0435\u043d\u0438\u043d\u0430, \u0434. 77'}, u'isActive': True, u'address': u'\u0433. \u0422\u0443\u043b\u0430, \u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041b\u0435\u043d\u0438\u043d\u0430, \u0434. 77', u'latitude': 54.180098, u'logo': None, u'homePage': None, u'id': u'fe470000-906b-0025-7a4e-08d920444f12', u'currencyIsoName': u'RUB', u'name': u'\u041f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041b\u0435\u043d\u0438\u043d\u0430, \u0434. 77'}, {u'networkId': u'fe470000-906b-0025-205f-08d94cf63244', u'website': None, u'maxBonus': 0, u'description': u'\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0430\u044f, \u0434. 47 (\u0422\u0420\u0426 \u0413\u043e\u0441\u0442\u0438\u043d\u044b\u0439 \u0414\u0432\u043e\u0440)', u'logo': None, u'averageCheque': None, u'address': u'\u0433. \u0422\u0443\u043b\u0430, \u0443\u043b. \u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0430\u044f, \u0434. 47 (\u0422\u0420\u0426 \u0413\u043e\u0441\u0442\u0438\u043d\u044b\u0439 \u0414\u0432\u043e\u0440)', u'workTime': u'10:00-22:00;10:00-22:00;10:00-22:00;10:00-22:00;10:00-22:00;10:00-22:00;10:00-22:00', u'logoImage': None, u'longitude': 37.61937, u'id': u'fe470000-906b-0025-7a4e-08d920444f10', u'phone': u'+79207777020', u'contact': {u'phone': u'+79207777020', u'email': u'roman@barycoffee.com', u'location': u'\u0433. \u0422\u0443\u043b\u0430, \u0443\u043b. \u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0430\u044f, \u0434. 47 (\u0422\u0420\u0426 \u0413\u043e\u0441\u0442\u0438\u043d\u044b\u0439 \u0414\u0432\u043e\u0440)'}, u'currencyIsoName': u'RUB', u'minBonus': 0, u'latitude': 54192152, u'timezone': u'Russian Standard Time', u'homePage': None, u'organizationType': 0, u'isActive': True, u'name': u'\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0430\u044f, \u0434. 47 (\u0422\u0420\u0426 \u0413\u043e\u0441\u0442\u0438\u043d\u044b\u0439 \u0414\u0432\u043e\u0440)'}]"
#     snapshot.assert_match(formatted, 'formatted.py')

