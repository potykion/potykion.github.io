import os
from typing import TypedDict, Optional

from google.oauth2 import id_token
from google.auth.transport import requests


class AuthInfo(TypedDict):
    iss: str
    nbf: int
    aud: str
    sub: str
    email: str
    email_verified: bool
    azp: str
    name: str
    picture: str
    given_name: str
    family_name: str
    iat: int
    exp: int
    jti: str


def validate_token(token) -> Optional[AuthInfo]:
    """https://developers.google.com/identity/gsi/web/guides/verify-google-id-token"""
    try:
        return id_token.verify_oauth2_token(
            token,
            requests.Request(),
            os.environ['GOOGLE_CLIENT_ID']
        )
    except ValueError:
        return None
