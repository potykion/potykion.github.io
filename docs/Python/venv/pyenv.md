# pyenv

## Что это?

- [pyenv](https://github.com/pyenv/pyenv) - штука для управления версиями питона
- Удобно, когда нужно юзать питон 3.6 для одного проекта, питон 2 для другого и питон 3.9 для третьего
- Удобно тем, что все делается через единый интерфейс и все версии питона хранятся в одном месте

## Как использовать?

1. Ставим pyenv

    Для винды используем <https://pyenv-win.github.io/pyenv-win/>

2. Смотрим какие версии Python есть:

    ```sh
    pyenv install -l
    ```

3. Ставим Python:

    ```sh
    pyenv install 3.9.6
    ```

4. Активируем Python - это нужно для получения пути к интерпретатору:

    ```sh
    pyenv shell 3.9.6
    ```

5. Получаем путь к интерпретатору:

    ```sh
    pyenv which python
    ```

    Выведется примерно такая строка:

    ```cmd
    C:\Users\GANSOR\.pyenv\pyenv-win\versions\3.9.6\python.exe
    ```

Все! Теперь можно **использовать этот путь для создания venv** и радоваться новой версии Python.

## Где лежат версии питона?

```cmd
%userprofile%/.pyenv/pyenv-win/versions
```

- `%userprofile%` - директория пользователя, напр. `C:\Users\potyk`

## Что делать если pyenv is not recognized as an internal or external command?

- Бинарник расположен тут:

```cmd
%userprofile%/.pyenv/pyenv-win/bin/
```

- Соотвественно добавляем его в `PATH`
- Если он добавлен, то перемещаем этот путь в самый верх `PATH`
