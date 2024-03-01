import dataclasses

import mistune
from flask import Blueprint, render_template

stats_blueprint = Blueprint("stats_blueprint", __name__)


@dataclasses.dataclass(frozen=True)
class Book:
    title: str
    author: str
    url: str
    img: str
    done: bool = False
    drop: bool = False
    wip: bool = False
    review_md: str = ""

    @property
    def review_html(self):
        return mistune.html(self.review_md) if self.review_md else ""

    @property
    def id(self):
        return abs(hash(self))

    @property
    def full_title(self):
        return f"{self.author} — {self.title}"


Books = [
    Book(
        title="Тревожные люди",
        author="Фредрик Бакман",
        url="https://bookmate.ru/books/rujGEZSJ",
        img="https://assets-ru.bookmate.yandex.net/assets/books-covers/c1/ec/rujGEZSJ-ipad.jpeg",
        review_md="""- Книга - сеанс групповой терапии: все друг с другом общаются, притираются, потом выкладывают какую-то свою боль и вместе находят решения
- Интересное повествование: все время кидает то в другое время, то к другому персонажу, в итоге сидишь-собираешь пазл, все переплетено
- Читается легко, главы бывают по 1 странице""",
        done=True,
    ),
    Book(
        title="Поправки",
        author="Джонатан Франзен",
        url="https://bookmate.ru/books/ILQxt426",
        img="https://api.bookmate.ru/assets/books-covers/37/41/ILQxt426-ipad.jpeg",
        drop=True,
        review_md='''- Начало книги - описание жизни дедов, про то как дед уже в банки начал ссать, потому что лень из подвала выходить
- Потом начинается биография его сынишки: начал хорошо преподом в унике, но потом наркотики и блуд сделали из него неудачника 
- Ну и дропнул на этом, совсем не интересно читать просто биографию и быт какой-то семейки'''
    ),
    Book(
        title="Москва – Петушки",
        author="Венедикт Ерофеев",
        url="https://bookmate.ru/books/zYKP55f7",
        img="https://api.bookmate.ru/assets/books-covers/69/47/zYKP55f7-ipad.jpg",
        wip=True,
        review_md='''- Русский Страх и Ненависть в Лас Вегасе, только вместо наркотиков - алкоголь, а так все то же самое: галюны, бред, фантазии и большие объемы крепкого.
- Вся книга - размышления и процессы одного пьяницы, всех собеседников он выдумывает, выдумывает хорошо - ангелы, бог, абстрактные вы. Много выдумывает, разговаривает сам с собой, выдает поток мыслей и переживаний, и все - внутри, как будто рядом никого нет, как будто он один
'''
    ),
]


@stats_blueprint.route("/special/stats")
def get_special():
    return render_template(
        f"special/stats.html",
        show_title=True,
        show_desc=True,
        books=Books,
    )
