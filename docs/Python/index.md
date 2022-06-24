# Python

## Что это?

- https://www.python.org/
- Язык программирования, обычно используется для веб-разработки и ML

### Чем хорош?

- Простой синтаксис
- Много тулов на все случаи жизни: от веб-фреймворков до генераторов документации, от игр до научных библиотек
- Тулы приятные: FastAPI - приятный фреймворк для веба; pytest - приятный фреймворк для тестирования

### Чем плох?

- Динамическая типизация: ide не понимает как искать использования методов и показывает все использования
- Не очень хорошие лямбды: ide не понимает что в них передается
- Python жрет много памяти и медленно робит (хотя для веба не очень актуально)
- Куча способов управления зависимостями: pip, poetry, pipenv
- Библиотеки не всегда легко ставятся: иногда приходится искать какие-то сборки; иногда самому надо компилить
- Python 2: проблемы со строками, слабая совместимость с Python 3
- В новых версиях Python старые либы могут просто перестать робить, и нужно ждать фиксы от разрабов либ или писать
  самому
- Асинхронщина дает прирост произодительности, но и прирост mind-blowing багов

---

## База

### Как форматировать числа со знаками после запятой?

```python
a = 13.946
assert "{:.2f}".format(a) == '13.95'
assert format(a, '.2f') == '13.95'
assert f"{a:.2f}" == '13.95'  # py3.6+
```

## База по Python 2

### Как сделать unicode-строку из str-строки?

```python
assert 'oppa'.decode('utf-8') == u'oppa'
```

### Как сделать str-строку из unicode-строки?

```python
assert u'oppa'.encode('utf-8') == 'oppa'
```