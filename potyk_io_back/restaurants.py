import datetime
import enum
import sqlite3

from flask import Blueprint, render_template, redirect
from flask_wtf import FlaskForm
from pydantic import BaseModel, Field
from wtforms.fields.choices import SelectMultipleField
from wtforms.fields.numeric import IntegerRangeField, DecimalRangeField
from wtforms.fields.simple import StringField, BooleanField, URLField, TextAreaField
from wtforms.validators import InputRequired


class PriceRange(enum.IntEnum):
    LOW = 0
    AVG = 1
    HIGH = 2


class RestTag(enum.StrEnum):
    # Азия
    Chinese = "Китайка🀄"
    Viet = "Вьетнамка🥋"
    Korean = "Корейка👘"
    # Рамен, Удон
    Noodles = "Лапша🍜"
    Sushi = "Суши🍣"
    Indian = "Индийка 🪷"
    # Пицца, паста, салатики
    Italia = "Италия 💶"
    # Пельмени, Чебуреки
    Russian = "Русская"
    # Плескавицы
    Serbian = "Сербия"
    # Шаурма, Бургеры
    StreetFood = "Стритфуд🥙"
    Soup = "Супы🍲"
    # Израильская, Турецкая, Кебабы, Хумусы
    MiddleEast = "Восточная🧆"
    # Хинкали, хачапури
    Georgian = "Грузинка"
    # Узбекская: манты, лагман, шурпа
    Chaihona = "Чайхана🍖"
    Sweets = "Десерты🍮"
    Gastro = "Гастро-бар 🍷"
    Beer = "Пивнуха 🍺"
    Brandy = "Настойки🍷"
    # Рыба, креветки, мидии
    Seafood = "Морские гады🐟"
    # Стейки, шашлыки
    Meat = "Мясо🍖"
    Lunch = "Обед / Столовка"
    FixPrice = "Фикс-прайс"
    FoodCourt = "Фуд-Корт"
    Chain = "Сетевуха🕸"
    Company = "Для компании🍻"
    Wtf = "Дичь"


class Restaurant(BaseModel):
    id: int | None = None
    name: str
    score: float | None
    created: datetime.datetime = Field(default_factory=datetime.datetime.now)
    url: str | None
    visited: bool
    location: list[str]
    price_range: str | PriceRange | None
    tags: list[str | RestTag]
    comment: str | None


class RestaurantStorage:
    def __init__(self, sqlite_cur: sqlite3.Cursor) -> None:
        self.sqlite_cur = sqlite_cur

    def list_all(self, filters=None):
        q = "select id, name, score, created, url, visited, location, price_range, tags, comment from restaurants"

        if filters is not None:
            q += f" where {filters}"

        raw_restaurants = self.sqlite_cur.execute(q).fetchall()
        restaurants = [
            Restaurant(
                id=id,
                name=name,
                score=score,
                created=created,
                url=url,
                visited=visited,
                location=location.split(","),
                price_range=price_range,
                tags=tags.split(","),
                comment=comment,
            )
            for id, name, score, created, url, visited, location, price_range, tags, comment in raw_restaurants
        ]
        return restaurants

    def insert(self, rest: Restaurant):
        rest_values = (
            rest.name,
            rest.score,
            rest.created,
            rest.url,
            rest.visited,
            ",".join(rest.location),
            rest.price_range,
            ",".join(rest.tags),
            rest.comment,
        )
        self.sqlite_cur.execute(
            """
                insert into restaurants (name, score, created, url, visited, location, price_range, tags, comment)
                values (?, ?, ?, ?, ?, ?, ?, ?, ?);
                """,
            rest_values,
        )
        self.sqlite_cur.connection.commit()


class AddRestForm(FlaskForm):
    name = StringField("Название", validators=[InputRequired()], render_kw=dict(placeholder='Тхали и Карри'))
    score = DecimalRangeField(
        "Оценка",
        validators=[InputRequired()],
        render_kw={"min": 0, "max": 10, "step": 0.5, 'class': 'range-primary'},
        default=7.5,
    )
    url = URLField("Ссылка", render_kw={'placeholder': 'https://yandex.ru/maps/org/tkhali_i_karri/154048393265'})
    visited = BooleanField("Были?", default=True)
    location = StringField("Место", validators=[InputRequired()], render_kw={'placeholder': 'Пушка'})
    price_range = IntegerRangeField(
        "Цены", render_kw={"min": 0, "max": 2, "steps": ["Низкие", "Средние", "Высокие"], 'class': 'range-accent'}
    )
    tags = SelectMultipleField(
        "Теги",
        validators=[InputRequired()],
        choices=RestTag.__members__.values(),
    )
    comment = TextAreaField("Коммент", validators=[InputRequired()], render_kw={'placeholder': 'Неплохая индийка'})


def make_restaurants_blueprint(
    sqlite_cur: sqlite3.Cursor,
):
    restaurants_blueprint = Blueprint("restaurants_blueprint", __name__)

    storage = RestaurantStorage(sqlite_cur)

    @restaurants_blueprint.route("/special/where-to-eat")
    def get_where_to_eat():
        restaurants = storage.list_all("visited = 1")
        restaurants = sorted(restaurants, key=lambda r: r.score, reverse=True)

        return render_template(
            f"special/where-to-eat.html",
            show_title=True,
            show_desc=True,
            restaurants=restaurants,
        )

    @restaurants_blueprint.route("/special/rest/add", methods=["GET", "POST"])
    def rest_add():
        form = AddRestForm()

        if form.validate_on_submit():
            form_data = form.data
            form_data["location"] = [form_data["location"]]
            rest = Restaurant(**form_data)
            storage.insert(rest)
            return redirect("/special/where-to-eat")

        return render_template("special/rest/add.html", form=form)

    return restaurants_blueprint
