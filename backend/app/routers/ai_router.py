import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.ai_schema import (
    TravelPlanRequest,
    AIChatRequest,
    AIChatResponse,
)
from app.core.dependencies import get_current_user, get_optional_current_user
from app.models.user import User

from app.tools.weather_tool import get_weather
from app.tools.hotel_tool import get_hotels
from app.tools.places_tool import get_places
from app.tools.budget_tool import calculate_budget
from app.services.ai_service import client, settings, chat_with_assistant

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post("/chat", response_model=AIChatResponse)
def ai_chat(
    data: AIChatRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user),
):
    """
    Conversational AI Travel Assistant endpoint.
    Maintains conversation memory, accesses user trip/preferences context when authenticated,
    fetches live weather data when applicable, and responds naturally to both travel and general queries.
    """
    try:
        reply = chat_with_assistant(
            message=data.message,
            conversation_history=data.conversation_history,
            current_user=current_user,
            db=db,
        )
        return AIChatResponse(response=reply)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Chat error: {str(e)}",
        )



@router.post("/plan-trip")
def plan_trip(
    data: TravelPlanRequest,
    current_user: User = Depends(get_current_user),
):
    """
    AI Planner endpoint. Fetches real-time tool data (weather, hotels, places, budget)
    and uses Groq LLM in JSON mode to generate a highly detailed and tailored itinerary.
    """
    destination = data.destination
    budget = data.budget
    days = data.days
    travel_style = data.travel_style

    try:
        # ----------------------------------------------------
        # Step 1: Programmatically call the integration tools
        # ----------------------------------------------------
        weather_info = get_weather.run(destination)
        hotels_info = get_hotels.run(destination)
        places_info = get_places.run(destination)
        budget_info = calculate_budget.run(budget=budget, days=days, travel_style=travel_style)

        # ----------------------------------------------------
        # Step 2: Query Groq API directly in JSON Mode
        # ----------------------------------------------------
        prompt = f"""
Generate a detailed travel itinerary based on the following real-time data:

Destination: {destination}
Budget: {budget}
Duration: {days} Days
Travel Style: {travel_style}

Real-time Weather Info:
{weather_info}

Recommended Hotels:
{hotels_info}

Top Sights & Attractions:
{places_info}

Budget Breakdown:
{budget_info}

You MUST return a JSON object with the following exact structure:
{{
  "overview": "A summary description of the trip destination and plan",
  "weather_summary": "Short description of the weather and what it means for packing",
  "packing_list": ["item 1", "item 2", "item 3"],
  "hotels": [
    {{
      "name": "Hotel Name",
      "address": "Hotel Address",
      "reason": "Why this hotel fits the style and budget"
    }}
  ],
  "itinerary": [
    {{
      "day": 1,
      "title": "Day Title (e.g. Arrival & Sightseeing)",
      "activities": [
        {{
          "time": "e.g. 10:00 AM",
          "description": "Activity description",
          "location": "Location name"
        }}
      ]
    }}
  ],
  "budget_tips": ["tip 1", "tip 2"],
  "travel_safety_tips": ["tip 1", "tip 2"]
}}
"""

        response = client.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional AI Travel Planner. You MUST return response in valid JSON mode matching the requested schema.",
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            response_format={"type": "json_object"},
            temperature=0.3,
            max_tokens=2000,
        )

        result_text = response.choices[0].message.content
        structured_data = json.loads(result_text)

        # ----------------------------------------------------
        # Step 3: Format fallback markdown travel_plan string
        # ----------------------------------------------------
        overview = structured_data.get("overview", "")
        weather_summary = structured_data.get("weather_summary", "")
        packing_list = "\n".join([f"- {item}" for item in structured_data.get("packing_list", [])])
        hotels_md = "\n".join([f"- **{h['name']}**: {h['reason']}\n  📍 {h['address']}" for h in structured_data.get("hotels", [])])
        
        itinerary_md = ""
        for day in structured_data.get("itinerary", []):
            itinerary_md += f"\n### {day['title']}\n"
            for act in day.get("activities", []):
                itinerary_md += f"- **{act['time']}** - {act['description']} at *{act['location']}*\n"
                
        budget_tips = "\n".join([f"- {item}" for item in structured_data.get("budget_tips", [])])
        travel_safety_tips = "\n".join([f"- {item}" for item in structured_data.get("travel_safety_tips", [])])

        travel_plan = f"""
## Trip Overview
{overview}

## Weather & Packing Checklist
{weather_summary}
### Packing List:
{packing_list}

## Hotel Recommendations
{hotels_md}

## Day-wise Itinerary
{itinerary_md}

## Budget & Cost-Saving Tips
{budget_tips}

## Travel & Safety Tips
{travel_safety_tips}
"""

        # Return successfully compiled schema
        return {
            "success": True,
            "message": "Travel plan generated successfully!",
            "data": {
                "destination": destination,
                "budget": budget,
                "days": days,
                "travel_style": travel_style,
                "status": "Generated",
                "travel_plan": travel_plan.strip(),
                "structured_plan": structured_data
            },
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate travel plan: {str(e)}"
        )