import datetime as dt
from dotenv import load_dotenv

from src.api_cli import KeepCli

if __name__ == '__main__':
    load_dotenv()
    cli = KeepCli.setup()
    notes = cli.notes('daily')
    weekly_note_texts = [
        n.text
        for n in notes
        if dt.date.today() - dt.timedelta(days=6) <= n.created <= dt.date.today()
    ]
    cli.create_note('weekly', '\n'.join(weekly_note_texts))
