import dataclasses
import datetime
import os
from pathlib import Path

import frontmatter
from dateutil.parser import parse


SectionSettings = {
    "7-days": {
        "title": "Будни",
        "dates": "14.02",
    },
    "6-content": {
        "title": "Про контент",
        "dates": "10.02 - 11.02",
    },
    "5-ok": {
        "title": "Пока нормально",
        "dates": "06.02",
    },
    "4-depressive": {
        "title": "Депрессивный эпизод",
        "dates": "04.02 - 05.02",
    },
    "3-motivation": {
        "title": "Работа и мотивация",
        "dates": "31.01 - 02.02",
    },
    "2-break": {
        "title": "Перерывчик в две недели, хех, эксперименты с Кипом, ТГ, новым репо",
        "dates": "24.01, 27.01 - 29.01",
    },
    "1-again": {
        "title": "Проснулось желание делать блог, снова",
        "dates": "13.01 - 14.01, 15.01 - 16.01",
    },
}


def smart_truncate(text, max_chars=210, suffix="..."):
    """
    Smartly truncates the given text to fit within max_chars, ensuring not to split words.
    :param text: str - The input text to be truncated.
    :param max_chars: int - The maximum number of characters allowed.
    :param suffix: str - The string to append if the text is truncated.
    :return: str - The potentially truncated text.
    """
    if len(text) <= max_chars:
        return text
    else:
        return text[:max_chars].rsplit(" ", 1)[0] + suffix


@dataclasses.dataclass
class Note:
    key: str
    template_path: str
    # path: str
    title: str
    created: datetime.datetime
    desc: str
    next: str | None = None
    prev: str | None = None

    def __post_init__(self):
        if isinstance(self.created, datetime.date):
            self.created = datetime.datetime.combine(self.created, datetime.time())
        if not isinstance(self.created, datetime.datetime):
            self.created = parse(self.created)


@dataclasses.dataclass
class NoteSection:
    key: str
    notes: list[Note] = dataclasses.field(default_factory=list)
    title: str = ""
    dates: str = ""

    def __post_init__(self):
        if not self.title:
            self.title = self.key


def read_notes(notes_dir: str | Path) -> list[NoteSection]:
    tree = os.walk(notes_dir)
    _, section_keys, __ = next(tree)

    sections = []

    for section_index, section_key in enumerate(section_keys):
        section = NoteSection(section_key, **SectionSettings[section_key])

        dir_, __, filenames = next(tree)

        for file_ in filenames:
            path = Path(dir_) / file_
            md = frontmatter.load(path)
            note = Note(
                key=(note_key := file_.rsplit(".")[0]),
                # path=(note_path := f"{section_key}/{note_key}"),
                template_path=f"{os.path.basename(notes_dir)}/{section_key}/{note_key}.md",
                title=md["title"],
                created=md["created"],
                desc=smart_truncate(md.content),
            )
            section.notes.append(note)

        section.notes = sorted(
            section.notes, key=lambda note: note.created, reverse=True
        )

        sections.append(section)

    sections = list(reversed(sections))
    _set_notes_next_and_prev(sections)

    return sections


def _set_notes_next_and_prev(sections):
    for section_index, section in enumerate(sections):
        for note_index, note in enumerate(section.notes):
            if (is_last_note_in_section := note_index == 0) and (
                is_last_section := section_index == 0
            ):
                next_note = None
            elif is_last_note_in_section:
                next_note = sections[section_index - 1].notes[-1]
            else:
                next_note = section.notes[note_index - 1]
            if next_note:
                note.next = next_note.key

            if (is_first_note_in_section := note_index == len(section.notes) - 1) and (
                is_first_section := section_index == len(sections) - 1
            ):
                prev_note = None
            elif is_first_note_in_section:
                prev_note = sections[section_index + 1].notes[0]
            else:
                prev_note = section.notes[note_index + 1]
            if prev_note:
                note.prev = prev_note.key


if __name__ == "__main__":
    read_notes(Path("../content/notes").resolve())
