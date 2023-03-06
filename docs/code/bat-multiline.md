---
 tags:
   - bat
---


# Как сделать многострочную команду

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
