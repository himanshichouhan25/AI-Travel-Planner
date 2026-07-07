from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.preference import Preference
from app.models.user import User
from app.schemas.preference_schema import PreferenceCreate


def create_or_update_preference(
    preference: PreferenceCreate,
    current_user: User,
    db: Session,
):
    existing_preference = (
        db.query(Preference)
        .filter(Preference.user_id == current_user.id)
        .first()
    )

    if existing_preference:
        existing_preference.preferred_destination_type = (
            preference.preferred_destination_type
        )
        existing_preference.budget_range = (
            preference.budget_range
        )
        existing_preference.travel_style = (
            preference.travel_style
        )

        db.commit()
        db.refresh(existing_preference)

        return existing_preference

    new_preference = Preference(
        user_id=current_user.id,
        preferred_destination_type=preference.preferred_destination_type,
        budget_range=preference.budget_range,
        travel_style=preference.travel_style,
    )

    db.add(new_preference)
    db.commit()
    db.refresh(new_preference)

    return new_preference


def get_user_preference(
    current_user: User,
    db: Session,
):
    preference = (
        db.query(Preference)
        .filter(Preference.user_id == current_user.id)
        .first()
    )

    if not preference:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Preference not found.",
        )

    return preference