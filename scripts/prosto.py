import json
import re
from typing import TypedDict, NamedTuple

from potyk_io_back.core.services import sql

class ProstoKuhnyaRecipeForSql(TypedDict):
    title: str

class ProstoKuhnyaIssueForSql(NamedTuple):
    issue_number: int
    youtube_url: str
    recipes: str


def parse_issue_recipes(desc) -> list[ProstoKuhnyaRecipeForSql]:
    """
    >>> parse_issue_recipes('''
    ... ПроСто кухня | Выпуск 255 (29.04.2023)
    ...
    ... Блюдо № 1 - Салат-боул с авокадо и курицей
    ... Блюдо № 2 - Итальянский сэндвич с колбасой и сыром (Паноццо наполетано)
    ... Блюдо № 3 - Турецкая мусака
    ... Блюдо № 4 - Куриная грудка с соусе из оливок, маслин и лимона
    ... Блюдо № 5 - Щевелевая панна-котта
    ... ''')
    [{'title': 'Салат-боул с авокадо и курицей'}, {'title': 'Итальянский сэндвич с колбасой и сыром (Паноццо наполетано)'}, {'title': 'Турецкая мусака'}, {'title': 'Куриная грудка с соусе из оливок, маслин и лимона'}, {'title': 'Щевелевая панна-котта'}]
    >>> parse_issue_recipes('''
    ... Готовить вместе интереснее с КАРАТ: https://vk.cc/cxrdyD
    ... Erid: 2Vfnxw8Nz2C
    ...
    ...
    ...
    ... Блюдо № 1  "Салат с клубникой, щавелём и жареным сыром"
    ...
    ... Блюдо № 2  "Зразы с куриной печенью и соусом из черемши"
    ...
    ... Блюдо № 3 "Песочные рогалики с мармеладом"
    ...
    ... Блюдо № 4 "Шашлык «Наполеон» и грибы с сырной начинкой"''')
    [{'title': '"Салат с клубникой, щавелём и жареным сыром"'}, {'title': '"Зразы с куриной печенью и соусом из черемши"'}, {'title': '"Песочные рогалики с мармеладом"'}, {'title': '"Шашлык «Наполеон» и грибы с сырной начинкой"'}]
    >>> parse_issue_recipes('''
    ...     Это просто космос!
    ... Копченое с натуральными специями мясо с собственных ферм Черкизово!
    ... Наслаждайтесь моментом с фантастическим вкусом Сальчичона Черкизово!
    ... Купить: https://clck.ru/36wWPr
    ... Архив Erid: LdtCK9xtJ
    ...
    ...
    ... ПроСто кухня | Выпуск 289 (23.12.2023)
    ...
    ... Блюдо № 1 - Профитроли с печенью трески
    ... Блюдо № 2 - Торт Селёдка под шубой
    ... Блюдо № 3 - Свинина с ананасами
    ... Блюдо № 4 - Рождественский штоллен''')
    []
    """
    return [ProstoKuhnyaRecipeForSql(title=title) for title in re.findall(r'Блюдо № \d\s*-?\s*(.+)', desc)]





def parse_issue(raw_issue):
    return ProstoKuhnyaIssueForSql(
        issue_number=(issue_number := parse_issue_number(raw_issue['title'])),
        youtube_url=raw_issue['url'],
        recipes=json.dumps(parse_issue_recipes(raw_issue['description']), ensure_ascii=False) ,
    )

def parse_issue_number(raw_issue_title):
    """
    >>> parse_issue_number('ПроСто кухня | Выпуск 255')
    '255'
    """
    pattern = r'Выпуск\s+(.+)'
    match = re.search(pattern, raw_issue_title)
    return match.group(1)


if __name__ == "__main__":
    with open('prosto-kuhnya-2024-06-25.json', encoding='utf8') as f:
        raw_issues = json.load(f)


    issues = [parse_issue(raw) for raw in raw_issues]

    s = 'as'
    # for issue in issues:
    #     issue["recipes"] = [{"title": rec} for rec in issue["recipes"]]
    #     issue["recipes"] = json.dumps(issue["recipes"], ensure_ascii=False)
    #
    q = sql()
    with q.commit_after():
        for issue in issues:
            q.execute(
                "insert into recipes_prosto_kuhnya_issues (issue_number, youtube_url, recipes)  VALUES (?, ?, ?)",
                tuple(issue),
            )
