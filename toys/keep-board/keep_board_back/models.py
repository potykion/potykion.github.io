import dataclasses
import datetime as dt
from typing import List

from gkeepapi.node import Note


@dataclasses.dataclass()
class GKeepNote:
    created: dt.date
    title: str
    text: str
    labels: List[str]
    url: str

    @classmethod
    def from_gkeep(cls, gkeep_note: Note):
        return cls(
            created=gkeep_note.timestamps.created.date(),
            title=gkeep_note.title,
            text=gkeep_note.text.strip(),
            labels=[l.name for l in gkeep_note.labels.all()],
            url=f'https://keep.google.com/#NOTE/{gkeep_note.server_id}',
        )

    def to_json(self):
        dict_ = dataclasses.asdict(self)
        return {
            **dict_,
            'created': str(self.created),
        }
