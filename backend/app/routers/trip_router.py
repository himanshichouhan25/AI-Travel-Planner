from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.trip_schema import TripCreate, TripResponse
from app.services.trip_service import (
    create_trip,
    get_user_trips,
    get_trip_by_id,
    update_trip,
    delete_trip,
)

router = APIRouter(
    prefix="/trips",
    tags=["Trips"],
)


@router.post(
    "",
    response_model=TripResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_trip(
    trip: TripCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_trip(trip, current_user, db)


@router.get(
    "",
    response_model=List[TripResponse],
)
def read_my_trips(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_user_trips(current_user, db)


@router.get(
    "/{trip_id}",
    response_model=TripResponse,
)
def read_trip(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_trip_by_id(trip_id, current_user, db)


@router.put(
    "/{trip_id}",
    response_model=TripResponse,
)
def edit_trip(
    trip_id: int,
    trip: TripCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_trip(
        trip_id,
        trip,
        current_user,
        db,
    )


@router.delete(
    "/{trip_id}",
)
def remove_trip(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return delete_trip(
        trip_id,
        current_user,
        db,
    )