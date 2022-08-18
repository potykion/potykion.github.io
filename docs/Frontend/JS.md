# JS

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
- [При использовании Vue](Vue.md) можно сделать кнопку, которая будет для v-model выставлять null - таким образом
  можно снять
  выбор с radio-button

## Как работать с файлами?

- [База](https://developer.mozilla.org/en-US/docs/Web/API/File)
- [При использовании Vue](Vue.md)