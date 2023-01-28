# Docker

## Как различать релизы имеджей?

> Что за buster, bullseye, stretch, jessie?

Это [релизы Debian](https://hub.docker.com/_/debian), которые используются в качестве основы для большинства имеджей:

- `jessie` - 8 версия Debian
- `stretch` - 9
- `buster` - 10
- `bullseye` - 11
- `bookworm` - 12

> Че за alpine, slim?

- `slim` - как обычный имедж, только поменьше
- `alpine` - вообще маленький имедж, жестб - хотя с ним часто проблемы непонятные возникают, типа чето недоустановлено

[Статья по теме](https://medium.com/swlh/alpine-slim-stretch-buster-jessie-bullseye-bookworm-what-are-the-differences-in-docker-62171ed4531d)

## Что делать если возникают проблемы со сборкой Docker-образов?

- Общий совет: если что-то перестало собираться, возможно, дело в том, что используются latest-images - image без
  указания версии, напр. `FROM ubuntu`
- Лечится изменением версии: откат к предыдущей версии, или апгрейд до новой
- Какая версия является последней можно на DockerHub - ищи image с версией latest
- Напр. [ubuntu](https://hub.docker.com/_/ubuntu): latest-версией на 2022-06-01
  является: `22.04, jammy-20220428 jammy, latest, rolling`
- Еще бывает такое, что latest-версия на Windows-докере отличается от Linux-докера - хз поч, но стоит иметь в виду

## Как посмотреть логи?

```shell
docker logs --timestamps {container}
```

Или можно посмотреть файлы, для этого смотрим конфиг контейнера:

```sh
# Или через vscode
> docker inspect {container}
{
    "Id": "e036407d335a50c0135fc5a75364891741187cfd7f88a87b916845fa3ac1799b",
    "Created": "2022-07-07T08:30:13.9717449Z",
    "Path": "docker-entrypoint.sh",
    "Args": [...],
    "State": {...},
    "Image": "sha256:c53741b09800398af2b0f550ab66ddb000f45a2babc1e7f804d76604605787d7",
    "ResolvConfPath": "/var/lib/docker/containers/e036407d335a50c0135fc5a75364891741187cfd7f88a87b916845fa3ac1799b/resolv.conf",
    "HostnamePath": "/var/lib/docker/containers/e036407d335a50c0135fc5a75364891741187cfd7f88a87b916845fa3ac1799b/hostname",
    "HostsPath": "/var/lib/docker/containers/e036407d335a50c0135fc5a75364891741187cfd7f88a87b916845fa3ac1799b/hosts",
    "LogPath": "/var/lib/docker/containers/e036407d335a50c0135fc5a75364891741187cfd7f88a87b916845fa3ac1799b/e036407d335a50c0135fc5a75364891741187cfd7f88a87b916845fa3ac1799b-json.log",
    ...
}
```

Интересует `LogPath` - это путь к логам контейнера

[Источник](https://stackoverflow.com/questions/33017329/where-is-a-log-file-with-logs-from-a-container)

## `ARG`

- `ARG` - инструкция в `Dockerfile`
- `ARG` - енв, который передается на этап сборки, используя `docker build --build-arg KEY=VALUE`
- `ARG DATABASE_URL`
- Юзкейс: запуск миграций во время сборки