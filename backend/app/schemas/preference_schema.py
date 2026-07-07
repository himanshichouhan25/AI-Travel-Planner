from pydantic import BaseModel, ConfigDict, Field


class PreferenceCreate(BaseModel):
    preferred_destination_type: str = Field(
        ..., example="Mountains"
    )

    budget_range: str = Field(
        ..., example="20000-30000"
    )

    travel_style: str = Field(
        ..., example="Adventure"
    )


class PreferenceResponse(BaseModel):
    id: int
    user_id: int
    preferred_destination_type: str
    budget_range: str
    travel_style: str

    model_config = ConfigDict(
        from_attributes=True
    )