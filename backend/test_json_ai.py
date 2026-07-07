import os
import sys
import json

# Add the backend directory to sys.path so we can import app
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from app.tools.weather_tool import get_weather
from app.tools.hotel_tool import get_hotels
from app.tools.places_tool import get_places
from app.tools.budget_tool import calculate_budget
from app.services.ai_service import client, settings

destination = "Manali"
budget = 30000
days = 3
travel_style = "Luxury"

print("Fetching weather...")
weather_info = get_weather.run(destination)

print("Fetching hotels...")
hotels_info = get_hotels.run(destination)

print("Fetching attractions...")
places_info = get_places.run(destination)

print("Calculating budget...")
budget_info = calculate_budget.run(budget=budget, days=days, travel_style=travel_style)

# Construct prompt for structured JSON
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

print("Calling Groq with JSON Mode...")
try:
    response = client.chat.completions.create(
        model=settings.MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "You are a professional AI Travel Planner. You MUST return response in valid JSON mode.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        response_format={"type": "json_object"},
        temperature=0.3,
        max_tokens=2500,
    )
    
    result_text = response.choices[0].message.content
    print("\n--- JSON OUTPUT ---")
    data = json.loads(result_text)
    print(json.dumps(data, indent=2))
except Exception as e:
    print("Error:", e)
