# Vue

## Как итерироваться с индексом?

```html

<div v-for="(item, index) in items" :key="item.name">
    {{ index }}: {{ item.name }}
</div>
```

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

- walletPaymentType - переменная, которая используется для биндинга
- PAYMENT_TYPE, DISCOUNT - строковые константы
- Суть в v-model: когда выбран radio-button, то в v-model выставляется значение нажатого radio-button, а в других radio-button
  нажатие снимается

### Как снять выбор с radio-button?

- Нажатием на radio-button никак
- Можно сделать кнопку, которая будет для v-model выставлять null - таким образом можно снять
  выбор с radio-button
