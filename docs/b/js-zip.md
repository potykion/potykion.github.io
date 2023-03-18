---
 tags:
   - js
---

# Как написать zip?

```js
export const zip = (keys, values) => {
    let obj = {};
    keys.forEach((key, index) => obj[key] = values[index]);
    return obj;
}
```

