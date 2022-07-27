# doctest

## Зачем нужно?

Для простых тестов

```python
def format_phone(phone):
    """  
    >>> format_phone('79852489052')  
    '+7 (985) 248-90-52'    
    """
    return '+{} ({}) {}-{}-{}'.format(
        phone[0], phone[1:4], phone[4:7], phone[7:9], phone[9:11],
    )
```

## Как сделать многострочный тест?

Создание классов, циклы, методы - используем `...`

```doctest
>>> contract_info = Mock(  
...     contract_number="SAM/2016/1-1",  
...     contract_date=dt.datetime(2021, 1, 1),  
...     app_name="Sample"  
... )
>>> contract_info.app_name
'Sample'
```

## Как тестировать исключения?

Используем `...`

```doctest
>>> validate_phone("")  
Traceback (most recent call last):  
...  
phonenumbers.phonenumberutil.NumberParseException: (1) The string supplied did not seem to be a phone number.
```

## Как заигнорить тест?

`# doctest:+SKIP`

```doctest
>>> random_permutation(range(5))  # doctest:+SKIP  
(3, 4, 0, 1, 2)
```


