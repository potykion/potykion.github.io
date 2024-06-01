import datetime
import enum
import sqlite3

import flask
from flask import render_template
from flask_wtf import FlaskForm
from peewee import TextField
from pydantic import BaseModel, ConfigDict
from wtforms.fields.datetime import DateTimeField
from wtforms.fields.numeric import IntegerField
from wtforms.fields.simple import StringField, URLField, BooleanField, FileField, TextAreaField
from wtforms.widgets.core import DateTimeInput

from potyk_io_back.q import Q


class MovieTag(enum.StrEnum):
    ru_teen = "ru-teen"
    en_teen = "en-teen"
    telki = "telki"
    rzhachka_strelyalka = "rzhachka-strelyalka"
    maniac = "maniac"
    criminal = "criminal"
    xtonb = "xtonb"
    narkotiki = "narkotiki"
    sex = "sex"
    shiza = "shiza"
    socialo4ka = "socialo4ka"
    scifi = "scifi"


class Movie(BaseModel):
    model_config = ConfigDict(frozen=True)

    id: int | None = None
    title: str
    title_eng: str | None
    kp_url: str
    watched_dt: datetime.datetime
    vote: int
    wishlist: bool
    is_series: bool
    poster: str
    review: str | None
    year: int
    tags: tuple[MovieTag | str, ...]


def parse_movie(row: sqlite3.Row | dict) -> Movie:
    return Movie(
        **{
            **row,
            "tags": tuple(row["tags"].split(",") if row["tags"] else []),
        }
    )


class MovieList(BaseModel):
    movies: list[Movie]
    key: str
    title: str
    desc: str


class MovieStore:
    def __init__(self, sqlite_cursor: sqlite3.Cursor) -> None:
        self.q = Q(sqlite_cursor, select_all_as=parse_movie)


def make_movie_lists(all_movies):
    return [
        MovieList(
            key="ru_teen",
            movies=[movie for movie in all_movies if MovieTag.ru_teen in movie.tags],
            title="Пиздюшня русская",
            desc="Фильмы и серики про нашу молодежь, зачастую это ноги растут из Школа - то есть тоже много маргинального",
        ),
        MovieList(
            key="en_teen",
            movies=[movie for movie in all_movies if MovieTag.en_teen in movie.tags],
            title="Пиздюшня нерусская",
            desc="Фильмы и серики про не нашу молодежь, зачастую это кино про секс и наркотики",
        ),
        MovieList(
            key="telki",
            movies=[movie for movie in all_movies if MovieTag.telki in movie.tags],
            title="Телки",
            desc="Фильмы и серики про женщин, про измены, про глупости",
        ),
        MovieList(
            key="rzhachka_strelylka",
            movies=[movie for movie in all_movies if MovieTag.rzhachka_strelyalka in movie.tags],
            title="Ржачка-стрелялка",
            desc="Фильмы и серики где много стреляют, дерутся, и все это под хихоньки-хахоньки",
        ),
        MovieList(
            key="maniac",
            movies=[movie for movie in all_movies if MovieTag.maniac in movie.tags],
            title="Маньяки",
            desc="Ну понятно, про маньяков",
        ),
        MovieList(
            key="criminal",
            movies=[movie for movie in all_movies if MovieTag.criminal in movie.tags],
            title="Гладкий криминал",
            desc="Крутые фильмы и серики про криминал",
        ),
        MovieList(
            key="xtonb",
            movies=[movie for movie in all_movies if MovieTag.xtonb in movie.tags],
            title="Хтонь",
            desc="Русская конечно))) Всякая чернуха и социальный пиздец",
        ),
        MovieList(
            key="narkotiki",
            movies=[movie for movie in all_movies if MovieTag.narkotiki in movie.tags],
            title="Наркотики",
            desc="Это плохо пнятненько?",
        ),
        MovieList(
            key="sex",
            movies=[movie for movie in all_movies if MovieTag.sex in movie.tags],
            title="Секс",
            desc="Ебаться - вредно, сперма - ядовита, сиськи - отвратительны",
        ),
        MovieList(
            key="shiza",
            movies=[movie for movie in all_movies if MovieTag.shiza in movie.tags],
            title="Беды с башкой",
            desc="Про поехавших или не очень",
        ),
        MovieList(
            key="socialo4ka",
            movies=[movie for movie in all_movies if MovieTag.socialo4ka in movie.tags],
            title="Социал очка",
            desc="Как хтонь, но не так жестко",
        ),
        MovieList(
            key="scifi",
            movies=[movie for movie in all_movies if MovieTag.scifi in movie.tags],
            title="С кайф ай боевички",
            desc="Анти-утопии всякие, эпики, серьезные стрелялки",
        ),
        MovieList(
            key="high-grade",
            movies=[movie for movie in all_movies if movie.vote >= 8],
            title="8+",
            desc="Фильмы и серики с хорошей оценкой от меня",
        ),
    ]


class MovieForm(FlaskForm):
    title = StringField(name="Название")
    title_eng = StringField(name="Название на англ.")
    kp_url = URLField(name="Ссылка на Кинопоиск")
    watched_dt = DateTimeField(name="Когда смотрел?", widget = DateTimeInput(input_type='datetime-local'))
    vote = IntegerField(name="Оценка")
    wishlist = BooleanField(name="Хочу посмотреть")
    is_series = BooleanField(name="Сериал?")
    poster = FileField(name="Постер/афиша")
    review = TextAreaField(name="Обзор")
    year = IntegerField(name="Год")
    tags = StringField(name="Теги")


def add_movie_routes(app, deps):
    @app.route("/movies")
    def movies_page():

        year_movies = deps.movie_store.q.select_all(
            "select * from movies "
            "where datetime(watched_dt) >= datetime('2024-01-01') "
            "order by datetime(watched_dt) desc",
        )

        all_movies = deps.movie_store.q.select_all(
            "select * from movies " "order by datetime(watched_dt) desc",
        )

        podborochki = make_movie_lists(all_movies)
        wo_tags = set(all_movies) - {movie for list_ in podborochki for movie in list_.movies}

        return render_template(
            "movies/index.html",
            page=deps.page,
            year_movies=year_movies,
            all_movies=all_movies,
            podborochki=podborochki,
            wo_tags=wo_tags,
        )

    @app.route("/movies/form", methods=["GET", "POST"])
    def movie_form():
        form = MovieForm()

        if form.validate_on_submit():
            movie = parse_movie({**form.data, 'poster': ''})
            deps.movie_store.q.execute(
                "insert into movies "
                "(title, title_eng, kp_url, watched_dt, vote, poster, review, year, tags) "
                "values "
                "(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    movie.title,
                    movie.title_eng,
                    movie.kp_url,
                    movie.watched_dt,
                    movie.vote,
                    movie.poster,
                    movie.review,
                    movie.year,
                    ','.join(movie.tags),
                ),
                commit=True,
            )
            return flask.redirect("/movies")

        return render_template(
            "movies/form.html",
            page=deps.page,
            form=form,
        )
