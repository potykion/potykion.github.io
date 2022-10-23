import dataclasses
import json
import os
from typing import Optional, List

import keyring
from gkeepapi import Keep
from keyring.errors import NoKeyringError

from .dir_ import DATA_DIR
from .models import GKeepNote
from .monads import Err, Ok, Result


@dataclasses.dataclass()
class KeepCli:
    keep: Keep = dataclasses.field(init=False)

    def setup(self):
        self.keep = _KeepSetup()()
        return self

    def notes(self, label: str) -> List[GKeepNote]:
        keep_notes = self.keep.find(labels=[self.keep.findLabel(label)])
        return [GKeepNote.from_gkeep(note, self.keep) for note in keep_notes]


@dataclasses.dataclass()
class _KeepSetup:
    username: str = dataclasses.field(default_factory=lambda: os.environ['GOOGLE_EMAIL'])
    password: str = dataclasses.field(default_factory=lambda: os.environ['GOOGLE_APP_PASS'])
    keep_state_path = os.path.join(DATA_DIR, 'keep_state.json')

    def __call__(self) -> Keep:
        return (
            self._from_cache(Keep())
            .or_else(self._from_token)
            .or_else(self._from_pass)
            .and_then(self._set_token)
            # .and_then(self._cache)
            .unwrap()
        )

    def _from_cache(self, keep) -> Result[Keep]:
        if os.path.exists(self.keep_state_path):
            try:
                with open(self.keep_state_path, 'r') as fh:
                    state = json.load(fh)
                    keep.restore(state)
                    return Ok(keep)
            except OSError:
                pass

        return Err(keep)

    def _from_token(self, keep: Keep) -> Result[Keep]:
        try:
            token = keyring.get_password('google-keep-token', self.username)
        except NoKeyringError:
            token = None

        if token:
            keep.resume(self.username, token)
            return Ok(keep)
        else:
            return Err(keep)

    def _from_pass(self, keep: Keep) -> Result[Keep]:
        keep.login(self.username, self.password)
        return Ok(keep)

    def _set_token(self, keep: Keep) -> Result[Keep]:
        try:
            keyring.set_password('google-keep-token', self.username, keep.getMasterToken())
        except (NoKeyringError, AttributeError):
            pass
        return Ok(keep)

    def _cache(self, keep: Keep) -> Result[Keep]:
        try:
            with open(self.keep_state_path, 'w') as fh:
                state = keep.dump()
                json.dump(state, fh)
        except OSError:
            pass

        return Ok(keep)
