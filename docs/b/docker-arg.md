---
tags:
  - ops
---

# `ARG` в `Dockerfile`

- `ARG` - енв, который передается на этап сборки, используя `docker build --build-arg KEY=VALUE`
- `ARG DATABASE_URL`
- Юзкейс: запуск миграций во время сборки