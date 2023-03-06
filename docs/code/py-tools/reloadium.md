---
 tags:
   - py
---

# reloadium

- [reloadium](https://reloadium.io/) - hot-reload для pycharm
- То есть можно запустить тестик, поправить строчку, и код перезапускать не нужно - оно само

![reloadium.gif](reloadium.gif)

## Проблемы с запуском

### Для начала

- reloadium робит только с python [3.7, 3.10]
- reloadium робит только со старым интерфейсом pycharm
- При проблемах полезно выставить `RW_DEBUG=True`

### Неправильная версия

- При первом запуске проекта с python 3.9 словил такое:

```
Testing started at 10:08 AM ...
It seems like your platform or Python version are not supported yet.
Windows, Linux, macOS and Python 64 bit >= 3.7 (>= 3.9 for M1) <= 3.10 are currently supported.
Please submit a github issue if you believe Reloadium should be working on your system at
https://github.com/reloadware/reloadium
To see the exception run reloadium with environmental variable RW_DEBUG=True
Traceback (most recent call last):
  File "C:\Users\potyk\AppData\Local\Programs\Python\Python39\lib\runpy.py", line 188, in _run_module_as_main
    mod_name, mod_spec, code = _get_module_details(mod_name, _Error)
  File "C:\Users\potyk\AppData\Local\Programs\Python\Python39\lib\runpy.py", line 147, in _get_module_details
    return _get_module_details(pkg_main_name, error)
  File "C:\Users\potyk\AppData\Local\Programs\Python\Python39\lib\runpy.py", line 111, in _get_module_details
    __import__(pkg_name)
  File "C:\Users\potyk\.reloadium\package\3.7\reloadium\__init__.py", line 4, in <module>
    pre_import_check()
  File "C:\Users\potyk\.reloadium\package\3.7\reloadium\__utils__.py", line 21, in pre_import_check
    import reloadium.corium
ModuleNotFoundError: No module named 'reloadium.corium'

Process finished with exit code 1
```

- ^ Почему-то `reloadium` запустился для python 3.7, хотя проект на python 3.9
- Помогает [пересоздать venv](https://github.com/reloadware/reloadium/issues/78#issuecomment-1340200001)