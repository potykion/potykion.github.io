# openpyxl

## Что это?

[openpyxl](https://openpyxl.readthedocs.io/en/stable/) - лучшая либа для работы с Excel

## Как изменить ширину столбцов и высоту строк?

Ширина столбцов:

```python
sheet.column_dimensions['A'].width = 21
```

- Для получения буквы столбца помогает функция `openpyxl.utils.cell.get_column_letter`

Высота строк:

```python
sheet.row_dimensions[2].width = 53
```
