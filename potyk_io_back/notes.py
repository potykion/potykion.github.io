import datetime
import os
from pathlib import Path

import flask
import frontmatter
import mistune
import yaml
from bs4 import BeautifulSoup
from dateutil.parser import parse
from pydantic import BaseModel, Field, ConfigDict
from tinydb import TinyDB, Query
from yaml import Loader


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


class Note(BaseModel):
    key: str
    template_path: str
    # path: str
    title: str
    created: datetime.datetime
    desc: str
    next: str | None = None
    prev: str | None = None
    tags: list[str] = Field(default_factory=list)

    def __post_init__(self):
        if isinstance(self.created, datetime.date):
            self.created = datetime.datetime.combine(self.created, datetime.time())
        if not isinstance(self.created, datetime.datetime):
            self.created = parse(self.created)


class NoteSection(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    key: str
    notes: list[Note] = Field(default_factory=list)
    title: str = ""
    dates: str = ""

    def __post_init__(self):
        if not self.title:
            self.title = self.key


def make_note_index(notes_dir, db: TinyDB):
    sections = read_notes(notes_dir)
    db.truncate()
    db.insert_multiple([sec.model_dump(mode='json') for sec in sections])
    return db


def read_notes(notes_dir: str | Path) -> list[NoteSection]:
    tree = os.walk(notes_dir)
    _, section_keys, __ = next(tree)

    sections = []

    for section_index, section_key in enumerate(section_keys):
        dir_, __, filenames = next(tree)

        if 'meta.yml' in filenames:
            filenames = [file for file in filenames if file != 'meta.yml']
            with open(Path(dir_) / "meta.yml", encoding="utf-8") as f:
                section_settings = yaml.load(f, Loader=Loader)
        else:
            section_settings = {}

        section = NoteSection(key=section_key, **section_settings)


        for file_ in filenames:
            note_key = file_.rsplit(".")[0]
            path = Path(dir_) / file_

            md = frontmatter.load(path)
            template_path = f"{notes_dir.name}/{section_key}/{note_key}.md"
            rendered_md = flask.render_template_string(md.content)
            html = mistune.html(rendered_md)
            soup = BeautifulSoup(html, features="html.parser")
            text = soup.get_text()
            note = Note(
                key=note_key,
                template_path=template_path,
                title=md["title"],
                created=md["created"],
                desc=smart_truncate(text),
                tags=md.get('tags') or [],
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


class NoteDb:
    def __init__(self, db: TinyDB):
        self.db = db

    def list_all(self) -> list[NoteSection]:
        return [NoteSection.model_validate(sec) for sec in self.db.all()]

    def get_last_section(self) -> NoteSection:
        return NoteSection.model_validate(self.db.all()[0])

    def get_note_by_key(self, note_key) -> Note:
        SectionQ = Query()
        NoteQ = Query()
        raw_section = self.db.get(SectionQ.notes.any(NoteQ.key == note_key))
        section = NoteSection.model_validate(raw_section)
        note = next(note for note in section.notes if note.key == note_key)
        return note

