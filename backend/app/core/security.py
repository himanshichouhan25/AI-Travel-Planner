from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import jwt
from passlib.context import CryptContext

from app.config import settings

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str,
):
    return pwd_context.verify(
        plain_password,
        hashed_password,
    )


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    print("\n" + "=" * 70)
    print("CREATING TOKEN")
    print("SECRET_KEY :", settings.SECRET_KEY)
    print("ALGORITHM  :", settings.ALGORITHM)
    print("PAYLOAD    :", to_encode)

    token = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )

    print("TOKEN CREATED SUCCESSFULLY")
    print("=" * 70 + "\n")

    return token


def verify_access_token(token: str) -> Optional[dict]:
    try:
        print("\n" + "=" * 70)
        print("VERIFYING TOKEN")
        print("SECRET_KEY :", settings.SECRET_KEY)
        print("ALGORITHM  :", settings.ALGORITHM)
        print("TOKEN      :", token)

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        print("TOKEN VERIFIED SUCCESSFULLY")
        print("PAYLOAD :", payload)
        print("=" * 70 + "\n")

        return payload

    except Exception as e:
        print("\n" + "=" * 70)
        print("JWT ERROR OCCURRED")
        print("ERROR TYPE :", type(e).__name__)
        print("ERROR      :", str(e))
        print("SECRET_KEY :", settings.SECRET_KEY)
        print("ALGORITHM  :", settings.ALGORITHM)
        print("TOKEN      :", token)
        print("=" * 70 + "\n")

        return None