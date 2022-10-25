import json
from ast import literal_eval

from black import format_str, Mode


def format_dict(raw_dict, *, as_json=False, sort_keys=False):
    dict_ = raw_dict if isinstance(raw_dict, dict) else \
        literal_eval(raw_dict.strip())

    if sort_keys:
        dict_ = {key: dict_[key] for key in sorted(dict_)}

    if as_json:
        return json.dumps(dict_, indent=2, ensure_ascii=False)
    else:
        return format_str(str(dict_), mode=Mode())
