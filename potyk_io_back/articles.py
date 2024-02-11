import dataclasses


@dataclasses.dataclass
class ArticleLink:
    title: str
    link: str
    depressive: bool = False






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
