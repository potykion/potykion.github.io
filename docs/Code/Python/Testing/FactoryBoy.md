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

Важно: если указать 1 аргумент, то число будет генерироваться в промежутке [0, number] - аккуратнее с проверками
типа `if not value`

Для промежутка, который начинается с 1, передаем 2 аргумента:

```python
value = factory.fuzzy.FuzzyInteger(1, 10)
```

## Как заполнить поле, используя функцию? Напр. `datetime.now`?

Использовать `LazyFunction`:

```python
start = factory.LazyFunction(dt.datetime.utcnow)
```

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