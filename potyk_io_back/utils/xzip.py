def xzip(iter_1, iter_2, key_func):
    """
    Зип двух последовательностей по key-func

    Пример в та - выставление change-next:

    >>> sample = [...]
    >>> next_sample = [...]
    >>> for ta, next_ta in xzip(sample, next_sample, key=attrgetter('ticker')):
    ...   ta.change_next = next_ta.change
    """
    iter_2_by_key = {item.key: item for item in iter_2}
    for item_1 in iter_1:
        yield item_1, iter_2_by_key[key_func(item_1)]
