# htmx

[htmx](https://htmx.org/) - альтернативная frontend-библиотека; философия в том чтобы заменять html контент контентом с
сервера

## Рецепты

```html

<div>
    {{ link.link_url }}
    <form hx-post="/mt/qr/gen" hx-target="next .qr-code-img">
        <input name="url" hidden value="{{ link.link_url }}">
        <button>Скачать куар</button>
        <span class="htmx-indicator">⏳</span>
    </form>

    <div class="qr-code-img" style="width: 400px"></div>
</div>
```

При сабмите формы отправляется запрос на сервер и ответ помещается в **следующий за**
формой `div.qr-code-img`

### Индикатор прогресса

Вешаем класс `.htmx-indicator`:

```html
<span class="htmx-indicator">⏳</span>
```

### Сброс формы

```html

<form hx-post hx-target="next .res" hx-on::after-request="if(event.detail.successful) this.reset()">

```

## Таргет `hx-target`

| Тип       | Описание                      | Пример                          |
|-----------|-------------------------------|---------------------------------|
| `closest` | Родительский элемент          | `hx-target="closest div"`       |
| `next`    | Сиблинг - тег на одном уровне | `hx-target="next .qr-code-img"` |
| `find`    |                               |                                 |

- `hx-target="closest div"` - меняет родительский элемент

```html

<div>
    {{ task.title }}

    <button class="btn btn-sm btn-circle" hx-delete="/tools/rewardy/{{ task.id }}" hx-swap="delete"
            hx-target="closest div">
        ❌
    </button>
</div>

```

При нажатии на кнопку кидаем запрос, и удаляем родительский div
