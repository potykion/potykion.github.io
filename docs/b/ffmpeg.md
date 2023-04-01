---
title: ffmpeg
tags:
  - services
  - mu
---

# ffmpeg

<iframe width="560" height="315" src="https://www.youtube.com/embed/26Mayv5JPz0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Установка на винду

```
choco install ffmpeg
```

## Обрезание аудио

Обрезаем `input.opus` с 0:00 до 5:24 и сохраняем в `output.opus`

```
ffmpeg -ss 0 -to 324 -i input.opus output.opus
```
