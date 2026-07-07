import os
import sys

# Add the backend directory to sys.path so we can import app
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from app.tools.weather_tool import get_weather
from app.tools.hotel_tool import get_hotels
from app.tools.places_tool import get_places
from app.tools.budget_tool import calculate_budget
from app.services.ai_service import ask_ai

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

Please generate a well-structured and comprehensive travel plan including:
1. Overview
2. Weather summary & packing checklist
3. Hotel recommendations (explaining why they fit the style)
4. Day-wise Itinerary (with estimated times, activities, and local food recommendations)
5. Budget breakdown & cost-saving tips
6. Travel & Safety tips
"""

print("Calling Groq API directly...")
result = ask_ai(prompt)
print("\n--- DIRECT GENERATION RESULT ---")
print(result)
