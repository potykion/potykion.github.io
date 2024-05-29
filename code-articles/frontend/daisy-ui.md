# [Daisy-UI](https://daisyui.com/)

## Исчезающий алерт

```html
<div class="toast animate-fadeOut">
  <div class="alert alert-success">
    <span>Сохранил!</span>
  </div>
</div>
```

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    // ...
    theme: {
        extend: {
            // class="animate-fadeOut"
            animation: {
                fadeOut: 'fadeOut 5s ease-in-out forwards',
            },
            keyframes: {
                fadeOut: {
                    '0%': {opacity: 1},
                    '100%': {opacity: 0},
                },
            },
        },
    },
}
```