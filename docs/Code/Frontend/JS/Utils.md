# Утилитки

## groupBy

```js
const apply = (obj, keyOrFunc) => typeof keyOrFunc === 'string'
    ? obj[keyOrFunc]
    : keyOrFunc(obj);
export const groupBy = (items, keyOrFunc) => items.reduce(
    (res, obj) => ({
        ...res,
        [apply(obj, keyOrFunc)]: [...(res[apply(obj, keyOrFunc)] ?? []), obj]
    }),
    {},
);

```

## zip

```js
export const zip = (keys, values) => {
    let obj = {};
    keys.forEach((key, index) => obj[key] = values[index]);
    return obj;
}
```

## Кликабельные ссылки в тексте

```js
export const makeClickableLinks = (str) =>
    str.replace(/(https?:\/\/[^\s]+)/g, "<a href='$1' target='_blank'>$1</a>");
```