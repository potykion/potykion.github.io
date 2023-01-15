# Скрипты в Винде (.bat)

## О чем речь?

- Скрипты с расширением `.bat`

## Что делать если bat-ник запускает только 1 строку?

- Написать в каждой строке `CALL`
- [Источник](https://superuser.com/questions/175811/bat-file-only-the-first-line-is-being-executed-why)

## Как получить директорию пользователя / домашнюю директорию?

```shell
> %userprofile%
C:\Users\potyk
``` 

[Источник](https://stackoverflow.com/a/9229022/5500609)

## Как передавать параметры?

Использовать `%` и индекс:

```shell
poetry add %0
```

## Как сделать многострочную команду

Использовать `^`:

```bat
yc serverless container revision deploy ^
--container-id container-id ^
--image cr.yandex/registry/image ^
--service-account-id account-id ^
--execution-timeout 5s ^
--min-instances 1
```

[Источник](https://stackoverflow.com/a/69079/5500609)

## Как комменты писать?

Использовать `REM`

## Читшит

<embed alt="bat_cheatsheet" src="../../../assets/bat_cheatsheet.pdf" width="100%" height="800px"  />
