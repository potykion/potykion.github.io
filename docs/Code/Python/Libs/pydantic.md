# pydantic

[pydantic]() - топ либа

## [Валидаторы](https://docs.pydantic.dev/usage/validators/)

- Всегда надо вернуть какое-то значение или `ValueError` / `AssertionError`

```python
class UserModel(BaseModel):
    name: str

    @validator('name')
    def name_must_contain_space(cls, v, values, **kwargs):
        if ' ' not in v:
            raise ValueError('must contain a space')
        return v.title()
```

- `v` - значение поля
- `values` - словарь других полей
    - **ВАЖНО:** в словаре будут лишь те поля, которые находятся выше целевого поля:

    ```python
    class Model(BaseModel):
        field_1: str
        field_2: str
        field_3: str
    
        @validator('field_2')
        def validate_field_2(cls, v, values):
            # values = {'field_1': ...} <- field_3 тут не будет
            ...
    ```

- `@validator(..., pre=True)` - валидатор будет вызван перед основной валидацией; полезно, когда нужно сделать парсинг:

    ```python
    class DemoModel(BaseModel):
        square_numbers: List[int] = []
    
        @validator('square_numbers', pre=True)
        def split_str(cls, v):
            if isinstance(v, str):
                return v.split('|')
            return v
    ```

    - ^ то есть `square_numbers` - это список интов, но можно передать и строку, которая распарсится в список
- `@validator(..., always=True)` - запуск валидатора, даже если поле не заполнено; полезно, когда нужно собрать значение по
  умолчанию из
  других полей (=> используем вместе с `values`)
    - Хотя для простых ситуаций лучше использовать `Field(default_factory=...)`
    - А для комплексных - `@root_validator`:

      ```python
      @root_validator
      def set_payment_schema_info_from_agreement(cls, values):
          if not values.get('payment_schema_info') and values.get('agreement'):
              values['payment_schema_info'] = PaymentSchemaInfo.from_agreement(values['agreement'])
    
          return values 
      ```
  
