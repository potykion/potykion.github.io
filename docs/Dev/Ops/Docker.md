# Docker

## Как посмотреть логи?

Смотрим конфиг контейнера:

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
