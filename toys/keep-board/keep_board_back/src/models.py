import dataclasses
import datetime as dt
from typing import List, Optional, Literal, Union

from gkeepapi import Keep
from gkeepapi.node import Note, List as ListNote

NoteType = Literal['daily', 'weekly', 'monthly']


@dataclasses.dataclass()
class GKeepNote:
    id: str
    text: str
    title: str = ''
    labels: List[str] = dataclasses.field(default_factory=list)
    image: Optional[str] = None
    created: dt.date = dataclasses.field(default_factory=dt.date.today)

    @classmethod
    def from_gkeep(cls, gkeep_note: Union[Note, ListNote], keep: Keep):
        text: str
        if isinstance(gkeep_note, ListNote):
            text = '\n'.join([li.text for li in gkeep_note.items])
        else:
            text = gkeep_note.text.strip()

        return cls(
            id=gkeep_note.server_id,
            created=gkeep_note.timestamps.created.date(),
            title=gkeep_note.title,
            text=text,
            labels=[l.name for l in gkeep_note.labels.all()],
            image=keep.getMediaLink(gkeep_note.images[0]) if gkeep_note.images else None,
        )

    @property
    def url(self):
        return f'https://keep.google.com/#NOTE/{self.id}'

    def to_json(self):
        dict_ = dataclasses.asdict(self)
        return {
            **dict_,
            'created': str(self.created),
            'url': self.url,
        }
