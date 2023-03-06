---
tags:
  - celery
---

# Вызов тасок в Celery

## Асинхронный запуск

```python
@shared_task
def task(*args, **kwargs):
    ...


task.delay(*args, **kwargs)
task.apply_async(args, kwargs)
```

[Источник](https://docs.celeryq.dev/en/stable/userguide/calling.html#basics)

## Цепочка тасок

Чтобы сделать цепочку тасок, нужно сделать `signature`:

```python
from celery import signature

signature('tasks.add', args=(2, 2), countdown=10)
add.signature((2, 2), countdown=10)
add.s(2, 2).set(countdown=10)
```

`s` - это типа `partial`, т.е. если таска принимает 2 аргумента, можно сделать partial с 1 аргом, и затем зачейнить:

```python
# mul принимает 2 аргумента, но используя {s} можно 1 арг указать
add.apply_async((2, 2), link=mul.s(16))() 
(2 + 2) * 16 
```

Можно чейнить и без передачи арга из результата предыдущей функции, используя `si`:

```python
(add.si(2, 2) | add.si(4, 4) | add.s(8, 8))().get()
16
(2+2) | (4+4) | (8+8) # вернется результат последней таски
```

Делаем цепочку:

```python
add.apply_async((2, 2), link=mul.s(16))
add.s(2, 2) | mul.s(16)
```

[Источник](https://docs.celeryq.dev/en/stable/userguide/canvas.html)