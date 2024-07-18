import dataclasses
import datetime
import locale
import sqlite3
from collections import deque

import flask
from dateutil.parser import parse
from flask import Blueprint
from typing import Dict, List

import gspread
from pydantic import BaseModel, Field, computed_field
from tinydb import TinyDB

from potyk_io_back.config import BASE_DIR


def parse_date(raw_date: str) -> datetime.date | None:
    try:
        return parse(raw_date).date()
    except ValueError:
        return None


class HabitRepo:
    def __init__(self, db: TinyDB):
        self.db = db
        self.table = db.table("habits")

    def sync(self, habit_dates: Dict[str, Dict[str, str]]):
        self.table.truncate()
        self.table.insert(habit_dates)

    def get_data(self):
        try:
            return self.table.all()[0]
        except IndexError:
            return {}


class HabitPerforming(BaseModel):
    id: int
    habit_id: int
    # '+' | '-' | ''
    status: str = ""
    date: datetime.date


class Habit(BaseModel):
    id: int
    title: str
    desc: str
    dod: str
    goal: str
    archive: bool
    feedback: str
    pinned: bool

    performings: list[HabitPerforming] = Field(default_factory=list)

    @computed_field
    @property
    def total_performings(self) -> int:
        return sum(1 for perf in self.performings if perf.status == "+")

    @computed_field
    @property
    def max_streak(self) -> int:
        max_streak_ = 0
        streak = 0
        for perf in sorted(self.performings, key=lambda perf: perf.date):
            if perf.status == "+":
                streak += 1
            else:
                streak = 0
            max_streak_ = max(max_streak_, streak)
        return max_streak_

    @computed_field
    @property
    def current_streak(self) -> int:
        streak = 0
        queue_ = deque(
            sorted(self.performings, key=lambda perf: perf.date, reverse=True)
        )
        while queue_:
            perf = queue_.popleft()
            if perf.status == "":
                continue
            elif perf.status == "-":
                return 0
            else:
                streak = 1
                break

        while queue_:
            perf = queue_.popleft()
            if perf.status == "+":
                streak += 1
            else:
                break

        return streak

    @computed_field()
    @property
    def current_status(self) -> str:
        try:
            return next(
                perf for perf in self.performings if perf.date == datetime.date.today()
            ).status
        except StopIteration:
            return ""

    def has_performing(self, date: datetime.date) -> bool:
        return (
            next((perf for perf in self.performings if perf.date == date), None)
            is not None
        )

    def get_performing(self, date: datetime.date) -> HabitPerforming:
        return next(
            (perf for perf in self.performings if perf.date == date), None
        ) or HabitPerforming(
            id=0,
            habit_id=self.id,
            status="",
            date=date,
        )

    @computed_field()
    @property
    def done_today(self) -> bool:
        date = datetime.date.today()
        perf = next((perf for perf in self.performings if perf.date == date), None)
        return perf is not None and perf.status == "+"


class HabitSqliteStorage:
    def __init__(self, sqlite_cur: sqlite3.Cursor) -> None:
        self.sqlite_cur = sqlite_cur
        self.sqlite_cur.row_factory = sqlite3.Row

    def list_all(self, filter_=None, filter_params=None) -> List[Habit]:
        q = "select * from habits"
        if filter_:
            q += " where {}".format(filter_)
        raw_habits = self.sqlite_cur.execute(q, filter_params or ()).fetchall()
        habits = [Habit(**habit) for habit in raw_habits]
        habit_index = {habit.id: habit for habit in habits}

        raw_habit_performings = self.sqlite_cur.execute(
            "select id, habit_id, status, date from habit_performings"
        ).fetchall()
        habit_performings = [
            HabitPerforming(id=id, habit_id=habit_id, status=status, date=date)
            for id, habit_id, status, date in raw_habit_performings
            if habit_id in habit_index
        ]
        for perf in habit_performings:
            habit_index[perf.habit_id].performings.append(perf)
        return habits

    def get_by_id(self, habit_id) -> Habit:
        return self.list_all("id = ?", (habit_id,))[0]


