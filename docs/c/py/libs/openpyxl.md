# openpyxl

## Что это?

[openpyxl](https://openpyxl.readthedocs.io/en/stable/) - лучшая либа для работы с Excel

## Книга / Workbook

`openpyxl.Workbook` - книга - полный эксель-файл, со всеми вкладочками и мета-инфой

### Пустая книга

```python
from openpyxl import Workbook

wb = Workbook()
```

### Книга из файла

```python
from openpyxl import load_workbook

wb = load_workbook("path/to/file.xlsx")
```

Можно передавать file-like объекты, напр. `io.BytesIO`:

```python
wb = load_workbook(io.BytesIO(...))
```

### Сохранение в файл

```python
wb.save("path/to/file.xlsx")
```

### Сохранение в bytes

Удобно, когда нужно отдать эксель наружу, напр. в ответе на запрос:

```python
import io

stream = io.BytesIO()
wb.save(stream)
raw: bytes = stream.getvalue()
```

## Лист / Worksheet

`openpyxl.worksheet.worksheet.Worksheet` - лист / вкладка / страница эксель-файла

### Первый лист

```python
sheet = wb.active
```

### Лист по имени

```python
sheet = wb["sheet-name"]
```

### Создание листа

```python
wb.create_sheet("sheet-name")
```

## Ячейка / Cell

- `openpyxl.cell.Cell` - ячейка
- Нумеруются с 1: ячейка A1 имеет координаты (1, 1)

*(считаем, что `sheet = wb.active`)*

### Получение ячейки

```python
cell = sheet.cell(row=1, column=1)
cell = sheet['A1']
```

### Выставление значения

```python
sheet.cell(row=1, column=1, value='val')
sheet.cell(row=1, column=1).value = 'val'
```

### Строка

- Как таковой сущности Строка нет
- В openpyxl строка - это массив ячеек:

```python
rows: Iterable[Tuple[Cell, ...]] = sheet.rows
```

### Ячейки в промежутке

```python
cells = sheet['A1:B2']
```

### Объединение ячеек

```python
sheet.merge_cells(
    start_row=1, start_col=1,
    end_row=2, end_column=2
)
```

Код выше объединяет ячейки A1, A2, B1, B2

## Стилизовочка

- *(считаем, что `cell = sheet.cell(row, col)` и `from openpyxl.styles import *`)*
- Все импорты из `openpyxl.styles`

### Жирный шрифт

```python
cell.font = Font(bold=True)
```

### Границы

```python
side = Side(style='thin', color='000000')
cell.border = Border(left=side, top=side, right=side, bottom=side)
```

### Выравнивание по центру

```python
cell.alignment = Alignment(
    horizontal='center',
    vertical='center',
)
```

### Перенос текста

```python
cell.alignment = Alignment(
    wrap_text=True,
)
```

### Заливка / цвет бекграунда

```python
color = 'D0F5A9'
cell.fill = PatternFill(
    start_color=Color(color), end_color=Color(color),
    fill_type='solid',
)
```

### Стили и объединение ячеек

Если требуется применить стили для объединенных ячеек,
то лучше применить стиль для одной ячейки, а затем произвести объединение

### Как изменить ширину столбцов и высоту строк?

Ширина столбцов:

```python
sheet.column_dimensions['A'].width = 21
```

Для получения буквы столбца помогает функция `openpyxl.utils.cell.get_column_letter`

```python
>> > openpyxl.utils.cell.get_column_letter(1)
'A'
```

Высота строк:

```python
sheet.row_dimensions[2].width = 53
```

#### Установка ширины под размер контента

- [Источник](https://stackoverflow.com/q/39529662/5500609)

```python
from openpyxl.cell import MergedCell


def adjust_cols(sheet):
    for column_cells in sheet.columns:
        length = max(len(str(cell.value)) for cell in column_cells)

        # Определяем букву колонки по первой необъединенной ячейке
        col_letter = next((
            cell.column_letter
            for cell in column_cells
            if not isinstance(cell, MergedCell)
        ))

        # Значение 1.1 подобрано опытным путем
        sheet.column_dimensions[col_letter].width = length * 1.1
```

## Сложный эксель

Когда нужно сформировать сложный эксель файл, то код быстро превращается в такое:

```python
sheet.cell(row=2, column=col).value = _('Всего назначено')
sheet.cell(row=2, column=col).style = self.bold_font_thin_border
sheet.merge_cells(start_row=2, start_column=col, end_row=3, end_column=col)
sheet.cell(row=2, column=col + 1).value = _('Исследований')
sheet.cell(row=2, column=col + 1).style = self.bold_font_thin_border
sheet.merge_cells(start_row=2, start_column=col + 1, end_row=2, end_column=col + 1 + 1)
sheet.cell(row=2, column=col + 3).value = _('Визитов')
sheet.cell(row=2, column=col + 3).style = self.bold_font_thin_border
sheet.merge_cells(start_row=2, start_column=col + 3, end_row=2, end_column=col + 3 + 8)
sheet.cell(row=2, column=col + 12).value = _('Всего услуг')
sheet.cell(row=2, column=col + 12).style = self.bold_font_thin_border
sheet.merge_cells(start_row=2, start_column=col + 12, end_row=3, end_column=col + 12)
```

А если еще if-ами приправить, то становится совсем не читаемо

Для решения этой проблемы, я использую 2 подхода: абстракция или декларативный подход

### Абстракция

- Просто определяем класс, который делает все операции сразу
- У меня это выглядит так:

```python
import dataclasses
from typing import Any, Optional, Literal, Set, Dict
import openpyxl.worksheet.worksheet
from openpyxl.styles import Font, Alignment, Side, Border, PatternFill
from openpyxl.styles.fills import FILL_PATTERN_GRAY125, FILL_SOLID

BorderSide = Literal['left', 'top', 'right', 'bottom']
BorderStyle = Literal['thin', 'thick', 'medium']
HorizontalAlignment = Literal['left', 'center', 'right']
VerticalAlignment = Literal['top', 'center', 'bottom']


@dataclasses.dataclass()
class FillCell:
    sheet: openpyxl.worksheet.worksheet.Worksheet
    row: int
    col: int
    val: Any
    bold: bool = False
    border: Optional[BorderStyle] = 'thin'
    border_sides: Optional[Set[BorderSide]] = None
    custom_borders: Optional[Dict[BorderSide, BorderStyle]] = None
    h_align: Optional[HorizontalAlignment] = None
    v_align: Optional[VerticalAlignment] = None
    wrap: bool = False
    font: str = 'Arial'
    font_size: int = 10
    pattern_fill: bool = False
    bg: Optional[str] = None
    as_number: bool = False

    def __call__(self) -> None:
        cell = self.sheet.cell(row=self.row, column=self.col)
        cell.value = self.val

        cell.font = Font(name=self.font, bold=self.bold, size=self.font_size)

        cell.alignment = Alignment(
            horizontal=self.h_align, vertical=self.v_align,
            wrap_text=self.wrap,
        )

        if self.border:
            side = Side(style=self.border, color='000000')

            sides = dict(left=side, top=side, right=side, bottom=side)
            if self.border_sides:
                sides = {bs: side for bs in self.border_sides}
            if self.custom_borders:
                sides.update({
                    bs: Side(style=side, color='000000')
                    for bs, side in self.custom_borders.items()
                })

            cell.border = Border(**sides)

        if self.pattern_fill:
            cell.fill = PatternFill(fill_type=FILL_PATTERN_GRAY125)

        if self.bg:
            cell.fill = PatternFill(
                start_color=self.bg, end_color=self.bg,
                fill_type=FILL_SOLID,
            )

        if self.as_number:
            cell.number_format = '0.00E+00'

```

- Далее вызываем код самым коротким образом:

```python
def _cell(self, row, col, val, **kwargs):
    return FillCell(self.sheet, row, col, val, **kwargs)()
```

### Декларативный подход

Декларативный подход, напр. html - гораздо приятнее использовать

```html

<table>
    <tbody>
    <tr>
        <td rowspan="2" style="border: 1px solid black; font-weight: bold">Всего назначено</td>
        <td colspan="2" style="border: 1px solid black; font-weight: bold">Исследований</td>
        <td colspan="8" style="border: 1px solid black; font-weight: bold">Визитов</td>
        <td rowspan="2" style="border: 1px solid black; font-weight: bold">Всего услуг</td>
    </tr>
    </tbody>
</table>
```

А поможет в генерации экселя из html *моя* библиотечка - [jinja2xlsx](https://github.com/potykion/jinja2xlsx):

```python
from jinja2xlsx import render_xlsx

workbook: openpyxl.Workbook = render_xlsx(html_str)
```

Библиотечка парсит html-таблицы в эксель-таблицы + применяет стили из `style` + объединяет ячейки,
согласно `rowspan/colspan` и тд.
