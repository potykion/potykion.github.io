from collections import defaultdict
from itertools import groupby


def groupby_dict(iter_, key_func):
    dict_ = defaultdict(list)
    for item in iter_:
        dict_[key_func(item)].append(item)
    return dict_