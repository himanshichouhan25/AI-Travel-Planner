from typing import List, Optional
from pydantic import BaseModel, Field


class TravelPlanRequest(BaseModel):
    destination: str = Field(..., example="Manali")
    budget: float = Field(..., example=25000)
    days: int = Field(..., example=5)
    travel_style: str = Field(..., example="Adventure")


class TravelPlanResponse(BaseModel):
    itinerary: str


class ChatMessageItem(BaseModel):
    role: str = Field(..., description="Role of the speaker: user, assistant, or system")
    content: str = Field(..., description="Text content of the message")


class AIChatRequest(BaseModel):
    message: str = Field(..., description="The user's current message or question")
    conversation_history: Optional[List[ChatMessageItem]] = Field(
        default_factory=list,
        description="Previous messages exchanged in this session for conversational memory"
    )


class AIChatResponse(BaseModel):
    response: str = Field(..., description="AI generated response text")