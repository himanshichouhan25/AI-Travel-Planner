from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.preference_schema import (
    PreferenceCreate,
    PreferenceResponse,
)
from app.services.preference_service import (
    create_or_update_preference,
    get_user_preference,
)

router = APIRouter(
    prefix="/preferences",
    tags=["Preferences"],
)


@router.post(
    "",
    response_model=PreferenceResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_preference(
    preference: PreferenceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_or_update_preference(
        preference,
        current_user,
        db,
    )


@router.get(
    "",
    response_model=PreferenceResponse,
)
def read_preference(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_user_preference(
        current_user,
        db,
    )