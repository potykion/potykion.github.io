---
cover: Code/Python/Tools/mkdocs.png
---

# MkDocs

![](mkdocs.png)

## Что это?

- [MkDocs](https://www.mkdocs.org/) - топ-штука для написания Markdown документации, написанная на Python
- Чистый MkDocs не оч широко используется, обычно используется вместе с
  темой [**Material for MkDocs**](https://squidfunk.github.io/mkdocs-material/)
- Топ - потому что **пользуется спросом**: [дока FastAPI](https://fastapi.tiangolo.com/) на этой штуке, [куча плагинов](https://chrieke.medium.com/the-best-mkdocs-plugins-and-customizations-fc820eb19759)
- Потому что **простая**: на старте достаточно 1 маленького конфиг-файла
- И потому что **отличная документация** (про тулзу для документации): редко нужно гуглить что-то помимо нее

## Как пользоваться?

1. `pip install mkdocs-material` - ставим (нужен py3)
2. `mkdocs new .` - создаст пару файлов:
    - `mkdocs.yml` - конфиг
    - `docs/` - сюда пишем все md-файлы
    - `docs/index.md` - заглавная страница любой документации
3. Пишем в конфиге тему и название:

      ```yaml
      site_name: My Docs

      theme:
        name: material
      ```

4. `mkdocs build` - рендерим html
5. Все, наш маркдаун отрендерился в красивый хтмл

## Как посмотреть доку на локалке?

```shell
mkdocs serve
```

## Как конфигурировать?

- Все - [в доке](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/)
- Ниже - то как настроено у меня:

```yaml
# https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/
# https://squidfunk.github.io/mkdocs-material/reference/
# Название проекта
site_name: potyk-io
# Урл сайта - нужен для сайтмапы
site_url: https://potyk.io
# На каком адресе запускать mkdocs serve
# Удобно, если 8000 порт занят
dev_addr: 127.0.0.1:8001

# Внешний вид
theme:
  # Материал тема
  name: material
  # Цвет темы
  palette:
    primary: blue
  # Фавикон - иконка вкладки браузера
  favicon: a/favicon-16x16.png
  # Иконка в навбаре
  logo: a/favicon-32x32.png
  # Директория с кастомной версткой
  # Напр. там можно прописать Yandex Metrica
  custom_dir: overrides
  # Какие элементы отображать
  features:
    # Все про навигацию: https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/
    # Табы
    - navigation.tabs
    # Кнопка "Вверх"
    - navigation.top
    # index.md будет называться как раздел
    - navigation.indexes
    # Все про поиск: https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-search/
    # Поиск: предложения и подсветка искомого текста
    - search.suggest
    - search.highlight
  font:
    text: Noto Sans

# Плагины - для нового функционала
plugins:
  # Включение поиска на русском и английском
  - search:
      lang:
        - en
        - ru
  # Плагин для навигации
  # https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin
  - awesome-pages

# Навигация: Табы > Секции > Страницы
# Работает за счет awesome-pages
nav:
  - Айоу 👋: index.md
  - ... | c/**/*.md
  - ... | b/**/*.md
  - ... | n/**/*.md
# Расширения маркдауна - возможность использовать новые конструкции в маркдауне
markdown_extensions:
  # Для note-блоков
  - admonition
  # Всякие расширения из https://facelessuser.github.io/pymdown-extensions/
  # Для подсветки кода, подсветки ссылок,
  - pymdownx.details
  - pymdownx.magiclink
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences
  # Как подсказывает название, чтобы писать маркдаун в хтмл
  - md_in_html
  # Чтобы стилизировать md без html
  - attr_list
  # Зачеркнутый текст
  - pymdownx.tilde
  # Тасклисты: - [ ]
  - pymdownx.tasklist:
      custom_checkbox: true
extra:
  # Гугл аналитика
  analytics:
    provider: google
    property: !ENV GA_KEY
  # + можно свое что-то определить
  yandex: !ENV YA_METRICA_KEY
  # Кнопочки в футере
  social:
    - icon: fontawesome/brands/telegram
      link: https://t.me/potykion
      name: тг
```

## Как деплоить / хостить?

### Github Pages + Github Actions

- Самый простой способ развернуть доку - использовать GH Pages + GH Actions
- Просто следуй [гайду](https://squidfunk.github.io/mkdocs-material/publishing-your-site/) - даже никаких дополнительных
  двидений не потребуется, так просто, так круто

### Google App Engine

- _Хочется mkdocs залить на гае, чтобы дока была доступна по адресу /docs/_
- Тебе это, скорее всего, не нужно

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

## Еще про конфиг

### Как сделать авто-комплит конфига?

Указать JSON-schema для mkdocs.yml: https://squidfunk.github.io/mkdocs-material/schema.json

### Что ставить в особых случаях?

#### Связка с Bitbucket репо, чтобы можно было редачить

```yaml
repo_url: https://bitbucket.org/{организация/юзер}/{проект}/
edit_uri: src/master/{путь к доке}
```
