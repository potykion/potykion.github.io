# Vue

## Как итерироваться с индексом?

```html
<div v-for="(item, index) in items" :key="item.name">
    {{ index }}: {{ item.name }}
</div>
```
