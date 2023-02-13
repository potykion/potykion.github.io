---
tags:
  - js
hide:
  - toc
---

# Тайпинги в JS без TS

Чтобы аннотировать типы переменных, необязательно ставить TypeScript, можно
юзать [jsdoc-type](https://jsdoc.app/tags-type.html):

```js
/** @type {('yes'|'no'|'???')} */
let decision = '???';
```

Также можно [аннотировать функции](https://jsdoc.app/tags-returns.html), используя `@param` и `@returns`:

```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}
```

Можно создавать и целые [определения типов](https://jsdoc.app/tags-typedef.html) (аналог `type` в TS):

```js
/**
 * @typedef {('yes'|'no'|'???')} Decision
 */

/** @type {Decision} */
let decision = '???';
```