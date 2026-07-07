from pydantic import BaseModel, Field


class TravelPlanRequest(BaseModel):
    destination: str = Field(..., example="Manali")
    budget: float = Field(..., example=25000)
    days: int = Field(..., example=5)
    travel_style: str = Field(..., example="Adventure")


class TravelPlanResponse(BaseModel):
    itinerary: str