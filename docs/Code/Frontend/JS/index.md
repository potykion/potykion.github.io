# JS

## Как типизировать без TypeScript?

Использовать [jsdoc](https://jsdoc.app/), а именно [@type](https://jsdoc.app/tags-type.html)-тег

## Как удалить элемент из массива по индексу?

```js
const array = [1, 2, 3];
const index = 1;
array.splice(index, 1);
// array == [1, 3]
```

## Как валидировать форму?

Напр. как завалидировать required-inputы

```js
for (const el of document.getElementById('form').querySelectorAll("[required]")) {
    if (!el.reportValidity()) {
        return;
    }
}
```

[Источник](https://stackoverflow.com/a/67826542/5500609)

## Как fetch использовать?

```js
await fetch(
    `/company/config_settings/iiko_transport/payment_types`,
    {
        method: 'POST',
        body: JSON.stringify({...}),
    },
)
```

### Как передавать query-параметры?

https://stackoverflow.com/a/58437909/5500609

```js
await fetch(
    '/company/config_settings/verification' + new URLSearchParams({status: this.status}),
)
```

### Как читать json-response?

```js
const resp = await fetch(...);
const res = await resp.json();
```

## Как написать groupBy?

```js
function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
```

## Как снять выбор с radio-button?

- Нажатием на radio-button никак
- [При использовании Vue](../Vue.md) можно сделать кнопку, которая будет для v-model выставлять null - таким образом
  можно снять
  выбор с radio-button

## Как работать с файлами?

- [База](https://developer.mozilla.org/en-US/docs/Web/API/File)
- [При использовании Vue](../Vue.md)

## Как скачать файл из запроса?

**Задача:** кинуть http-запрос, который отдает бинарный файл (напр. эксель), и скачать его в браузере

0. Кидаем запрос:
    
    ```js
    const resp = await fetch(...);
    ```

1. Нам нужен `Blob` и  `content-disposition`-хедер:

    ```js
    const contentDispositionHeader = resp.headers.get("content-disposition");
    const blob = await resp.blob();
    ```

2. Далее парсим хедер - достаем `filename`

    ```js
    function parseContentDisposition(disposition): string | undefined {
        if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                return matches[1].replace(/['"]/g, '');
            }
        }
    }
    
    const fileName = decodeURIComponent(parseContentDisposition(contentDispositionHeader));
    ```

3. И качаем `Blob` с названием `filename`, создавая `<a href download>`

    ```js
    const downloadBlob = (blob, fileName) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    downloadBlob(blob, fileName);
    
    ```

Полный код:

```js
function parseContentDisposition(disposition): string | undefined {
    if (disposition && disposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            return matches[1].replace(/['"]/g, '');
        }
    }
}

const downloadBlob = (blob, fileName) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const resp = await fetch(...);

const contentDispositionHeader = resp.headers.get("content-disposition");
const blob = await resp.blob();

const fileName = decodeURIComponent(parseContentDisposition(contentDispositionHeader));

downloadBlob(blob, fileName);
```