---
tags:
  - ops
---

# Как различать релизы Docker-имеджей?

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
