---
tags:
  - py
---

# helium

## Что это?

- [helium](https://github.com/mherrmann/selenium-python-helium) - обертка над [Selenium](https://www.selenium.dev/) -
  либой для автоматизации
  бразузера ([читшит](https://github.com/mherrmann/selenium-python-helium/blob/master/docs/cheatsheet.md), [дока](https://selenium-python-helium.readthedocs.io/en/latest/index.html))

## Зачем автоматизировать браузер?

- Чтобы тестить сайты
- Чтобы скрепать сайты: стягивать инфу с сайтов без апи ~~и регистрации~~
    - Пример - [скачиватель залайканных картинок из ВК](https://github.com/potykion/my-vk-likes)

## Чем helium лучше selenium?

- Не надо дополнительно ставиться драйверы - `helium.start_firefox` и погнали
    - Хотя с хромом [чето беда](https://github.com/mherrmann/selenium-python-helium/issues/89)
- Основное преимущество - упрощенное апи
    - Хочешь нажать на кнопку с текстом - так и пиши: `helium.click('button text')`
- Полная совместимость с Selenium - знания о Selenium (напр. `WebElement`) тут будут на руку

## Нюансы

- `helium.scroll_down` чет не оч робит - лучше юзать `helium.press(ARROW_DOWN)`

## Рецепты

- Получить аттрибут, напр. `href`: `S.web_element.get_attribute('href')`
    - `S` - то, что получаем при вызывове `find_all` 
