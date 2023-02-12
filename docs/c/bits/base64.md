---
tags:
  - web
---

# base64

- Удобно, когда нужно перевести бинарный файл (картинка, пдф) в строку
- Но **размер строки будет больше самого файла**
- Однако, опять же, с бинарными данными бывает ненужная ебля, типа как передавать их в апишке (форм дата, парс blobа и тд), а строку отдать в апишке - это всегда по кайфу
- Ещё используется в jwt
- Или просто когда надо что-то зашифровывать
- Ещё можно использовать в `<img>`

Пример картинки в б64:

```
iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=
```

Пример использования б64 в `<img>`:

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII
```