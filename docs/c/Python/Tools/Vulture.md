# Vulture

- [Vulture](https://github.com/jendrikseipp/vulture) - тулза для поиска мертвого (неиспользуемого) кода
- Код, который Vulture считает мертвым, присваивается `confidence`
- Метрику `confidence` можно игнорить - 60% часто означает что код реально неиспользуется - делать трешхолд на 61+
  бессмысленно

## Запуск

- `pip install vulture`
- `vulture {path_to_dir/path_to_file}`
- `vulture`, если есть конфиг

## Конфиг

```toml
[tool.vulture]
# Сортируем неиспользуемый код по размеру
# Так, переменная занимает 1 строку,
#   а неиспользуемый класс может занимать много строк
sort_by_size = true
# Где запускать vulture: файлы и директории
paths = [
    "methods",
    "handlers",
    "models",
    "main.py",
    # Вайтлисты тоже надо передавать при запуске    
    "vulture_whitelists",
]
# Что игнорить: файлы и директории
exclude = ["reborn_lol/reports_and_scripts"]
# Что игнорить: название методов и переменных
ignore_names = ["post", "_post_put_hook"]
```

## Вайтлисты

- Vulture считает некоторый код неиспользуемым, но сохранить такой код надо
- Один из способов сказать Vulture проигнорить такой код - создать whitelist
- `vulture {path_to_file} --make-whitelist > whitelist.py`
- Очевидно, такой файл будет не один, так что лучше сделать папочку - `vulture_whitelists`
- `vulture {path_to_file} --make-whitelist > vulture_whitelists/{path_to_file}.py`

## Стоит ли использовать?

- Слепо - нет - много false-positive
- Но есть гибкая система игноров false-positive, так что тулза лучше, чем искать неиспользуемый код руками
