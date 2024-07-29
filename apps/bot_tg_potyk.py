import hashlib
import hmac
import json
import os
import traceback
from io import BytesIO
from typing import TypedDict

import pydantic
from dotenv import load_dotenv
from pydantic import BaseModel
from pytubefix import YouTube
from telegram import Bot

from potyk_io_back.core.cf import Event, Resp
from potyk_io_back.core.config import BASE_DIR


class TgAuth(TypedDict):
    id: int
    first_name: str
    last_name: str
    username: str
    photo_url: str
    auth_date: int
    hash: str


class TgEntity(BaseModel):
    offset: int
    length: int
    type: str


class TgMessage(BaseModel):
    message_id: int
    text: str
    entities: list[TgEntity]


class TgUpdate(BaseModel):
    update_id: int
    message: TgMessage


async def handler(event: Event, context) -> Resp:
    if event["httpMethod"] == "OPTIONS":
        return {
            "statusCode": 200,
            "body": "ok",
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
            },
        }

    body = json.loads(event["body"])

    try:
        res = await main(body)
    except Exception as e:
        err = traceback.format_exc()
        await send_echo(err)
        return {"statusCode": 200, "body": err}
    else:
        if res:
            return {"statusCode": 200, "body": res}
        else:
            return {"statusCode": 400, "body": "sosat"}


async def main(body) -> str | None:
    if body.get("type") == "anon":
        return await anon_auth(body)

    if set(body.keys()) == {"id", "first_name", "last_name", "username", "photo_url", "auth_date", "hash"}:
        return await tg_auth(body)

    try:
        tg_update = TgUpdate(**body)
    except pydantic.ValidationError:
        ...
    else:
        await process_tg_update(tg_update)
        return "Ok"

    await send_echo(json.dumps(body, indent=2, ensure_ascii=False))
    return "Ok"
    #
    # elif :
    # else:
    #     await send_echo(body)
    #     return "Ok"

async def anon_auth(body):
    load_dotenv(BASE_DIR / ".env")

    bot_token = os.getenv("TG_POTYK_IO_BOT_TOKEN")
    chat_id = os.getenv("TG_BOT_CHAT_ID")

    await send_json_to_tg(body, bot_token, chat_id)
    return "True"


async def process_tg_update(tg_update: TgUpdate):
    command_ent = next((e for e in tg_update.message.entities if e.type == "bot_command"), None)
    if command_ent:
        command = tg_update.message.text[command_ent.offset : command_ent.offset + command_ent.length]
        if command == "/mp3":
            url_ent = next((e for e in tg_update.message.entities if e.type == "url"), None)
            if url_ent:
                url = tg_update.message.text[url_ent.offset : url_ent.offset + url_ent.length]
                await download_yt_as_mp3(url)


async def download_yt_as_mp3(url):
    """
    pytube {url} > mp3 > upload to tg
    """
    buffer = BytesIO()
    print(url)

    yt = YouTube(
        url, use_oauth=True, allow_oauth_cache=True, token_file=BASE_DIR / "__cache__" / "tokens.json"
    )
    yt.streams.filter(only_audio=True).order_by("abr").first().stream_to_buffer(buffer)

    load_dotenv(BASE_DIR / ".env")

    bot_token = os.getenv("TG_POTYK_IO_BOT_TOKEN")
    chat_id = os.getenv("TG_BOT_CHAT_ID")

    bot = Bot(token=bot_token)

    await bot.send_audio(chat_id=chat_id, audio=buffer.getvalue(), title=yt.title)


async def tg_auth(body):
    load_dotenv(BASE_DIR / ".env")

    bot_token = os.getenv("TG_POTYK_IO_BOT_TOKEN")
    chat_id = os.getenv("TG_BOT_CHAT_ID")

    if validate_hash(body, bot_token):
        await send_json_to_tg(body, bot_token, chat_id)
        return "True"
    else:
        await send_json_to_tg(body, bot_token, chat_id, msg="Failed to validate auth token")
        return None


async def send_echo(body):
    load_dotenv(BASE_DIR / ".env")

    bot_token = os.getenv("TG_POTYK_IO_BOT_TOKEN")
    chat_id = os.getenv("TG_BOT_CHAT_ID")

    bot = Bot(token=bot_token)
    res = await bot.send_message(
        chat_id=chat_id,
        text="```{}```".format(body),
        parse_mode="MarkdownV2",
    )
    print(res)


def validate_hash(tg_auth: TgAuth, bot_token: str) -> bool:
    """
    >>> tg_auth = TgAuth({
    ...   "id": 170653031,
    ...   "first_name": "Nikita",
    ...   "last_name": "Leybovich",
    ...   "username": "potykion",
    ...   "photo_url": "https://t.me/i/userpic/320/kZRjFa2_YxDfV4kebCnJC7bkap85DQK3eh-sRTQjDuo.jpg",
    ...   "auth_date": 1720444043,
    ...   "hash": "6d44c1214ab16b9f4f3ae09f760166cc51e11740293ca34089461e5eec09cb1b"
    ... })
    >>> validate_hash(tg_auth, os.environ.get('TG_BOT_TOKEN'))
    True
    """
    hash_ = tg_auth.pop("hash")
    data_check_string = "\n".join([f"{k}={tg_auth[k]}" for k in sorted(tg_auth.keys())]).encode("utf-8")
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    computed_hash = hmac.new(secret_key, data_check_string, digestmod=hashlib.sha256).hexdigest()
    return computed_hash == hash_


async def send_json_to_tg(json_obj, TOKEN, chat_id, msg="New successful login"):
    bot = Bot(token=TOKEN)
    res = await bot.send_message(
        chat_id=chat_id,
        text="{}:\n```{}```".format(msg, json.dumps(json_obj, indent=2, ensure_ascii=False)),
        parse_mode="MarkdownV2",
    )
    print(res)
