# Домены

## Как сделать домен для Github Pages?

- На примере [potyk.io](https://potyk.io) и [REG.ru](https://www.reg.ru/)
    - REG.ru - топ ру доменный регистратор
- [Статья по теме от Github](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
    - Интересует apex domain - домен из 2 уровней
- Нужно создать CNAME и A-записи:
    - `A @ → 185.199.108.153`
    - `A @ → 185.199.109.153`
    - `A @ → 185.199.110.153`
    - `A @ → 185.199.111.153`
    - `CNAME www → potykion.github.io`
- Прописать кастомный домен в настройках Github Pages
    - https://github.com/{user}/{user}.github.io/settings/pages
- Создать файл `CNAME` с названием домена
    - Для mkdocs нужно добавить его в `docs/`

Ура, домен настроен!