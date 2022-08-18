# FactoryBoy

## Зачем нужно?

Генерировать сущности любой сложности для тестов (да и вообще)

### Да и вообще?

Можно использовать factoryboy для создания данных для локальной бд и тестировать таким образом локалку (фронт поднять,
посмотреть как выглядят данные с бека)

## Как сгенерировать рандом?

Использовать пакеты `factory.fuzzy` и `factory.faker`

### Рандомный выбор из списка - `factory.fuzzy.Choice`:

```python
# Выбираем рандомный чойс из django-енама
date_type = factory.fuzzy.FuzzyChoice(
    map(itemgetter(0), FilterPreset.DateType.choices),
)
```

### Рандомное число - `factory.fuzzy.FuzzyInteger`

```python
value = factory.fuzzy.FuzzyInteger(10)
```

Важно: если указать 1 аргумент, то число будет генерироваться в промежутке [0, number] - аккуратнее с проверками типа `if not value`

Для промежутка, который начинается с 1, передаем 2 аргумента:

```python
value = factory.fuzzy.FuzzyInteger(1, 10)
```