def make_habits_blueprint(
    habit_repo: HabitRepo,
    sqlite_cur: sqlite3.Cursor,
):
    habits_blueprint = Blueprint("habits_blueprint", __name__)
    storage = HabitSqliteStorage(sqlite_cur)

    @habits_blueprint.get("/stuff/habits/v1")
    def habits_index():

        habit_statuses = habit_repo.get_data()
        if habit_statuses:
            habits = sorted(list(habit_statuses.values())[0].keys())
        else:
            habits = []

        return flask.render_template(
            "stuff/habits/v1.html",
            habits=habits,
            habit_statuses=habit_statuses,
        )

    @habits_blueprint.get("/stuff/habits")
    def habits_v2_index():
        hide_done = flask.request.args.get("hide_done") == "true"

        habits = storage.list_all()
        overall_max_streak = max(habit.max_streak for habit in habits)
        overall_total_performings = max(habit.total_performings for habit in habits)
        overall_current_streak = max(habit.current_streak for habit in habits)

        if hide_done:
            habits = [habit for habit in habits if not habit.done_today]

        archived_habits = [habit for habit in habits if habit.archive]
        fixed_habits = [habit for habit in habits if habit.pinned]
        habits = [habit for habit in habits if not habit.archive and not habit.pinned]

        habit_template = "\n\n".join(f"{habit.id}. {habit.title}" for habit in habits)

        locale.setlocale(locale.LC_TIME, "ru_RU")

        return flask.render_template(
            "stuff/habits/index.html",
            hide_done=hide_done,
            habits=habits,
            archived_habits=archived_habits,
            fixed_habits=fixed_habits,
            habit_template=habit_template,
            overall_max_streak=overall_max_streak,
            overall_total_performings=overall_total_performings,
            overall_current_streak=overall_current_streak,
        )

    @habits_blueprint.post("/habits/sync")
    def habits_sync():

        def get_habit_data(sheet_url: str) -> Dict[str, Dict[str, str]]:
            """
            Fetches habit data from a Google Sheet and parses it into a dictionary format.

            Args:
                sheet_url: The URL of the Google Sheet.

            Returns:
                A dictionary where keys are dates and values are dictionaries containing
                habit titles as keys and their statuses (+ or -) as values.
            """

            gc_key = next(
                BASE_DIR / key
                for key in [
                    "poty-blog-ce81c322c37e.json",
                    "poty-blog-8ecdcdc42b5e.json",
                ]
                if (BASE_DIR / key).exists()
            )
            gc = gspread.service_account(gc_key)

            # Open the spreadsheet and the first worksheet
            sheet = gc.open_by_key(sheet_url).sheet1

            # Get the first row as habit titles
            habit_titles = list(filter(None, sheet.row_values(1)))

            # Initialize the data dictionary
            habit_data = {}

            # Iterate through rows starting from the second row (skipping the header)
            for row_num in range(2, sheet.row_count + 1):
                row_values = sheet.row_values(row_num)
                date = row_values[0]
                if not date or parse_date(date) > datetime.date.today():
                    break

                # Create a dictionary for habit statuses for this date
                habit_statuses = {habit: "" for habit in habit_titles}
                for col_num, value in enumerate(row_values[1:]):
                    if col_num < len(
                        habit_titles
                    ):  # Only consider columns with habit titles
                        habit_statuses[habit_titles[col_num]] = value

                habit_data[date] = habit_statuses

            return habit_titles, habit_data

        habit_titles, habit_data = get_habit_data(
            "17vSy-t1SrOfkwmWIQmVkiWLQ3F85LH7TWoaPIvHnZws"
        )
        habit_repo.sync(habit_data)

        return flask.render_template_string(
            "{% from 'templates/components/habits.html' import habit_table %} "
            "{{ habit_table(habit_titles, habit_data) }}",
            habit_titles=habit_titles,
            habit_data=habit_data,
        )

    @habits_blueprint.post("/habits/<int:habit_id>/perform")
    def habits_perform_endp(habit_id: int):
        date = flask.request.values.get("date")
        if date:
            date = parse_date(date)
        else:
            date = datetime.date.today()
        status = flask.request.form.get("status", "")

        habit: Habit = storage.get_by_id(habit_id)

        if habit.has_performing(date):
            sqlite_cur.execute(
                "update habit_performings set status = ? where habit_id = ? and date = ?;",
                (status, habit_id, date),
            )
        else:
            sqlite_cur.execute(
                'insert into habit_performings (habit_id, status, "date") values (?, ?, ?);',
                (habit_id, status, date),
            )
        sqlite_cur.connection.commit()
        habit: Habit = storage.get_by_id(habit_id)

        return flask.render_template_string(
            "{% from 'templates/components/habits.html' import habit_card %} "
            "{{ habit_card(habit) }}",
            habit=habit,
        )

    return habits_blueprint


import csv


def export_performings_from_csv(csv_file, sqlite_cur):
    """
    >>> sqlite_conn = sqlite3.connect(BASE_DIR / "potyk-io.db", check_same_thread=False) # doctest: +SKIP
    >>> sqlite_cur = sqlite_conn.cursor() # doctest: +SKIP
    >>> export_performings_from_csv(BASE_DIR / "привычки - трекер.csv", sqlite_cur) # doctest: +SKIP
    """
    with open(csv_file, "r", encoding="utf-8") as file:
        reader = csv.reader(file)

        rows = list(reader)[1:]

        performings = []
        for row in rows:
            date_, *statuses = row
            if parse(date_).date() >= datetime.date.today():
                break
            performings.extend(
                [(index + 1, date_, status) for index, status in enumerate(statuses)]
            )

    for habit_id, date, status in performings:
        sqlite_cur.execute(
            'insert into habit_performings (habit_id, status, "date") values (?, ?, ?);',
            (habit_id, status, date),
        )
    sqlite_cur.connection.commit()
