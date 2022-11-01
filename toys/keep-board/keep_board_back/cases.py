import dataclasses
import json
from typing import Literal, Optional, Union, Tuple

from .api_cli import KeepCli
from .auth import validate_token
from .yc import Event

Json = Union[dict, list]


@dataclasses.dataclass()
class Mode:
    type: Literal['daily', 'weekly', 'update']
    note_id: Optional[str] = None
    note_data: Optional[dict] = None
    user_token: Optional[str] =None

    @classmethod
    def from_event(cls, event: Event):
        mode = event['queryStringParameters'].get('mode', 'daily')
        assert mode in ('daily', 'weekly', 'update'), \
            f'invalid mode: {mode}; should be one of the following: daily, weekly, update'

        if mode == 'update':
            note_id = event['queryStringParameters'].get('id')
            note_data = json.loads(event['body'])
            user_token = event['headers'].get('KB-Authorization')
            assert note_id, 'No id passed'
            assert note_data, 'No body passed'
            assert user_token, 'No token passed'
        else:
            note_id = None
            note_data = None
            user_token = None

        return cls(mode, note_id, note_data, user_token)

    def apply(self) -> Tuple[Json, Optional[int]]:
        if self.type == 'daily' or self.type == 'weekly':
            return ListNotes(self.type)(), 200
        if self.type == 'update':
            return UpdateNote(self.note_id, self.note_data, self.user_token)()


@dataclasses.dataclass()
class ListNotes:
    mode: Literal['daily', 'weekly']
    keep_cli: KeepCli = dataclasses.field(default_factory=KeepCli)

    def __post_init__(self):
        assert self.mode in ('daily', 'weekly'), 'mode should be daily or weekly'
        self.keep_cli.setup()

    def __call__(self, ):
        notes = self.keep_cli.notes(label=self.mode)
        notes = sorted(notes, key=lambda note: note.created)
        return [note.to_json() for note in notes]


@dataclasses.dataclass()
class UpdateNote:
    note_id: str
    note_data: dict
    user_token: str
    keep_cli: KeepCli = dataclasses.field(default_factory=KeepCli)

    def __post_init__(self):
        self.keep_cli.setup()

    def __call__(self, ) -> Tuple[Json, int]:
        user_data = validate_token(self.user_token)
        if user_data and user_data['email'] == 'potykion@gmail.com':
            self.keep_cli.update_note(self.note_id, self.note_data)
            return {}, 200
        else:
            return {'error': 'Invalid token'}, 400
