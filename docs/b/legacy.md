---
tags:
  - dev
---

# Легаси

<figure markdown>
![](legacy.png)
</figure>

- _Речь о легаси на Python_
- Легаси - код, доставшийся в наследство; код, который писали до тебя, или ты, но давно
- **В чем плюс легаси:** Оно работает и приносит деньги
- **В чем проблема легаси**: Хз как оно работает, разбираться в этом очень не хочется, испытываешь боль от большого
  количества запутанного кода

## Как жить с легаси?

### Смириться

- Самый простой вариант
- С легаси можно жить, просто каждый раз будешь тратить время на то, чтобы в нем
  разобраться, испытывая боль/скуку

### Переписать все

- Не оч вар, тк это долго и дорого
- Только переписывать всю систему, не делая других задач, тебе не разрешат
- Если тот, с кем ты переписывал код, уйдет, то ты снова получишь легаси

### Потихонечку рефачить

- Самый оптимальный вариант
- Сразу будешь получать фидбек - чето отрефачил, залил на прод - вот тебе и фидбек
- Но сначала нужна подготовка

## Подготовка к рефакторингу

- Как я писал, легаси хз как работает, так что сразу что-то рефачить - опасно: может ебануть + ты не знаешь всех
  деталей, тонкостей
- Нужно провести ряд действий перед рефакторингом:

### Тесты

- Сделай так, чтобы можно было писать тесты любой сложности: тесты бд, тесты http-запросов - все гуглится, все возможно
- Любой рефакторинг начинай с тестов, чтобы была уверенность в том, что рефакторинг работает

### Линтеры

- Приводить код к одному стилю полезно в любом проекте
- [flake8](https://flake8.pycqa.org/en/latest/) в помощь

### Типизация и контракты

- Одна из проблем легаси на Python - динамическая типизация Python - то есть можно писать че угодно
- Из-за этого непонятно что происходит: бесконечные словари, хз что передается в методы
- Соответственно, нужно это дело типизировать и использовать контракты:
    - Вместо словарей - использовать классы
    - Вместо джсонов на вход и на выход - использовать классы
    - Большое количество аргументов функции - опять выносить в классы
- Поможет в этом [mypy](http://mypy-lang.org/) и [attrs](https://www.attrs.org/en/stable/)

