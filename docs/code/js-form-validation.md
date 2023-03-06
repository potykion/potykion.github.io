---
 tags:
   - js
---

# Как валидировать форму?

Напр. как завалидировать required-inputы

```js
for (const el of document.getElementById('form').querySelectorAll("[required]")) {
    if (!el.reportValidity()) {
        return;
    }
}
```

[Источник](https://stackoverflow.com/a/67826542/5500609)
