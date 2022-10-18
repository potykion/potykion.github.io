import dataclasses
from typing import Literal

from .api_cli import KeepCli


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
        return notes
