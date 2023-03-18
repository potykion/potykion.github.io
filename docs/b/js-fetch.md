---
 tags:
   - js
---

# Как fetch использовать?

```js
await fetch(
    `/company/config_settings/iiko_transport/payment_types`,
    {
        method: 'POST',
        body: JSON.stringify({...}),
    },
)
```

## Как передавать query-параметры?

https://stackoverflow.com/a/58437909/5500609

```js
await fetch(
    '/company/config_settings/verification' + new URLSearchParams({status: this.status}),
)
```

## Как читать json-response?

```js
const resp = await fetch(...);
const res = await resp.json();
```
