---
tags:
  - py
---

# jinja2

## Что это?

[jinja2](https://jinja.palletsprojects.com/) - шаблонизатор - штука, которая рендерит строки с шаблонами

!!! note

    При работе с jinja шаблонами в контекст стоит передавать данные как можно подробнее, не просто context=context, а лучше
    сделать словарь со всеми полями, которые будешь юзать - так поиск по использованиям будет норм робить, а то поиск по
    html не оч робит

### Пример

```html
<!-- template.html-->

Order #{{order_number}}
```

```python
import jinja2

env = jinja2.Environment()

rendered = env.get_template('template.html').render(order_number=2)

assert rendered == "Order #2"
```

## Как обрезать ентеры?

```python
env = jinja2.Environment(trim_blocks=True)
```

### О чем речь?

Допустим, есть такой шаблон:

```
{% if True %}
sam
{% endif %}
text
```

При обычном рендере получим такое:

```

sam

text
```

_(и еще перед `sam` ентер, хз поч маркдаун его обрезает)_

Нам эти пробелы бывают не нужны, хочется так:

```
sam
text
```

Чтобы было без пробелов, передаем в `jinja2.Environment` параметр  `trim_blocks=True`

## Фильтры

### Что такое?

Фильтр - функции, которые можно применять внутри тега

```python

assert jinja2.Template('{{ "sam" | upper }}').render() == 'SAM'
```

### Как писать свои?

- Фильтр - это просто функция:

```python
def wrap_with_b(str_):
    return f'<b>{str_}</b>'
```

- Ее нужно зарегистрировать в `jinja2.Environment`:

```python
env = jinja2.Environment()
env.filters.update({
    'b': wrap_with_b,
})
```

- Теперь можно использовать в шаблонах:

```html
<!-- template.html-->

{{ "order" | b}}
```

```python
import jinja2


def wrap_with_b(str_):
    return f'<b>{str_}</b>'


env = jinja2.Environment()
env.filters.update({
    'b': wrap_with_b,
})

rendered = env.get_template('template.html').render()

assert rendered == "<b>order</b>"
```

#### Как передавать дополнительные аргументы?

- Первый аргумент функции - значение шаблона, а остальные аргументы передаем как обычно - в скобках

```html
<!-- template.html-->

{{ "order" | icon("❤") }}
```

```python

def icon(str_, icon_):
    return f"{icon_} {str_}"


env = jinja2.Environment()
env.filters.update({
    u"icon": icon,
})

rendered = env.get_template('template.html').render()

assert rendered == "❤ order"
```