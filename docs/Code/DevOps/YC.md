# Yandex Cloud

## Serverless Containers

### Что это?

- [Serverless Containers](https://cloud.yandex.ru/services/serverless-containers) - сервис, позволяющий запускать
  Docker-контейнеры, не парясь об инфраструктуре
- То есть получаем простейший воркфлоу:
    - Создаем ServerlessContainers-контейнер/инстанц
    - Собираем Docker-образ - как обычно через docker build
    - Пушим его в Container-Registry - через docker push
    - Создаем новую версию / ревизию SC-контейнера

### Создание контейнера / инстанца

```shell
yc init
yc serverless container create --name {name}
# Выполняем, если хотим чтобы контейнер был публичным (доступным по http без необходимости авторизовываться)
yc serverless container allow-unauthenticated-invoke {name}
```

### Новая версия / ревизия

```shell
# id - айди ServerlessContainers-контейнера - получили выше 
# service_acc_id - айди сервисного аккаунта - получили выше
# cr_id - айди Container Registry (CR)
# image_name - название Docker-Image из CR
yc serverless container revision deploy --container-id {id} --image cr.yandex/{cr_id}/{image_name} --service-account-id {service_acc_id}
```

