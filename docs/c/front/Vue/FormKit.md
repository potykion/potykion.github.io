---
cover: Code/Frontend/Vue/FormKit.png
---

# FormKit

![](FormKit.png)

[FormKit](https://formkit.com/) - приятная либа для создания формочек во Vue

<iframe width="560" height="315" src="https://www.youtube.com/embed/89dijjTlveI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

^ Ебать какой трейлер для библиотечки

## Базовый пример

```html

<FormKit type="form" @submit="submitForm">
  <FormKit type="text" name="name" label="Name"/>
</FormKit>
```

## Биндинг

- Можно по классике - через `v-model`, а можно просто `name` задать:

```html

<FormKit type="text" name="name" label="Name"/>
```

- В примере выше, при сабмите формы будет генериться объект с полем `name`

## Форма

- В html сабмит тега `<form>` - это `POST`-метод с `formdata`
- Обычно, этого недостаточно, хочется сабмитить форму в методе, отправляя джсончик, хочется валидации, хочется блокировку кнопки 
- И вот в formkit это все из коробки: сабмит - сразу через событие с объектом, валидация сама происходит, кнопка блокируется - полный фарш!

## Вывод стейта формы

```html
<FormKit type="form"  #default="{ value }">
  <FormKit type="text" name="name" label="Name" />
  <pre wrap>{{ value }}</pre>
</FormKit>
```

В `pre` будет выводиться объект `{name: name}`

## Стили

```ts
import {plugin, defaultConfig} from '@formkit/vue'

app.use(plugin, defaultConfig({theme: 'genesis'}))
```




 