import dataclasses


@dataclasses.dataclass
class ArticleLink:
    title: str
    link: str
    depressive: bool = False


Articles = [
    {
        "section": "Пока нормально",
        "dates": "06.02",
        "articles": [
            ArticleLink(
                link="ok-dump", title="Фух, отпустило, или дамп не депрессивных мыслей"
            ),
        ],
    },
    {
        "section": "Депрессивный эпизод",
        "dates": "04.02 - 05.02",
        "articles": [
            ArticleLink(link="work", title="Оценочная сессия", depressive =True),
            ArticleLink(link="ghostwriting", title="Гострайтинг", depressive =True),
            ArticleLink(link="catdog", title="Котопес", depressive =True),
            ArticleLink(link="todo", title="Нужны ли туду листы?"),
        ],
    },
    {
        "section": "Работа и мотивация",
        "dates": "31.01 - 02.02",
        "articles": [
            ArticleLink(link="motivation-gamification", title="Мотивация геймификация"),
            ArticleLink(link="anxious-gossips", title="Тревожные сплетни"),
            ArticleLink(link="smooth-criminal", title="Гладкий криминал"),
            ArticleLink(link="univer", title="Универ новая общага"),
            ArticleLink(link="techno-run", title="Бег за технологиями"),
        ],
    },
    {
        "section": "Перерывчик в две недели, хех, эксперименты с Кипом, ТГ, новым репо",
        "dates": "24.01, 27.01 - 29.01",
        "articles": [
            ArticleLink(link="disorder", title="Переупорядочить нельзя, бредить"),
            ArticleLink(
                link="programming", title="Попытки мейк программинг грейт эгейн"
            ),
            ArticleLink(link="money", title="Бабки бабки сука бабки"),
            ArticleLink(link="read-2", title="Читаем книжки, гоняем по кругу мыслишки"),
            ArticleLink(link="read", title="Чтение как дело"),
            ArticleLink(link="useful", title="Полезные книги и видео"),
            ArticleLink(link="where", title="Где поститься"),
            ArticleLink(link="space", title="спейс"),
            ArticleLink(link="galera", title="Галера на рельсах"),
        ],
    },
    {
        "section": "Проснулось желание делать блог, снова",
        "dates": "13.01 - 14.01, 15.01 - 16.01",
        "articles": [
            ArticleLink(link="face", title="1001 мешап с Фейсом"),
            ArticleLink(link="15-01", title="Что в твоей тарелке 15.01"),
            ArticleLink(link="famous", title="Необычный способ стать знаменитым"),
            ArticleLink(link="tailwind", title="Теилвинд лав"),
            ArticleLink(link="addition-to-checking", title="Желание проверять"),
            ArticleLink(link="ru-dnb", title="Рашн днб"),
            ArticleLink(link="formkit", title="FormKit"),
            ArticleLink(link="v4", title="v4"),
        ],
    },
]


def get_next_article(cur_article_link: str) -> ArticleLink | None:
    for section_index, section in enumerate(Articles):
        for article_index, article in enumerate(section["articles"]):
            if article.link.endswith(cur_article_link):
                if article_index == 0:
                    if section_index == 0:
                        return None
                    else:
                        return Articles[section_index - 1]["articles"][-1]
                else:
                    return Articles[section_index]["articles"][article_index - 1]

    return None


def get_prev_article(cur_article_link: str) -> ArticleLink | None:
    for section_index, section in enumerate(Articles):
        for article_index, article in enumerate(section["articles"]):
            if article.link.endswith(cur_article_link):
                if article_index == len(section["articles"]) - 1:
                    if section_index == len(Articles) - 1:
                        return None
                    else:
                        return Articles[section_index + 1]["articles"][0]
                else:
                    return Articles[section_index]["articles"][article_index + 1]

    return None
