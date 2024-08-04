import datetime
import enum
import os
import sqlite3

import flask
import requests
from flask import render_template
from flask_wtf import FlaskForm
from pydantic import BaseModel, ConfigDict, Field
from werkzeug.datastructures import FileStorage
from wtforms.fields.choices import SelectField
from wtforms.fields.numeric import IntegerField
from wtforms.fields.simple import StringField, URLField, BooleanField, FileField, TextAreaField
from wtforms.widgets.core import DateTimeInput

from potyk_io_back.core.any_mapper import pipe, comma_split, map_from_to
from potyk_io_back.core.q import Q


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

    @classmethod
    def choices(cls, w_none=True):
        choices_ = []

        if w_none:
            choices_.append((None, ""))

        choices_ += [(sec, sec) for sec in cls]

        return choices_


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
    tags: tuple[MovieTag | str, ...] = Field(default_factory=tuple)


def parse_movie(row: sqlite3.Row | dict) -> Movie:
    return map_from_to(row, Movie, to_field_val_funcs={"tags": comma_split})


class MovieList(BaseModel):
    movies: list[Movie]
    key: str
    title: str
    desc: str


class MovieStore:
    def __init__(self, sqlite_cursor: sqlite3.Cursor) -> None:
        self.q = Q(sqlite_cursor, select_as=parse_movie)

    def get_by_id(self, rel_id):
        return self.q.select_one("select * from movies where id = ?", (rel_id,))


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
    year = IntegerField(name="Год")
    kp_url = URLField(name="Ссылка на Кинопоиск")
    title_eng = StringField(name="Название на англ.")
    watched_dt = StringField(name="Когда смотрел?", widget=DateTimeInput(input_type="datetime-local"))
    vote = IntegerField(name="Оценка")
    wishlist = BooleanField(name="Хочу посмотреть")
    is_series = BooleanField(name="Сериал?")
    poster_slug = StringField(name="Постер/афиша (slug)")
    poster_file = FileField(name="Постер/афиша (файл)")
    poster_url = URLField(name="Постер/афиша (урл)")
    review = TextAreaField(name="Обзор")
    tags = SelectField(
        name="Теги",
        choices=MovieTag.choices(),
    )


def add_movie_routes(app: flask.Flask, deps):
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

        if flask.request.method == "POST":
            if form.validate_on_submit():
                form_data = form.data

                form_data["poster"] = _save_poster(form_data)

                movie = parse_movie(form_data)

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
                        ",".join(movie.tags),
                    ),
                    commit=True,
                )
                return render_template("_components/htmx_success.html")
            else:
                return render_template("_components/htmx_error.html", error=form.errors)

        return render_template(
            "movies/form.html",
            page=deps.page,
            form=form,
        )

    def _save_poster(form_data):
        poster = None
        poster_file: FileStorage

        if poster_file := form_data.pop("poster_file", None):
            ext = poster_file.filename.rsplit(".")[-1]

            poster_filename = form_data["poster_slug"] + ext

            poster_path = os.path.join(app.static_folder, "images", "movies", poster_filename)

            poster_file.save(poster_path)

            return f"images/movies/{poster_filename}"

        if poster_url := form_data.pop("poster_url", None):
            response = requests.get(poster_url)
            response.raise_for_status()

            ext = _parse_ext_from_url(poster_url)

            poster_filename = form_data["poster_slug"] + ext

            poster_path = os.path.join(app.static_folder, "images", "movies", poster_filename)

            with open(poster_path, "wb") as file:
                file.write(response.content)

            return f"images/movies/{poster_filename}"

        return poster


def _parse_ext_from_url(url):
    """
    >>> _parse_ext_from_url("https://avatars.mds.yandex.net/get-kinopoisk-image/10893610/f54f8fac-e5d2-454e-8724-a877fc6e5e35/600x900")
    '.jpg'
    """
    try:
        path = url.split("/")[-1]
        if "." in path:
            return path.split(".")[-1]
        else:
            return ".jpg"
    except IndexError:
        return ".jpg"
