---
tags:
  - css
---

# TailwindCSS

[TailwindCSS](https://tailwindcss.com/) - набор CSS-классов-утилиток, типа `grid`, `text-white`, `rounded`

<figure markdown>
![img.png](tailwind-between.png)
<figcaption>
<a href="https://www.youtube.com/watch?v=lHZwlzOUOZ4">Tailwind - это что-то между чистым CSS и UI-фреймворком</a>
</figcaption>
</figure>

## Как юзать

- Просто пишешь css-классы
- Можно юзать с фреймворками, типа Vue
- Можно добавить в проект без JS, типа сюда в MkDocs,
  используя [Tailwind CLI](https://tailwindcss.com/docs/installation)
- Есть интеграции с Idea и [VSCode](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### FAQ

#### Что за `tailwind.config.js`?

- [Настройки Tailwind](https://tailwindcss.com/docs/configuration)
- [`content`](https://tailwindcss.com/docs/content-configuration) - какие файлы чекать на предмет Tailwind-классов
- [`safelist`](https://tailwindcss.com/docs/content-configuration#safelisting-classes) - [принудительное добавление класса в итоговый css](https://stackoverflow.com/a/71189518/5500609)  
- [`theme`](https://tailwindcss.com/docs/theme) - стилизовочка
- [`plugins`](https://tailwindcss.com/docs/plugins) - плагин для интеграции с фреймворками, плагины для Tailwind

## Когда не стоит юзать Tailwind

- Если уже юзаешь UI-фреймворк, типа [Vuetify](https://vuetifyjs.com/en/), то может что-то поехать — лучше
  придерживаться
  фреймворка
    - хотя
      можно [извратиться](https://medium.com/@pierremriau/how-to-replace-vuetify-utility-classes-with-tailwindcss-9a3ebaa21f4f)

## Тулзы

- [Tailwind CSS Cheat Sheet](https://tailwindcomponents.com/cheatsheet/) 
- [DaisyUI](https://daisyui.com/) - UI на Tailwind
- [Typewind](https://typewind.dev/) - типизированный Tailwind
- [Tailscan](https://tailscan.com/) - интерактивный Tailwind
- [Mailwind](https://github.com/soheilpro/mailwind) - письма на Tailwind