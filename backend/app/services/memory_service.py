from sqlalchemy.orm import Session

from app.models.trip import Trip
from app.models.preference import Preference


def get_recent_trips(db: Session, user_id: int, limit: int = 3):
    """
    Fetch only the most recent trips.
    """
    return (
        db.query(Trip)
        .filter(Trip.user_id == user_id)
        .order_by(Trip.created_at.desc())
        .limit(limit)
        .all()
    )


def get_user_preferences(db: Session, user_id: int):
    """
    Fetch user preferences.
    """
    return (
        db.query(Preference)
        .filter(Preference.user_id == user_id)
        .first()
    )


def build_memory_context(db: Session, user_id: int) -> str:
    """
    Build a compact memory context for CrewAI.
    """

    trips = get_recent_trips(db, user_id)
    preference = get_user_preferences(db, user_id)

    memory = []

    if preference:
        memory.append(
            f"Preferences: {preference.preferred_destination_type}, "
            f"Budget: {preference.budget_range}, "
            f"Style: {preference.travel_style}"
        )

    if trips:
        trip_summary = ", ".join(
            f"{trip.destination} (₹{trip.budget})"
            for trip in trips
        )
        memory.append(f"Recent Trips: {trip_summary}")

    if not memory:
        return "No previous travel history."

    return "\n".join(memory)