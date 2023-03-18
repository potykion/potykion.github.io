---
 tags:
   - shell
---

# Справ очка по .bat скриптам 

```bat
REM REM - используем для комментариев

REM CALL - используем для запуска нескольких команд
REM https://superuser.com/a/175813
CALL gcloud app deploy app.yaml
CALL gcloud app deploy app_admin.yaml

REM %{number} - используем для порядковых аргументов
poetry version %1

REM ^ - используем чтобы разбить команду на несколько строк
REM https://stackoverflow.com/a/69079/5500609
yc serverless container revision deploy ^
--container-id container-id ^
--image cr.yandex/registry/image ^
--service-account-id account-id ^
--execution-timeout 5s ^
--min-instances 1

REM %userprofile% - используем для получение директории юзера
REM https://stackoverflow.com/a/9229022/5500609
%userprofile%

```

## Cheatsheet

<embed alt="bat_cheatsheet" src="/a/bat_cheatsheet.pdf" width="100%" height="800px"  />
