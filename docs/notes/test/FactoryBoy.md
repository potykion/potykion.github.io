---
 tags:
   - py
---

# FactoryBoy

## Что это?

[Factoryboy](https://factoryboy.readthedocs.io/en/stable/) - либа для создания сущностей любой сложности для тестов (да
и вообще)

!!! note "Да и вообще?"

    Можно использовать factoryboy для создания данных для локальной бд и тестировать таким образом локалку (фронт поднять,
    посмотреть как выглядят данные с бека)

### Базовый пример

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

### Пример реальный

```python
RuFaker = partial(factory.Faker, locale='ru_RU')


class _AgreementFactory(factory.Factory):
    class Meta:
        model = Agreement

    now = factory.fuzzy.FuzzyDate(dt.date(2022, 1, 1))
    app_name = RuFaker('word')
    agreement_number = factory.LazyAttribute(
        lambda a: f'{a.app_name[:3].upper()}/{a.now.year}/1-1'
    )
    address = RuFaker('address')
    legal_address = RuFaker('address')
    postal_address = RuFaker('address')
    phones = factory.List([
        RuFaker('phone_number'),
    ])
    services = factory.List([
        Service.app(order_fee=[OrderFee.card(percent=3)]),
        Service.web(order_fee=[OrderFee.cash(percent=3)]),
        Service.vk(company_fee=100),
        Service.tg(venue_fee=200),
    ])
    kpp = RuFaker('kpp')
    okato = '45 000 000 000'
    bank = RuFaker('bank')
    bank_account = RuFaker('checking_account')
    cor_account = RuFaker('correspondent_account')
    bik = RuFaker('bic')
    based_on = factory.fuzzy.FuzzyChoice(BasedOn.__members__.values())
    attorney = factory.LazyAttribute(lambda a: '1488' if a.based_on == BasedOn.attorney else '')
    tax_mode = factory.fuzzy.FuzzyChoice(TaxMode.__members__.values())

```

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

- [faker](https://faker.readthedocs.io/en/master/) - либа для генерации рандомных данных
- Примечательно, что есть [Localized Providers](https://faker.readthedocs.io/en/master/locales.html) - локализованные
  генераторы рандомных данных, напр. [русские](https://faker.readthedocs.io/en/master/locales/ru_RU.html)
- В factoryboy есть встроенная интеграция с faker:

```python
address = factory.Faker('street_address', locale='ru_RU')
```

#### Текст

```python
factory.Faker('text', max_nb_chars=200)
```

### Mimesis (смысла нет)

- [mimesis](https://mimesis.name/en/master/) - альтернатива faker
- Есть штуки, которых нет в факере,
  типа [паспортных данных](https://mimesis.name/en/master/api.html#mimesis.builtins.RussiaSpecProvider.series_and_number)
  и [даже политических координат)))](https://mimesis.name/en/master/api.html#mimesis.Person.political_views)
- Есть [интеграция с factory_boy](https://github.com/lk-geimfari/mimesis-factory),
  но [на нее забили](https://github.com/lk-geimfari/mimesis-factory/issues/245) => смысла в mimesis нет =\

### Как сделать seed для рандома?

- Устанавливая seed рандому, рандом будет предсказуемым
- `factory.random.reseed_random('my awesome project')`

---

## Как сгенерить не сущность, а словарь?

```python

factory.build(dict, FACTORY_CLASS=UserFactory)

```

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

!!! warning "ВАЖНО"

    Возврат `post_generation` никак не обрабатывается => возвращать объект бессмысленно, только мутировать

### Что за параметр `create`?

- FactoryBoy умеет создавать объекты в 2 режимах (strategy): `create` и `build`
- Параметр `create` = `True`, если объект создан в режиме `create`; `False` - иначе

### Режимы создания объектов

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

### Как еще можно использовать `post_generation`?

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

## pytest-factoryboy

- [pytest-factoryboy](https://pytest-factoryboy.readthedocs.io/en/stable/) - pytest плагин для работы с factoryboy
- Ну ето магия уже жёсткая
- Пакет добавляет функцию `register`, в которую передаем фабрику (вызов функции с передачей фабрики делаем
  в `conftest.py`),
  и в любом тесте можно юзать инстанц фабрики как underscore-фикстуру
- Типа определил фабрику `OrderFactory`, вызвал `register(OrderFactory)` в `conftest.py` и в любом тесте можно юзать
  фабричный инстанц как фикстуру `order`

### Наблюдения

#### Именование

- Нужно быть акуратнее с именами, иначе могут быть конфликты с фикстурами из других либ
- Так если вызвать `register(ClientFactory)`, и использовать `pytest-flask`, то будет конфликт фикстур `client`
- В таких ситуациях помогает вызов `register` с параметром `_name`: `register(ClientFactory, _name='mobile_client`)`

#### Списки

- `factory.List` [не поддерживаются](https://github.com/pytest-dev/pytest-factoryboy/issues/67)
- Обойти это можно, используя many2many-метод: прописать `post_generation` для поля:

  ```python
    @post_generation
    def children(self, create, extracted, **kwargs):
        if extracted:
            self.children = extracted
        else:
            self.children = [ChildFactory() for _ in range(2)]
  ```

    - В этом примере, вместо `children = factory.List([SubFactory(ChildFactory) for _ in range(2)])`
      используем `post_generaion`