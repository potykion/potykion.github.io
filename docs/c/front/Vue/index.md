# Vue

<embed alt="Vue-Essentials-Cheat-Sheet via VueMastery" src="../../../a/Vue-Essentials-Cheat-Sheet.pdf" width="100%" height="800px"  />

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

## Как писать radio-button-ы?

```js

<label>
    <input type="radio" v-model="walletPaymentType"
    :value="PAYMENT_TYPE">
    Отправлять отдельным типом оплаты
</label>
<label>
    <input type="radio" v-model="walletPaymentType"
    :value="DISCOUNT">
    Отправлять отдельной скидкой
</label>
```

- `walletPaymentType` - переменная, которая используется для биндинга
- `PAYMENT_TYPE`, `DISCOUNT` - строковые константы
- Суть в `v-model`: когда выбран radio-button, то в `v-model` выставляется значение нажатого radio-button, а в других
  radio-button
  нажатие снимается

### Как снять выбор с radio-button?

- Нажатием на radio-button никак
- Можно сделать кнопку, которая будет для `v-model` выставлять `null` - таким образом можно снять
  выбор с radio-button

## Как считать содержимое файла?

```html
<input type="file" @change="readFile">
```

```js
{
    async
    readFile(e)
    {
        const file = e.target.files[0];
        const text = await file.text();
    }
}
```

[Источник](https://stackoverflow.com/a/50900809/5500609)

## Petite Vue

- [Petite Vue](https://github.com/vuejs/petite-vue) хорош только для динамических формочек
- Пользоваться им на полную не выйдет - не все поддерживается:
    - Лямбды не робят
    - В цикл нельзя ифы вставлять
    - Нет геттеров

## Как использовать переменные среды?

Помечать переменные среды префиксом `VUE_APP_`, тогда они будут доступны в клиентском коде

[Источник](https://cli.vuejs.org/guide/mode-and-env.html)