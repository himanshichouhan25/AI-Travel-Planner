from datetime import date, datetime
from pydantic import BaseModel


class TripCreate(BaseModel):
    destination: str
    budget: float
    start_date: date
    end_date: date


class TripResponse(BaseModel):
    id: int
    user_id: int
    destination: str
    budget: float
    start_date: date
    end_date: date
    status: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }