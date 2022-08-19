# MkDocs

## Что это?

- https://squidfunk.github.io/mkdocs-material/
- Штука для генерации документации
- Оч простая: достаточно 1 файла с конфигурацией, чтобы отрендерить маркдаун

## Ссылки

- [Дока по mkdocs](https://www.mkdocs.org/user-guide/configuration/)
- [Дока по плагину для навигации](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin)

---

## Как генерить доку?

1. `pip install mkdocs-material` - ставим (нужен py3)
2. `mkdocs new .` - создаст `mkdocs.yml` и `docs/index.md`
3. Пишем в конфиге тему и название:

      ```yaml
      site_name: My Docs

      theme:
        name: material
      ```

4. `mkdocs build` - рендерим html

## Как посмотреть доку на локалке?

```shell
mkdocs serve
```

### Как сменить порт?

```yaml
# mkdocs.yml
dev_addr: 127.0.0.1:{PORT}
```

---

## Как сделать авто-комплит конфига?

Указать JSON-schema для mkdocs.yml: https://squidfunk.github.io/mkdocs-material/schema.json

## Что стоит поставить?

### Кликабельные ссылки (без надобности обрамлять их в `[]()`)

```yaml
markdown_extensions:
  - pymdownx.magiclink
```

### Подсветка кода

```yaml
markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences
```

--- 

## Что ставить в особых случаях?

### Связка с репо, чтобы можно было редачить

#### Bitbucket

```yaml
repo_url: https://bitbucket.org/{организация/юзер}/{проект}/
edit_uri: src/master/{путь к доке}
```

---

## Как деплоить?

### Google App Engine

_Хочется mkdocs залить на гае, чтобы дока была доступна по адресу /docs/_

#### mkdocs.yml

Проставить `use_directory_urls` для генерации прямых .html-урлов (`/index.html` вместо `/`):

```yaml
use_directory_urls: false
```

Опционально, можно задать кастомную директорию, куда будут генерится html:

```yaml
site_dir: ../../static/docs
```

#### app.yaml

Проставить роутинг статики:

```yaml
- url: /docs/
  static_files: static/docs/index.html
  upload: static/docs/index.html

- url: /docs
  static_dir: static/docs
```

Опционально, можно прикрутить аутентификацию, используя:

```yaml
login: admin
```

Источник: https://github.com/mkdocs/mkdocs/issues/1622

## Как сделать навигацию?

Ниже мой конфиг по навигации:

```yaml
theme:
  features:
    # Якори
    - navigation.tracking
    # Табы
    - navigation.tabs
    # Кнопка "Вверх"
    - navigation.top

```

### Как упорядочить табы?

Использовать плагин https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin

Напр. этот блог по умолчанию делал такие табы:

- Meta
- Жизнь
- Разработка

А хочется в обратном порядке

Чтобы это сделать определяем навигацию

```yaml
plugins:
  - search
  - awesome-pages

nav:
  - index.md
  - ... | Разработка/**/*.md
  - ... | Жизнб/**/*.md
  - ... | Meta/**/*.md

```

[Источник](https://github.com/squidfunk/mkdocs-material/discussions/3482)

## Как сделать поиск?

```yaml
theme:
  features:
    - search.suggest
    - search.highlight


plugins:
  - search:
      lang:
        - en
        - ru

```

[Источник](https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-search/)

