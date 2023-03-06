---
 tags:
   - py
   - re
---



# Как сделать матчинг любого символа в тч \n?

Исользовать `.` в сочетации с `re.DOTALL`:

```python
re.findall(
    r'^M:(.*?)T:(.*?)D:(.*?)W:(.*?)$',
    commit_msg,
    re.DOTALL,
)
```

Источник: https://stackoverflow.com/a/45981809/5500609