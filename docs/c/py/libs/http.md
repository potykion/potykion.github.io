# Http-клиенты 

## Requests

### Как грамотно обрабатывать ошибки?

https://stackoverflow.com/a/16511493/5500609

## httpx

Как качать картинки/файлы:

```python
import httpx

with open(where_to_save_file, 'wb') as f:
    with httpx.stream('GET', url) as resp:
        for chunk in resp.iter_bytes():
            f.write(chunk)
```
