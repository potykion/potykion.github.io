import json
from unittest import mock

import pytest

from src.api_cli import KeepCli
from src.cases import Mode, ListNotes, UpdateNote, CreateNote
from src.models import GKeepNote


@pytest.mark.parametrize(
    'event, mode_type, mode_case_cls',
    [
        ({'queryStringParameters': {'mode': 'daily'}}, 'daily', ListNotes),
        (
            {
                'queryStringParameters': {'mode': 'update'},
                'body': json.dumps({
                    'note_text': 'new_text',
                    'note_id': 'ass',
                }),
                'headers': {'Kb-Authorization': 'sam'},
            }, 'update', UpdateNote
        ),
        (
            {
                'queryStringParameters': {'mode': 'create'},
                'body': json.dumps({
                    'note_text': 'new_text',
                    'note_type': 'daily',
                }),
                'headers': {'Kb-Authorization': 'sam'},
            }, 'create', CreateNote
        )

    ]
)
def test_mode(event, mode_type, mode_case_cls):
    mode = Mode.from_event(event)

    assert mode.mode_type == mode_type
    assert isinstance(mode.mode_case, mode_case_cls)


@mock.patch.object(KeepCli, 'setup')
def test_ListNotes(_):
    note = GKeepNote(id='sam', text='sam')
    with mock.patch.object(KeepCli, 'notes', return_value=[note]):
        ListNotes()().as_response == [note.to_json()]


@mock.patch('src.auth.validate_token', return_value={'email': 'potykion@gmail.com'})
def test_UpdateNote(validate_token_mock: mock.MagicMock):
    note_id = 'note_id'
    note_text = 'note_text'
    user_token = 'user_token'

    keep_cli_mock = mock.MagicMock()
    update_note_mock: mock.MagicMock = keep_cli_mock.update_note
    update_note_mock.return_value = None

    res = (
        UpdateNote(note_id=note_id, note_text=note_text, user_token=user_token)
        (keep_cli_mock)
    )

    validate_token_mock.assert_called_with(user_token)
    update_note_mock.assert_called_with(note_id, note_text)
    assert res.as_response == ({}, 200)


@mock.patch('src.auth.validate_token', return_value={'email': 'potykion@gmail.com'})
def test_CreateNote(validate_token_mock: mock.MagicMock):
    note_type = 'daily'
    note_text = 'note_text'
    user_token = 'user_token'

    keep_cli_mock = mock.MagicMock()
    create_note_mock: mock.MagicMock = keep_cli_mock.create_note
    create_note_mock.return_value = 'id'

    res = (
        CreateNote(note_type=note_type, note_text=note_text, user_token=user_token)
        (keep_cli_mock)
    )

    validate_token_mock.assert_called_with(user_token)
    create_note_mock.assert_called_with(note_type, note_text)
    assert res.as_response == ({'id': 'id'}, 200)
