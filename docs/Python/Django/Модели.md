# Модели

## Даты

### Как сделать дату = дате создания?

```python
from django.db import models

models.DateTimeField(auto_now_add=True)
```

Дата выставляется один раз при первом сохранении, изменить/прописать произвольную нельзя

Если планируется выставлять кастомную дату создания (напр. в тестах), то лучше использовать default:

```python
from django.db import models
from django.utils import timezone

models.DateTimeField(default=timezone.now)
```

### Как сделать дату = дате последнего обновления?

```python
from django.db import models

models.DateTimeField(auto_now=True)
```

## Как получить енам в виде строки?

Использовать метод `get_{field}_display`:

```python
from django.db import models


class Visit(models.Model):
    class TreatmentCase:
        primary = 1
        repeated = 2

        choices = [
            (primary, 'Первичный'),
            (repeated, 'Повторный'),
        ]

    treatment_case = models.PositiveSmallIntegerField(
        choices=TreatmentCase.choices,
    )


v = Visit(treatment_case=Visit.TreatmentCase.primary)
assert v.get_treatment_case_display() == 'Первичный'
```

## Как сделать 2 поля, ссылающихся на 1 модель?

Представим такую ситуацию ситуация:

```python
class Abs(models.Model):
    a = models.ForeignKey(A)
    many_a = models.ManyToManyField(A)

    class Meta:
        abstract = True

class B(Abs):
    ...

class C(Abs):
    ...
```

- Есть абстрактный-класс `Abs` у него изначально было поле `a`
- Есть классы `B`, `C` - наследники `Abs`
- И вот мы добавили поле `many_a`, и при создании миграции получаем такое:

```text
ERRORS:
B.many_a: (fields.E304) Reverse accessor for 'B.many_a' clashes with reverse accessor for 'C.many_a'.
        HINT: Add or change a related_name argument to the definition for 'B.many_a' or 'C.many_a'.
```

Чтобы эту ошибку исправить, нужно ее прочитать. В ней говорится, что нужно выставить `related_name` - что мы и сделаем:

```python
class Abs(models.Model):
    a = models.ForeignKey(A)
    many_a = models.ManyToManyField(A, related_name='%(class)s_a',)

    class Meta:
        abstract = True

class B(Abs):
    ...

class C(Abs):
    ...
```

Теперь у нас сгенерируется такая миграция:

```python
class Migration(migrations.Migration):
    operations = [
        migrations.AddField(
            model_name='b',
            name='many_a',
            field=models.ManyToManyField(related_name='b_msp', to='A'),
        ),
        migrations.AddField(
            model_name='c',
            name='many_a',
            field=models.ManyToManyField(related_name='c_msp', to='A'),
        ),
    ]
```

### Зачем это может пригодится?

Когда было отношение 1 - 1 (ForeignKey), а захотелось 1 - N (ManyToMany)

### Источники

- https://stackoverflow.com/questions/22538563/django-reverse-accessors-for-foreign-keys-clashing
- https://stackoverflow.com/questions/41595364/fields-e304-reverse-accessor-clashes-in-django


## Как работать с ManyToMany?

```python
# Добавление одной сущности - save вызывать не надо
model.many_to_many_f.add(r_model) 
```

## Как сделать GenericForeignKey?

```python
class AnyModel(models.Model):
    content_type = models.ForeignKey(
        ContentType,
        verbose_name=_('тип объекта'),
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )
    object_id = models.TextField(_('ID объекта'), blank=True, null=True, db_index=True)
    content_object = GenericForeignKey()
```

[Источник](https://stackoverflow.com/a/27912261/5500609)