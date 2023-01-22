import json
import datetime as dt
from typing import Literal, Any

from potyk_fp.http import HttpRes
from pydantic import BaseModel

from src.api_cli import KeepCli
from src import auth
from src.models import GKeepNote, NoteType
from src.yc import Event


class NoteAction(BaseModel):
    action_type: Literal['daily', 'weekly', 'monthly', 'update', 'create']
    mode_case: Any

    @classmethod
    def from_event(cls, event: Event):
        mode = event['queryStringParameters'].get('mode')
        if mode == 'update':
            return cls(action_type=mode, mode_case=UpdateNote.from_event(event))
        if mode == 'create':
            return cls(action_type=mode, mode_case=CreateNote.from_event(event))
        if mode in ('daily', 'weekly', 'monthly'):
            return cls(action_type=mode, mode_case=ListNotes(mode=mode))
        raise ValueError(f'Invalid mode: {mode}')


class ListNotes(BaseModel):
    mode: NoteType = 'daily'

    def __call__(self, keep_cli=None) -> HttpRes:
        notes = (keep_cli or KeepCli.setup()).notes(label=self.mode)
        notes = sorted(notes, key=lambda note: note.created)
        return HttpRes.ok([note.to_json() for note in notes])


class UpdateNote(BaseModel):
    note_id: str
    note_text: str
    user_token: str

    @classmethod
    def from_event(cls, event: Event):
        return cls(
            **json.loads(event['body']),
            user_token=event['headers'].get('Kb-Authorization'),

        )

    def __call__(self, keep_cli=None) -> HttpRes:
        return (
            do_auth(self.user_token)
            .and_then(lambda: HttpRes.ok(
                (keep_cli or KeepCli.setup())
                .update_note(self.note_id, self.note_text),
            ))
        )


class CreateNote(BaseModel):
    note_type: NoteType
    note_text: str
    user_token: str

    def __call__(self, keep_cli=None) -> HttpRes[GKeepNote]:
        return (
            do_auth(self.user_token)
            .and_then(lambda: HttpRes.ok(
                (keep_cli or KeepCli.setup())
                .create_note(self.note_type, self.note_text),
            ))
        )

    @classmethod
    def from_event(cls, event):
        return cls(
            **json.loads(event['body']),
            user_token=event['headers'].get('Kb-Authorization'),
        )


def do_auth(token: str) -> HttpRes:
    user_data = auth.validate_token(token)
    if user_data and user_data['email'] == 'potykion@gmail.com':
        return HttpRes.ok()
    else:
        return HttpRes.err_msg('Invalid token')


class CreateWeeklyFromDaily:
    def __call__(self, ):
        cli = KeepCli.setup()
        notes = cli.notes('daily')
        weekly_note_texts = [
            n.text
            for n in notes
            if dt.date.today() - dt.timedelta(days=6) <= n.created <= dt.date.today()
        ]
        weekly_text = '\n'.join(weekly_note_texts)
        weekly_text = '\n'.join(sorted(weekly_text.split('\n'), key=lambda line: line[0]))

        cli.create_note('weekly', weekly_text)
