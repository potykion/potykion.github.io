import datetime

from pydantic import BaseModel


class Event(BaseModel):
    id: int
    title: str
    desc: str
    date: datetime.date
    url: str

    @property
    def title_w_date(self):
        return f"{self.date.strftime('%d.%m')} • {self.title}"
