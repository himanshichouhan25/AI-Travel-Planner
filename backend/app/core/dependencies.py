from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.core.security import verify_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    print("\n" + "=" * 60)
    print("DEBUG: get_current_user() called")
    print("TOKEN RECEIVED:", token)

    payload = verify_access_token(token)
    print("PAYLOAD:", payload)

    if payload is None:
        print("ERROR: Token is invalid or expired")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user_id = payload.get("sub")
    print("USER_ID:", user_id)

    if user_id is None:
        print("ERROR: User ID not found in token payload")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    print("USER:", user)

    if user is None:
        print("ERROR: User not found in database")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    print("SUCCESS: Authentication successful")
    print("=" * 60 + "\n")

    return user