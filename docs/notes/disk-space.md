---
tags:
  - ops
---

# Оптимизло диска

## Как посмотреть сколько места осталось?

### df

Эта команда показывает сколько места осталось на машинке:

```
df -h

Filesystem      Size  Used Avail Use% Mounted on
udev            2.0G     0  2.0G   0% /dev
tmpfs           395M  8.4M  387M   3% /run
/dev/vda2        13G  8.5G  3.8G  70% /
tmpfs           2.0G     0  2.0G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           2.0G     0  2.0G   0% /sys/fs/cgroup
tmpfs           395M     0  395M   0% /run/user/1000
```

Видим, что корневая директория (`/`) занимает больше всего места. Глянем что там внутри

### du

Эта команда показывает сколько места занимает каждая директория внутри директории:

```
sudo du -h / --max-depth=1

36K     /root
4.0K    /mnt
1.8G    /home
6.2G    /var
12M     /bin
26M     /tmp
8.0K    /media
107M    /boot
837M    /lib
0       /sys
31M     /opt
4.0K    /lib64
1.6G    /usr
16K     /lost+found
4.0K    /srv
8.5M    /run
4.8M    /etc
0       /dev
0       /proc
8.5M    /sbin
11G     /
```

Видим, что больше всего места занимает директория `/var`, заглянем туда:

```
sudo du -h /var --max-depth=1

1.4M    /var/backups
4.0K    /var/local
20K     /var/tmp
4.0K    /var/mail
5.8G    /var/lib
180K    /var/opt
16K     /var/spool
210M    /var/cache
137M    /var/log
6.2G    /var
```

Видим, что `/var/lib` много занимает, залезем еще глубже:

```
sudo du -h /var/lib --max-depth=1

24K     /var/lib/emacsen-common
12K     /var/lib/private
288K    /var/lib/cloud
5.6G    /var/lib/docker
4.0K    /var/lib/dhcp
31M     /var/lib/dpkg
300K    /var/lib/containerd
8.0K    /var/lib/ispell
12M     /var/lib/mlocate
196M    /var/lib/apt
12K     /var/lib/AccountsService
12K     /var/lib/initramfs-tools
28K     /var/lib/pam
544K    /var/lib/usbutils
12K     /var/lib/locales
96K     /var/lib/ucf
296K    /var/lib/systemd
16K     /var/lib/dictionaries-common
16K     /var/lib/polkit-1
12K     /var/lib/grub
12K     /var/lib/update-manager
5.8G    /var/lib
```

Видим, что Docker много места занимает, ща перейдем к нему, но сначала еще пару слов о частых жирных директориях

### /var/log/journal

