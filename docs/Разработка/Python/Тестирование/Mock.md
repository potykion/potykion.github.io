# mock

- mock - пакет для создания заглушек
- Напр. чтобы не кидать реальный http-запрос к какой-нибудь апишке, лучше замокать/застабить/написать заглушку - это
  дает предсказуемость и скорость

## Как мокать `assert_called_with`, если один из параметров - дичь или не важен?

Использовать `mock.ANY`

```python
assert_called_with(mock.ANY, ...)
```

## Моканье методов

### Как мокать методы у мок-объектов?

```python
dadata_service_mock = MagicMock()
get_houses_by_coordinates_mock = dadata_service_mock.get_houses_by_coordinates
get_houses_by_coordinates_mock.return_value = dadata_addresses

assert dadata_service_mock.get_houses_by_coordinates(*args, **kwargs) == dadata_addresses
```


## Очередность моков

- При использовании моков-декораторов, очередность моков происходит снизу вверх:

```python
@mock.patch('methods.push.send_client_push')
@mock.patch('methods.empatika_promos.deposit_user_points')
def test_deposit_points_or_cashback_for_points_positive(
    deposit_user_points_mock,  # type: mock.MagicMock  
    send_client_push_mock,  # type: mock.MagicMock  
    mock_gae
):
    ...
```

- Первым моком будет `deposit_user_points`
- Вторым моком будет `send_client_push`
- Дальше идут фикстуры
- *А еще можно вместо декоратора использовать контекст менеджеры*

## Разные моки при очередном вызове

- Напр. нужно сгенерировать разные uuid, или разные http-ответы

```python
@patch.object(uuid, 'uuid4', side_effect=TEST_UUIDS)
```

- Вместо передачи заглушки в `return_value`, передаем список заглушек в `side_effect`
- [Источник](https://stackoverflow.com/a/44405444/5500609)


