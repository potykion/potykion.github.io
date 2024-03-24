import csv
import json
from urllib.parse import urlparse

with open("kp_movies.json", encoding="utf-8") as f:
    kp_movies = json.load(f)

rows = [("date", "status", "kinorium ID", "imdb ID", "kinopoisk ID")]
for movie in kp_movies:
    # https://www.kinopoisk.ru/film/4540126/ > 4540126
    id = urlparse(movie["url"]).path.split("/")[-2]

    date, time = movie["date"].replace(",", "").split()
    date = f"{date.replace('.', '-')} {time + ':00'}"

    status = movie["vote"]

    # date	status	kinorium ID	imdb ID	kinopoisk ID
    # Первая строка таблицы должна содержать поля: date, status и, как минимум, одно из полей kinorium ID, imdb ID, kinopoisk ID
    # Поле date:
    # дата в формате ГГГГ-ММ-ДД ЧЧ:ММ:СС
    # если поле пустое, у статуса будет текущая дата
    # Поле status:
    # future — фильм из списка «Буду смотреть»
    # цифры от 1 до 10 — оценка фильма
    # любое другое значение — просмотр фильма
    row = [date, status, "", "", id]
    rows.append(row)

with open("kp_movies.csv", "w", encoding="utf-8") as f:
    writer = csv.writer(f, lineterminator="\n")
    writer.writerows(rows)
