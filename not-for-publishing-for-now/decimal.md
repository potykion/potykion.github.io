---
title: Decimal
desc: Просто маленькая справка по немаленькому типу данных
---

```python
import decimal

decimal.Decimal('14.88')
```

## Округление

```doctest
>>> import decimal
>>> decimal.Decimal('1.234').quantize(decimal.Decimal('0.01'))
Decimal('1.23')
```