# FactoryBoy (+ Faker, mimesis)

[Factoryboy](https://factoryboy.readthedocs.io/en/stable/) - либа для создания сущностей любой сложности для тестов (да
и вообще)

### Да и вообще?

Можно использовать factoryboy для создания данных для локальной бд и тестировать таким образом локалку (фронт поднять,
посмотреть как выглядят данные с бека)

---

## Как сгенерировать рандом?

Использовать пакеты `factory.fuzzy` и `factory.faker`

### `factory.fuzzy`

#### Рандомный текст - `factory.fuzzy.FuzzyText`

```python
import factory.fuzzy

factory.fuzzy.FuzzyText()
```

#### Рандомный выбор из списка - `factory.fuzzy.Choice`:

```python
# Выбираем рандомный чойс из django-енама
date_type = factory.fuzzy.FuzzyChoice(
    map(itemgetter(0), FilterPreset.DateType.choices),
)
```

#### Рандомное число - `factory.fuzzy.FuzzyInteger`

```python
value = factory.fuzzy.FuzzyInteger(10)
```

Важно: если указать 1 аргумент, то число будет генерироваться в промежутке [0, number] - аккуратнее с проверками
типа `if not value`

Для промежутка, который начинается с 1, передаем 2 аргумента:

```python
value = factory.fuzzy.FuzzyInteger(1, 10)
```

### `factory.Faker`

```python
address = factory.Faker('street_address', locale='ru_RU')
```

---

## Как заполнить поле, используя функцию? Напр. `datetime.now`?

Использовать `LazyFunction`:

```python
start = factory.LazyFunction(dt.datetime.utcnow)
```

## Как заполнить поле на основе других полей?

Использовать `LazyAttribute`:

```python
long_name = factory.fuzzy.FuzzyText(120)
short_name = factory.LazyAttribute(lambda f: f.long_name[:20])
```

## Как сгенерить данные, но не передавать их в объект?

Например, генерируемая сущность содержит айди другой сущности, но не саму сущность

Решение - использовать `Params` вместе с `LazyAttribure`:

```python
class OrderFactory(factory.Factory):
    class Meta:
        model = Order

    class Params:
        venue = factory.SubFactory(VenueFactory)

    venue_id = factory.LazyAttribute(lambda f: f.venue.id)
```

Фабрика `OrderFactory` создаст объект `Order` с `venue_id = VenueFactory().id`

---

## Как сделать что-то после создания модели? Напр. сохранить в бд?

Использовать `post_generation`:

```python
@factory.post_generation
def put(obj, create, *args, **kwargs):
    if create:
        obj.put()
```

Здесь при создании объекта, будет вызываться метод объекта `put`

### Что за параметр `create`?

- FactoryBoy умеет создавать объекты в 2 режимах (strategy): `create` и `build`
- Параметр `create` = `True`, если объект создан в режиме `create`; `False` - иначе

## Режимы создания объектов

- FactoryBoy хорошо интегрирован с Django
- Так при вызове фабрики, объект сохранится в бд - это и есть режим `create`
- Режим `build` не сохраняет объект в бд, он просто создает объект

```python
# Юзер сохраняется в бд
UserFactory()
# Юзер сохраняется в бд
UserFactory.create()
# Юзер не сохраняется в бд
UserFactory.buid()
```

## Как еще можно использовать `post_generation`?

- https://factoryboy.readthedocs.io/en/stable/reference.html#extracting-parameters
- Для проставление данных из конструкторва, через параметр `extracted`:
- Убобно, когда нужно проставить many2many в Django:

```python
import factory
from django.db import models


class BodyParts(models.Model):
    name = models.CharField(max_length=128)


class Study(models.Model):
    body_parts = models.ManyToManyField(BodyParts)


class StudyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Study

    @factory.post_generation
    def body_parts(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            self.body_parts.set(extracted)


StudyFactory(body_parts=[BodyParts(name='sam')])
```

Здесь при вызове фабрики в `body_parts.extracted` поступит массив, который
затем сеттим модельке

---

[//]: # (# FactoryBoy)

[//]: # ()
[//]: # (## Базовый пример)

[//]: # ()
[//]: # (```python)

[//]: # (import factory)

[//]: # ()
[//]: # ()
[//]: # (class SomeClass:)

[//]: # (    def __init__&#40;self, value&#41;:)

[//]: # (        self.value = value)

[//]: # ()
[//]: # ()
[//]: # (class SomeClassFactory&#40;factory.Factory&#41;:)

[//]: # (    class Meta:)

[//]: # (        model = SomeClass)

[//]: # ()
[//]: # (    value = 1)

[//]: # ()
[//]: # ()
[//]: # (cls = SomeClassFactory&#40;&#41;)

[//]: # (assert cls.value == 1)

[//]: # (```)

[//]: # ()
[//]: # ([//]: # &#40;## Генераторы полей ака declarations&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- Допустим нам нужен класс, у которого будет  поле-строка, которое принимает рандомное значение, и поле-айди, которое последовательно увеличиваются - для этого нам помогут генераторы полей, из которых состоит фабрика&#41;)
[//]: # ()
[//]: # ([//]: # &#40;- `LazyAttribute` - &#41;)
[//]: # ()
[//]: # (## Создание словарей)

[//]: # ()
[//]: # (```python)

[//]: # (factory.build&#40;dict, FACTORY_CLASS=UserFactory&#41;)

[//]: # (```)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## `@factory.post_generation`)

[//]: # ()
[//]: # (- Полезно когда надо что-то сделать после создания сущности, напр. сохранить в бд)

[//]: # ()
[//]: # (```python)

[//]: # (@factory.post_generation)

[//]: # (def put&#40;obj, create, *args, **kwargs&#41;:)

[//]: # (    if create:)

[//]: # (        obj.put&#40;&#41;)

[//]: # (```)

[//]: # ()
[//]: # (- Аргументы:)

[//]: # (    - `obj` - созданная сущность)

[//]: # (    - `create` - был ли использована стратегия `CREATE` при создании объекта)

[//]: # ()
[//]: # (## Стратегии создания объектов)

[//]: # ()
[//]: # (- `CREATE` - создает объект и сохраняет в бд в случае ORM; используется по умолчанию)

[//]: # ()
[//]: # (```python)

[//]: # (OrderFactory&#40;&#41;)

[//]: # (OrderFactory.create&#40;&#41;)

[//]: # (```)

[//]: # ()
[//]: # (- `BUILD` - создает объект и ничего больше; удобно когда нужно сгенерить тестовые данные без вставки в бд, напр. для)

[//]: # (  валидации, обновления сущностей)

[//]: # ()
[//]: # (```python)

[//]: # (OrderFactory.build&#40;&#41;)

[//]: # (```)

[//]: # ()
[//]: # (---)
