from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.trip import Trip
from app.models.user import User
from app.schemas.trip_schema import TripCreate


def create_trip(
    trip: TripCreate,
    current_user: User,
    db: Session,
):
    new_trip = Trip(
        user_id=current_user.id,
        destination=trip.destination,
        budget=trip.budget,
        start_date=trip.start_date,
        end_date=trip.end_date,
    )

    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)

    return new_trip


def get_user_trips(
    current_user: User,
    db: Session,
):
    trips = (
        db.query(Trip)
        .filter(Trip.user_id == current_user.id)
        .order_by(Trip.created_at.desc())
        .all()
    )

    return trips


def get_trip_by_id(
    trip_id: int,
    current_user: User,
    db: Session,
):
    trip = (
        db.query(Trip)
        .filter(
            Trip.id == trip_id,
            Trip.user_id == current_user.id,
        )
        .first()
    )

    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found.",
        )

    return trip


def update_trip(
    trip_id: int,
    trip_data: TripCreate,
    current_user: User,
    db: Session,
):
    trip = (
        db.query(Trip)
        .filter(
            Trip.id == trip_id,
            Trip.user_id == current_user.id,
        )
        .first()
    )

    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found.",
        )

    trip.destination = trip_data.destination
    trip.budget = trip_data.budget
    trip.start_date = trip_data.start_date
    trip.end_date = trip_data.end_date

    db.commit()
    db.refresh(trip)

    return trip


def delete_trip(
    trip_id: int,
    current_user: User,
    db: Session,
):
    trip = (
        db.query(Trip)
        .filter(
            Trip.id == trip_id,
            Trip.user_id == current_user.id,
        )
        .first()
    )

    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found.",
        )

    db.delete(trip)
    db.commit()

    return {
        "message": "Trip deleted successfully."
    }