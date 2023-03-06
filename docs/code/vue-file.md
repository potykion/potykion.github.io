---
 tags:
   - vue
---

# Как считать содержимое файла?

```html
<input type="file" @change="readFile">
```

```js
{
    async readFile(e) {
        const file = e.target.files[0];
        const text = await file.text();
    }
}
```

[Источник](https://stackoverflow.com/a/50900809/5500609)
