# Linux

## Как узнать дату?

- `date` - текущее время
- `date +"%Z %z"` - таймзона

## Как сменить директорию, если Permission denied?

```sh
sudo su
cd path/to/dir
```

[Источник](https://stackoverflow.com/questions/8221820/cd-into-directory-without-having-permission)

## Как получить значение переменной среды?

Использовать `$`: `$PORT`

## Как выставить значение переменной среды по умолчанию?

Использовать `-`: `${PORT:-8000}`

[Источник](https://stackoverflow.com/a/2013589/5500609)