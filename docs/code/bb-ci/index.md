---
cover: c/ops/bb-ci/pipelines.png
tags:
  - ops
---

# BitBucket Pipelines

- [BitBucket Pipelines](https://bitbucket.org/product/features/pipelines) - CI/CD от BitBucket
- Простой - все в одном файлике

![pipelines.png](pipelines.png)

## Пример

- Все описывается в одном файлике - `bitbucket-pipelines.yml`
- Ниже - типичный пример пайплайна для Python-серва: тестим и линтим код, затем деплоим его в GCP:

```yaml
definitions:
  steps:
    - step: &test
        name: Test & QA | Py2
        image: python:2.7
        caches:
          - pip
        script:
          - pip install -r requirements-dev.txt
          - pytest -v --junitxml=test-reports/report.xml
          - flake8 --show-source --statistics
    - step: &qa
        name: QA | Py3
        image: python:3.9
        caches:
          - pip
        script:
          - pip install -r reqs3.txt
          - mypy
    - step: &docs
        name: Build docs | Py3
        image: python:3.9
        caches:
          - pip
        script:
          - pip install -r reqs3.txt
          - cd docs/
          - mkdocs build
        artifacts:
          - static/docs/**
    - step: &deploy
        name: Deploy
        image: google/cloud-sdk
        deployment: test
        script:
          - gcloud auth login --cred-file=ci/sa.json
          - gcloud app deploy app.yaml

pipelines:
  default:
    - parallel:
        steps:
          - step: *test
          - step: *qa
  custom:
    deploy-test:
      - parallel:
          steps:
            - step: *test
            - step: *qa
      - step: *deploy

    deploy-prod:
      - parallel:
          steps:
            - step: *test
            - step: *qa
            - step: *docs
      - step:
          <<: *deploy
          deployment: prod
```

## Структура `bitbucket-pipelines.yml`

- [Документация по `bitbucket-pipelines.yml`](https://support.atlassian.com/bitbucket-cloud/docs/configure-bitbucket-pipelinesyml/)
- [Валидатор `bitbucket-pipelines.yml`](https://bitbucket-pipelines.atlassian.io/validator)

### `pipelines`

`pipelines` - джобы, которые будут запускаться при определенных триггерах

- `default` - то, что запускается при каждом коммите: тесты, линтинг, сборка
    - `step` - шаг джобы - запуск одной или нескольких комманд
    - `parallel` - запуск нескольких `step` паралелльно
- `custom` - то, что запускается руками - обычно деплой
    - `custom` - это объект, так что поля в нем именуются произвольно, напр. `deploy`
    - Значения объекта аналогичны `step` из `pipelines`

### `step`

`step` - **самая важная часть ci** - шаг джобы - запуск одной или нескольких комманд

- `name` - название
- `image` - Docker-image, в котором будут запускаться команды
- [`caches`](https://support.atlassian.com/bitbucket-cloud/docs/cache-dependencies/) - кеш зависимостей
- `script` - список запускаемых команд
- `artifacts` - делает результаты шага доступными в других шагах
    - полезно когда нужно сбилдить доку

#### `deployment`

[`deployment`](https://support.atlassian.com/bitbucket-cloud/docs/set-up-and-monitor-deployments/) - то что собрали и развернули на среду

- Можно просматривать в интерфейсе BB, смотреть какие коммиты развернуты, можно сделать откат
  ![deployment-monitor](deployment-monitor.png)
- В контексте `bitbucket-pipelines.yml` - это набор переменных:
  ![deployment-vars](deployment-vars.png)

#### Репортинг

- При запуске тестов, можно выводить упавшие тесты
  в [раскрывающихся блоках](https://support.atlassian.com/bitbucket-cloud/docs/test-reporting-in-pipelines/):

  ![test-report](test-report.png)

- Для этого результаты тестов нужно выводить в JUnitXML формате:

    ```
    pytest --junitxml=test-reports/report.xml
    ```

- Можно использовать этот подход и для других тулов, поддерживающих JUnitXML, но напр. для mypy и flake8 смысла мало в
  этом - будет 1 блок со всеми ошибками

### `definitions`

`definitions` - всякие реюзабельные штуки, используемые в пайплайнах

- `steps` - переиспользуемые шаги или [YAML anchors](https://support.atlassian.com/bitbucket-cloud/docs/yaml-anchors/)
    - `step: &{name}` - каждый шаг помечается `&{name}`, а затем используется в `pipelines` с помощью `*{name}`
      или `<<: *{name}`
    - `*{name}` - для простого использования
    - `<<: *{name}` - для использования с переопределением переменных или деплоев

#### `services`

[`services`](https://support.atlassian.com/bitbucket-cloud/docs/databases-and-service-containers/) - Docker-имеджы сервисов, используемых в шагах джобы: Postgres, Redis, ...

Определяем сервисы: в нашем случае - Postgres с определенными доступами, чтобы запускать на ней тесты:

```yaml
definitions:
  services:
    postgres:
      image: postgres
      environment:
        POSTGRES_DB: test
        POSTGRES_USER: postgres
        POSTGRES_PASSWORD: 6ZQMAuPEwXepIW
```

Указываем `services` в `step` и определяем env (при необходимости):

```yaml
steps:
  - step: &test
      name: Test
      image: python:3.9
      services:
        - postgres
      script:
        - export DATABASE_URL=postgresql://postgres:6ZQMAuPEwXepIW@localhost:5432/test
        - pip install -r requirements.txt
        - pytest -v --junitxml=test-reports/report.xml
```

## Что еще?

- Можно запускать [бб на своей инфре](https://support.atlassian.com/bitbucket-cloud/docs/runners/) (даже на Винде) - так
  можно сэкономить

## Примеры конфигураций

### Сборка через Docker и пуш в Yandex Cloud Container Registry

```yaml
definitions:
  steps:
    - step: &build
        name: Build and push Docker
        # Выставляем services, чтобы был доступ к Docker 
        services:
          - docker
        # Опциональное кеширование 
        caches:
          - docker
        script:
          # >- - многострочная команда
          - >-
            docker build 
            --build-arg DATABASE_URL=$DATABASE_URL 
            -t cr.yandex/$YC_CR/$IMAGE 
            .
          # Логинимся в CR
          - docker login --username oauth --password $YC_TOKEN cr.yandex
          # Пушим в CR
          - docker push cr.yandex/$YC_CR/$IMAGE
```

### Деплой на YC Serverless Containers

На базе [деплоя через yc](../yc.md)

```yaml
definitions:
  steps:
    - step: &deploy
        name: Deploty to YC SC
          # Ставим yc cli
          - curl -sSL https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash
          - source "/root/.bashrc"
          # Получаем токен
          # https://cloud.yandex.ru/docs/cli/operations/authentication/user
          - yc config set token $YC_TOKEN
          # Деплой
          - >-
          yc serverless container revision deploy
          --container-id $YC_SC_CONTAINER_ID
          --image cr.yandex/$YC_CR/$IMAGE
          --service-account-id $YC_SC_SA
          --execution-timeout 20s
          --memory 256MB
          --min-instances 1
          --environment DATABASE_URL=$DATABASE_URL
```