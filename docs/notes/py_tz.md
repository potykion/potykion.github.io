---
tags:
  - py
---

# Таймзоны в Python

## Как выставить таймзону дате?

Использовать `datetime.datetime.astimezone` и `datetime.timezone`:

```python
import datetime as dt

now_date = dt.datetime.now().replace(hour=0, minute=0, second=0)
last_meeting = (
    now_date
    - dt.timedelta(days=7)
    + dt.timedelta(hours=16)
).astimezone(dt.timezone(offset=dt.timedelta(hours=3)))
```

### Выставить текущей дате

```python
import pytz

dt.datetime.now(pytz.timezone(settings.TIME_ZONE))
```

Здесь `settings.TIME_ZONE` - это джанго-настройка таймзоны, напр. `Europe/Moscow`

## Как перевести из UTC в UTC+3 (со сдвигом)?

```python
utc_now = dt.datetime.utcnow()
utc_now = utc_now.replace(tzinfo=pytz.UTC)

local_now = utc_now.astimezone(pytz.timezone('Europe/Moscow'))
```