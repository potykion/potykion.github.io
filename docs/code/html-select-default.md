---
tags:
  - html
---

# Как убрать выбор по умолчанию в `select`?

Создать пустую выключенную выбранную опцию:

- она будет выбрана по умолчанию
- ее нельзя будет выбрать второй раз
- если она останется выбранной, то значение селекта - пустое - то есть ничего и не выбрано

```html
<select>
    <option disabled selected value> -- select an option --</option>
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
</select>
```

[Источник](https://stackoverflow.com/a/23638053/5500609)
