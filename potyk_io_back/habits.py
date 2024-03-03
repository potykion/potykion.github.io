import datetime

import flask
from dateutil.parser import parse
from flask import Blueprint
from typing import Dict, List

import gspread
from tinydb import TinyDB

from potyk_io_back.core import BASE_DIR


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


def make_habits_blueprint(habit_repo: HabitRepo):
    habits_blueprint = Blueprint("habits_blueprint", __name__)

    @habits_blueprint.get("/stuff/habits")
    def habits_index():
        habit_statuses = habit_repo.get_data()
        if habit_statuses:
            habits = list(list(habit_statuses.values())[0].keys())
        else:
            habits = []

        return flask.render_template(
            "stuff/habits/index.html",
            habits=habits,
            habit_statuses=habit_statuses,
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
            gc = gspread.service_account(
                BASE_DIR / "poty-blog-8ecdcdc42b5e.json"
            )  # Authenticate with Google Sheets API

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

    return habits_blueprint
