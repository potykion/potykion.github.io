# Пагинация

## Как делать?

Выставить `pagination_class` у вьюхи:

```python
from rest_framework.pagination import LimitOffsetPagination


class ContrastwEnhancementViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.StaticTokenPermission,)
    serializer_class = serializers.ContrastEnhancementSerializer
    queryset = models.ContrastEnhancement.objects.all()
    pagination_class = LimitOffsetPagination
```

## Как написать свою?

Отнаследоваться:

```python
from rest_framework.pagination import LimitOffsetPagination


class ApiExternalLimitOffsetPaginator(LimitOffsetPagination):
    max_limit = 100

    def get_limit(self, request):
        cur_max_limit = self.max_limit
        # Выставляем max_limit = None, чтобы limit не обрезался в get_limit
        self.max_limit = None
        limit = super(ApiExternalLimitOffsetPaginator, self).get_limit(request)
        self.max_limit = cur_max_limit

        if limit > cur_max_limit:
            from rest_framework.exceptions import ValidationError
            raise ValidationError(f'limit не может быть больше {self.max_limit}')

        return limit

```

- Здесь выставили `max_limit` чтобы нельзя было запрашивать больше 100 сущностей
- Переопределили `get_limit` чтобы если лимит больше 100, то вывод ошибки происходит

## Как настраивается глобально?

В `settings` в `REST_FRAMEWORK`:

```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 100,
}
```

## Ссылочки

- [Pagination - Django REST framework](https://www.django-rest-framework.org/api-guide/pagination/)