Я не сохранил лог про эту директорию, но, траст ми, она была жирной. И на стеке есть даже
вопрос [че эта директория такая жирная](https://askubuntu.com/questions/1238214/big-var-log-journal), ну и лечется это
так:

```
journalctl --vacuum-size=100M
```

Так что есть смысл чекнуть эту директорию и почистить ее.

Все, возвращаемся к Докеру

## Docker

### docker system df

Для Докера есть свой
аналог [команды, показывающей занятое место](https://docs.docker.com/engine/reference/commandline/system_df/):

```
docker system df -v

Images space usage:

REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE                SHARED SIZE         UNIQUE SIZE         CONTAINERS
rbcn_legals_server    latest              54a550fee267        19 hours ago        1.704GB             0B                  1.704GB             1
rbcn_legals_stunnel   latest              77785c6d80cd        19 hours ago        158.5MB             0B                  158.5MB             1
rbcn_legals_front     latest              33938bf871fe        19 hours ago        132.3MB             0B                  132.3MB             1
traefik               latest              77d3b9e70c48        2 months ago        92.04MB             0B                  92.04MB             1

Containers space usage:

CONTAINER ID        IMAGE                 COMMAND                  LOCAL VOLUMES       SIZE                CREATED             STATUS              NAMES
00fc0f3d1fe1        rbcn_legals_front     "nginx -g 'daemon of…"   0                   2B                  19 hours ago        Up 19 hours         rbcn_legals_front_1
133f5d847aa2        rbcn_legals_server    "/bin/sh -c 'poetry …"   0                   1.67MB              19 hours ago        Up 19 hours         rbcn_legals_server_1
f69f214f4961        rbcn_legals_stunnel   "/bin/sh -c '/opt/cp…"   0                   899B                19 hours ago        Up 19 hours         rbcn_legals_stunnel_1
355556a13591        traefik               "/entrypoint.sh --pr…"   1                   0B                  2 months ago        Up 2 months         rbcn_legals_traefik_1

Local Volumes space usage:

VOLUME NAME                               LINKS               SIZE
rbcn_legals_traefik-public-certificates   1                   15.96kB

Build cache usage: 0B

CACHE ID            CACHE TYPE          SIZE                CREATED             LAST USED           USAGE               SHARED
```

У меня здесь все чистенько (хотя серверный имедж жирноват), а у вас может быть нет.

Имеется в виду, то, что у меня всего 4 имеджа и все используются.

А может так, что много имеджей лежит без дела, и они просто занимают место:

```
docker system df -v

Images space usage:

REPOSITORY            TAG       IMAGE ID       CREATED         SIZE      SHARED SIZE   UNIQUE SIZE   CONTAINERS
<none>                <none>    797da5dbd450   2 months ago    158.6MB   72.78MB       85.81MB       0
<none>                <none>    3b60b43d10d4   2 months ago    158.6MB   72.78MB       85.82MB       0
<none>                <none>    2f1e6d19b586   2 months ago    158.6MB   72.78MB       85.81MB       0
<none>                <none>    ed05c8257097   2 months ago    158.6MB   72.78MB       85.81MB       0
<none>                <none>    da322046ebd4   3 months ago    1.653GB   1.224GB       428.9MB       0
<none>                <none>    446ffe4e6819   3 months ago    1.653GB   1.224GB       428.9MB       0
<none>                <none>    e54c6911174c   3 months ago    158.6MB   158.6MB       8.502kB       0
<none>                <none>    725e316bbe89   3 months ago    1.602GB   1.224GB       377.7MB       0
<none>                <none>    96614d543534   3 months ago    158.6MB   158.6MB       8.502kB       0
<none>                <none>    0305eeb39a68   3 months ago    1.602GB   1.224GB       377.7MB       0
...
```

### docker system prune

Такое дело тоже нужно подчищать:

```
docker system prune -a
```

Эта [команда](https://docs.docker.com/engine/reference/commandline/system_prune/) удаляет все неиспользуемые контейнеры
и имеджи.

Я прогнал эту команду у себя на ноуте, получил простыню, типа такой:

```
Deleted Containers:
c9804dc9ae2efff752ce11d9f5399a6c2036cf468e95a5d1f10a88e7355af7bf
bff1fa272c698ebd1cc70d579efc47dd12ae8c67e8c9be5ebd82be69809b8ab6
cdfc012534bb1db0ac67d5a931af308006af852626f49cbf8547835ef08c1035
249d90e26a92138f3db9c946dfcff239fd6225e44ed6ad6591d3ba4c99331074
cd5e984e38e70a4af94a467cce5b473c929f3f7c72125891ae2d662e86d75742
eb81a37a7ca0688faf623b6c8f26f9caf4f3311edf240f2049ce81bea17685c3
4ab0491a9de79c0d9fc7cdc6e38e43c073c983e7dc2a53839e0aa8d63c281c2e

Deleted Images:
deleted: sha256:85813dd6c0a75afb36af44354f6140eb622b6f7ff5f92e116eda147e5ed97226
deleted: sha256:b8086aad339e150fa5e9240ac815677875fc65fb8a3ee5ca7deb8f603e33036d
deleted: sha256:740049f94794d34f88b0fc1c4937be2e8b4a8d6dc1ae8aa3f14aa850fd9f9423
```

А также приятное сообщение в конце:

```
Total reclaimed space: 20.05GB
```

Ну и, соответственно, при каждом деплое такую команду стоит прогонять (с опцией `-f` для запуска без запроса
подтверждения)

### Оптимизация образов

- Анализировать слои с помощью [pycharm](https://www.jetbrains.com/help/pycharm/docker.html#managing-images)

![img.png](idea-docker-layers.png)

- Анализировать слои с помощью [dive](https://github.com/wagoodman/dive)

![img_1.png](dive.png)

- dive и pycharm отображают вложенные слои, так что стоит начать смотреть на слои после команды FROM из dockerfile
- dive и pycharm по функционалу одинаковы, однако в dive есть метрика Image efficiency score - если она 99%, то очевидно
  нечего оптимайзить

- Если нечего оптимайзить, то стоит обратить внимание на базовые имеджи
    - Напр. образ python:3.8 весит почти гиг
    - Существуют slim и alpine версии базовых имеджей, которые весят порой на порядок меньше, но с ними нужно аккуратно,
      тк каких-то зависимостей, которые используются неявно, может не хватать

## Еще пара рекомендаций

### Юзать CDN

Если в приложении есть функционал загрузки файлов, то лучше хранить файлы в CDN.

CDN - content delivery network - что-то типа хранилище статики (картинок, документов и тд).

Если заливать файлы на CDN, то они не будут занимать место на машинке + не надо будет морочиться с сервом статики.
CDN будет эффективно предоставлять доступ к файлам + для любого файла можно сгенерить ссылку на скачивание.

Примеры CDN: [Amazon S3](https://aws.amazon.com/ru/s3/)
, [Yandex Object Storage](https://cloud.yandex.ru/services/storage)
, [Google Cloud Storage](https://cloud.google.com/storage)

### Юзать Docker Registry

- Аналогично тому, что хранить файлы на вмке - не оч - собирать и хранить образы на вмке - тоже идея не оч
- Для хранение Docker образов лучше использовать Docker Registry
- Примеры: [Docker Hub](https://hub.docker.com/)
  , [Yandex Container Registry](https://cloud.yandex.com/en-ru/docs/container-registry/quickstart/)

