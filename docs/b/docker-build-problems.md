---
 tags:
   - ops
---

# Что делать если возникают проблемы со сборкой Docker-образов?

- Общий совет: если что-то перестало собираться, возможно, дело в том, что используются latest-images - image без
  указания версии, напр. `FROM ubuntu`
- Лечится изменением версии: откат к предыдущей версии, или апгрейд до новой
- Какая версия является последней можно на DockerHub - ищи image с версией latest
- Напр. [ubuntu](https://hub.docker.com/_/ubuntu): latest-версией на 2022-06-01
  является: `22.04, jammy-20220428 jammy, latest, rolling`
- Еще бывает такое, что latest-версия на Windows-докере отличается от Linux-докера - хз поч, но стоит иметь в виду