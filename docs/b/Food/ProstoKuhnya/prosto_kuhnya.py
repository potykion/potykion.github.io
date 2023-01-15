import dataclasses
import json
import operator
import re
from typing import List


def main():
    # pk = ProstoKuhnya
    with open('prosto_kuhnya_issues.json', encoding='utf-8') as f:
        pk_issues_json = json.load(f)
        pk_issues = sorted(
            map(ProstoKuhnyaIssue.parse, pk_issues_json),
            key=operator.attrgetter('issue_number'),
            reverse=True,
        )

    pk_issues_with_dishes = [i for i in pk_issues if i.dishes if i.issue_number > 229 or i.issue_number < 172]
    pk_issues_without_dishes = [i for i in pk_issues if not i.dishes]

    # ProstoKuhnyaIssue.print_issues(pk_issues_with_dishes)
    ProstoKuhnyaIssue.print_issues(pk_issues_without_dishes)


@dataclasses.dataclass()
class ProstoKuhnyaIssue:
    issue_number: int
    url: str
    dishes: List[str]

    @classmethod
    def parse(cls, json_d):
        return cls(
            issue_number=cls.parse_issue_number(json_d["title"]),
            url=json_d['url'],
            dishes=cls.parse_dishes(json_d['description']),
        )

    @classmethod
    def parse_issue_number(cls, title):
        """
        >>> ProstoKuhnyaIssue.parse_issue_number('ПроСто кухня | Выпуск 223')
        223
        """
        try:
            return int(re.findall(r'Выпуск (\d+)', title, re.IGNORECASE)[0])
        except IndexError:
            raise ValueError(f'Не удалось распарсить: {title}')

    @classmethod
    def parse_dishes(cls, desciption):
        """
        >>> ProstoKuhnyaIssue.parse_dishes('''ПроСто кухня | Выпуск 223 (13.08.2022)
        ...
        ... Блюдо № 1 - Пожарские котлеты
        ... Блюдо № 2 - Турецкий пирог "Су Бурек"
        ... Блюдо № 3 - Зефир из черной смородины
        ... Блюдо № 4 - Мангал-салат''')
        ['Пожарские котлеты', 'Турецкий пирог "Су Бурек"', 'Зефир из черной смородины', 'Мангал-салат']
        """
        return re.findall(r'Блюдо № \d+ - (.+)', desciption)

    def to_row(self):
        return '|'.join([
            '',
            f'[{self.issue_number}]({self.url})',
            *self.dishes,
            '',
        ])

    def __str__(self):
        return self.to_row()

    @classmethod
    def print_issues(cls, issues):
        for issue in issues:
            print(issue)
        else:
            print()


if __name__ == '__main__':
    main()
