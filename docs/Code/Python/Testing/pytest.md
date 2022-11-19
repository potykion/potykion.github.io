# pytest

## Как быть когда в ошибке трейс не отображается полностью?

Пример:

```
...
    my_conftestmodules = pm._getconftestmodules(fspath)
.venv2\lib\site-packages\_pytest\config\__init__.py:431: in _getconftestmodules
    mod = self._importconftest(conftestpath.realpath())
.venv2\lib\site-packages\_pytest\config\__init__.py:470: in _importconftest
    raise ConftestImportFailure(conftestpath, sys.exc_info())
ConftestImportFailure: (local('C:\\Users\\potyk\\PycharmProjects\\automation-gae\\reborn_lol\\notifications_\\order_\\tests\\email_\\conftest.py'), (<type 'exceptions.ImportError'>, ImportError('No module named config.config',), <traceback object at 0x00000000093572C8>))
```

Из примера выше не оч понятно где конкртено ошибка, чтобы увидеть трейс полностью нам надо:

1. Поставить брейкпоинт на месте ошибки: `.venv2\lib\site-packages\_pytest\config\__init__.py:470`
2. Распечатать трейсбек руками: `traceback.extract_tb(sys.exc_traceback)`