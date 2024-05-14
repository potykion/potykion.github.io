from itertools import groupby


def groupby_dict(iter_, key_func):
    return {key: list(items) for key, items in groupby(iter_, key_func)}
