---
 tags:
   - js
---

# Кликабельные ссылки в тексте

```js
export const makeClickableLinks = (str) =>
    str.replace(/(https?:\/\/[^\s]+)/g, "<a href='$1' target='_blank'>$1</a>");
```