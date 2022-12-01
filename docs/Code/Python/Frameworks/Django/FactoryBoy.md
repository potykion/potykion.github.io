# FactoryBoy

[Factoryboy](https://factoryboy.readthedocs.io/en/stable/) - либа для создания сущностей сложных и простых

## Базовый пример

```python
import factory


class SomeClass:
    def __init__(self, value):
        self.value = value


class SomeClassFactory(factory.Factory):
    class Meta:
        model = SomeClass

    value = 1


cls = SomeClassFactory()
assert cls.value == 1
```

[//]: # (## Генераторы полей ака declarations)

[//]: # (- Допустим нам нужен класс, у которого будет  поле-строка, которое принимает рандомное значение, и поле-айди, которое последовательно увеличиваются - для этого нам помогут генераторы полей, из которых состоит фабрика)

[//]: # (- `LazyAttribute` - )

## Рандом

Для заполнение полей случайными значениями есть 2 способа: `factory.fuzzy`, `factory.faker`

### `factory.fuzzy`

- `FuzzyText` - генерирует рандомный текст

```python
import factory.fuzzy

factory.fuzzy.FuzzyText()
```

### `factory.Faker`

```python
address = factory.Faker('street_address', locale='ru_RU')
```

## Создание словарей

```python
factory.build(dict, FACTORY_CLASS=UserFactory)
```

## `@factory.post_generation`

- Полезно когда надо что-то сделать после создания сущности, напр. сохранить в бд

```python
@factory.post_generation
def put(obj, create, *args, **kwargs):
    if create:
        obj.put()
```

- Аргументы:
    - `obj` - созданная сущность
    - `create` - был ли использована стратегия `CREATE` при создании объекта

## Стратегии создания объектов

- `CREATE` - создает объект и сохраняет в бд в случае ORM; используется по умолчанию

```python
OrderFactory()
OrderFactory.create()
```

- `BUILD` - создает объект и ничего больше; удобно когда нужно сгенерить тестовые данные без вставки в бд, напр. для
  валидации, обновления сущностей

```
OrderFactory.build()
```

## Как сделать ManyToMany?

https://factoryboy.readthedocs.io/en/stable/recipes.html#simple-many-to-many-relationship

## Ссылочки

- https://factoryboy.readthedocs.io/en/stable/index.html
- https://factoryboy.readthedocs.io/en/stable/recipes.html
