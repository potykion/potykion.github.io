---
tags:
  - testing
hide:
  - toc
---

# Улучшение читаемости тестов с помощью PyHamcrest

[PyHamcrest](https://pyhamcrest.readthedocs.io/en/latest/) - тестовая либа, которая позволяет писать читаемые ассерты

Так вместо этого:

```python
resp = client.post(...)

assert resp['venue'] == venue.to_json()
assert resp['items'] == [item.to_json() for item in items]
```

Можно писать так:

```python
from hamcrest import assert_that, has_entries

resp = client.post(...)

assert_that(resp, has_entries(
    venue=venue.to_json(), 
    items=[item.to_json() for item in items],
))
```

Т.е. вместо кучи ассертов, можем написать 1 читаемый

Еще можно писать [свои матчеры](https://pyhamcrest.readthedocs.io/en/latest/custom_matchers.html)