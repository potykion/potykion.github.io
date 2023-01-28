# Скрипты в Linux (.sh)

## О чем речь?

- Как писать скрипты с расширением `.sh` aka shell-скрипты, bash-скрипты
- Как пользоваться Unix-утилитами, типа `cd`, `date`

## Как узнать дату?

- `date` - текущее время
- `date +"%Z %z"` - таймзона

## Как сменить директорию, если Permission denied?

```sh
sudo su
cd path/to/dir
```

[Источник](https://stackoverflow.com/questions/8221820/cd-into-directory-without-having-permission)

## Как пользоваться переменными среды?

- Для чтения используем `$`: `$PORT`
    - Можно выставить значение по умолчанию,
      используя `-`: `${PORT:-8000}` ([Источник](https://stackoverflow.com/a/2013589/5500609))

## Как передавать параметры?

Использовать `$` и индекс:

```shell
poetry add $0
```
