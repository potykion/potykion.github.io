---
 tags:
   - vue
---

# Итерация во Vue

## Как итерироваться с индексом?

```html

<div v-for="(item, index) in items" :key="item.name">
    {{ index }}: {{ item.name }}
</div>
```

## Как итегрироваться по объекту?

```html

<li v-for="(value, key) in myObject">
    {{ key }}: {{ value }}
</li>
```

[Источник](https://vuejs.org/guide/essentials/list.html#v-for-with-an-object)

