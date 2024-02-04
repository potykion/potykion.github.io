import dataclasses


@dataclasses.dataclass
class ArticleLink:
    title: str
    link: str


Articles = [
    {
        "section": "Работа и мотивация",
        "dates": "31.01 - 02.02",
        "articles": [
            ArticleLink(link="./motivation-gamification.md", title="Мотивация геймификация"),
            ArticleLink(link="./anxious-gossips.md", title="Тревожные сплетни"),
            ArticleLink(link="./smooth-criminal.md", title="Гладкий криминал"),
            ArticleLink(link="./univer.md", title="Универ новая общага"),
            ArticleLink(link="./techno-run.md", title="Бег за технологиями"),
        ]
    },
    {
        "section": "Перерывчик в две недели, хех, эксперименты с Кипом, ТГ, новым репо",
        "dates": "24.01, 27.01 - 29.01",
        "articles": [
            ArticleLink(link="./disorder.html", title="Переупорядочить нельзя, бредить"),
            ArticleLink(link="./programming.html", title="Попытки мейк программинг грейт эгейн"),
            ArticleLink(link="./money.html", title="Бабки бабки сука бабки"),
            ArticleLink(link="./read-2.html", title="Читаем книжки, гоняем по кругу мыслишки"),
            ArticleLink(link="./read.html", title="Чтение как дело"),
            ArticleLink(link="./useful.html", title="Полезные книги и видео"),
            ArticleLink(link="./where.html", title="Где поститься"),
            ArticleLink(link="./space.html", title="спейс"),
            ArticleLink(link="./galera.html", title="Галера на рельсах"),
        ]
    },
    {
        "section": "Проснулось желание делать блог, снова",
        "dates": "13.01 - 14.01, 15.01 - 16.01",
        "articles": [
            ArticleLink(title="1001 мешап с Фейсом", link="./face.html"),
            ArticleLink(link="./15-01.html", title="Что в твоей тарелке 15.01"),
            ArticleLink(link="./famous.html", title="Необычный способ стать знаменитым"),
            ArticleLink(link="./tailwind.html", title="Теилвинд лав"),
            ArticleLink(link="./addition-to-checking.html", title="Желание проверять"),
            ArticleLink(link="./ru-dnb.html", title="Рашн днб"),
            ArticleLink(link="./formkit.html", title="FormKit"),
            ArticleLink(link="./v4.html", title="v4"),
        ]
    },
]


def get_next_article(cur_article_link: str) -> ArticleLink | None:
    for section_index, section in enumerate(Articles):
        for article_index, article in enumerate(section['articles']):
            if article.link.endswith(cur_article_link):
                if article_index == 0:
                    if section_index == 0:
                        return None
                    else:
                        return Articles[section_index - 1]['articles'][-1]
                else:
                    return Articles[section_index]['articles'][article_index - 1]

    return None



def get_prev_article(cur_article_link: str) -> ArticleLink | None:
    for section_index, section in enumerate(Articles):
        for article_index, article in enumerate(section['articles']):
            if article.link.endswith(cur_article_link):
                if article_index == len(section['articles']) - 1:
                    if section_index == len(Articles) - 1:
                        return None
                    else:
                        return Articles[section_index + 1]['articles'][0]
                else:
                    return Articles[section_index]['articles'][article_index + 1]

    return None
