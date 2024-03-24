import csv
import datetime
import json
import re
import shutil
import sqlite3
from pathlib import Path
from urllib.parse import urlparse
import requests
import os

from pydantic import BaseModel

from potyk_io_back.core import BASE_DIR


def to_kinorium_csv(kp_movies):
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


def download_kinorium_images():
    global index, url
    with open("kinorium_images.json", "r", encoding="utf-8") as f:
        kinorium_images = json.load(f)
    # Ensure the ./images directory exists
    if not os.path.exists("./images"):
        os.makedirs("./images")
    for index, url in enumerate(kinorium_images):
        print(f"{index + 1} / {len(kinorium_images)}")
        response = requests.get(url)
        if response.status_code == 200:
            with open(os.path.join("./images", str(index) + ".jpg"), "wb") as f:
                f.write(response.content)
        else:
            print(f"Failed to download {url}")


def fix_images():

    # Specify the directory path
    directory_path = (
        r"C:\Users\GANSOR\PycharmProjects\potykion.github.io\scripts\images"
    )

    # Iterate over each file in the directory
    for filename in os.listdir(directory_path):
        # Check if the file name matches the pattern '1jpg'
        if filename.endswith("jpg"):
            # Construct the full file path
            old_file_path = os.path.join(directory_path, filename)
            # Construct the new file path
            new_file_path = os.path.join(
                directory_path, filename.replace("jpg", ".jpg")
            )
            # Rename the file
            os.rename(old_file_path, new_file_path)


class MovieWithoutId(BaseModel):
    title: str
    title_eng: str | None
    kp_url: str
    watched_dt: datetime.datetime
    vote: int
    wishlist: bool = False
    is_series: bool = False
    poster: str
    review: str = ""
    year: int

    @property
    def poster_filename(self):

        title = (self.title_eng or self.title).lower()
        for char in ":'?!,&.-+()":
            title = title.replace(char, "")

        title = re.sub(r"\s+", " ", title)
        title = title.replace(" ", "-")

        return f"{title}-{str(self.year)}"


if __name__ == "__main__":
    with open("kp_movies.json", encoding="utf-8") as f:
        kp_movies = json.load(f)

    directory_path = (
        r"C:\Users\GANSOR\PycharmProjects\potykion.github.io\scripts\images"
    )
    images = sorted(os.listdir(directory_path), key=lambda x: int(x.split(".")[0]))

    movies = []
    for raw_movie, image in zip(kp_movies, images):
        title, raw_year = raw_movie["title"].rsplit(" ", maxsplit=1)
        year = int(raw_year.strip("(").strip(")"))

        watched_dt = datetime.datetime.strptime(raw_movie["date"], "%d.%m.%Y, %H:%M")

        movie = MovieWithoutId(
            title=title,
            title_eng=raw_movie["nameEng"].strip(),
            kp_url=raw_movie["url"],
            watched_dt=watched_dt,
            vote=raw_movie["vote"],
            wishlist=False,
            is_series=False,
            poster=image,
            review="",
            year=year,
        )
        movies.append(movie)

    in_img_path = Path(
        r"C:\Users\GANSOR\PycharmProjects\potykion.github.io\scripts\images"
    )
    out_img_path = Path(
        r"C:\Users\GANSOR\PycharmProjects\potykion.github.io\static\images\movies"
    )
    for movie in movies:
        new_poster = movie.poster_filename + ".jpg"
        shutil.copyfile(in_img_path / movie.poster, out_img_path / (new_poster))
        movie.poster = f"images/movies/{new_poster}"

    sqlite_conn = sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False)
    sqlite_cur = sqlite_conn.cursor()
    for movie in movies:
        sqlite_cur.execute(
            "INSERT INTO movies (title, title_eng, kp_url, watched_dt, vote, wishlist, is_series, poster, review, year) VALUES (?,?,?,?,?,?,?,?,?,?)",
            (
                movie.title,
                movie.title_eng,
                movie.kp_url,
                movie.watched_dt,
                movie.vote,
                movie.wishlist,
                movie.is_series,
                movie.poster,
                movie.review,
                movie.year,
            ),
        )
    sqlite_cur.connection.commit()

    pass
