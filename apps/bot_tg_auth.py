import json
import os
from typing import TypedDict

from dotenv import load_dotenv
from telegram import Bot

from potyk_io_back.core.cf import Event, Resp
from potyk_io_back.core.config import BASE_DIR

import hashlib
import hmac


class TgAuth(TypedDict):
    id: int
    first_name: str
    last_name: str
    username: str
    photo_url: str
    auth_date: int
    hash: str


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

    tg_auth = json.loads(event["body"])

    res = await main(tg_auth)
    if res:
        return {"statusCode": 200, "body": "Hello World!"}
    else:
        return {"statusCode": 400, "body": "sosat"}


async def main(tg_auth):
    load_dotenv(BASE_DIR / ".env")

    bot_token = os.getenv("TG_POTYK_IO_BOT_TOKEN")
    chat_id = os.getenv("TG_BOT_CHAT_ID")

    if validate_hash(tg_auth, bot_token):
        await send_auth_to_tg(tg_auth, bot_token, chat_id)
        return True
    else:
        await send_auth_to_tg(tg_auth, bot_token, chat_id, msg="Failed to validate auth token")
        return False


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


async def send_auth_to_tg(tg_auth, TOKEN, chat_id, msg="New successful login"):
    bot = Bot(token=TOKEN)
    res = await bot.send_message(
        chat_id=chat_id,
        text="{}:\n```{}```".format(msg, json.dumps(tg_auth, indent=2, ensure_ascii=False)),
        parse_mode="MarkdownV2",
    )
    print(res)
