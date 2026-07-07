from crewai import Agent

from app.agents.config import llm

from app.tools.weather_tool import get_weather
from app.tools.places_tool import get_places
from app.tools.hotel_tool import get_hotels
from app.tools.budget_tool import calculate_budget


planner_agent = Agent(
    role="AI Travel Planner",

    goal=(
        "Create a personalized, realistic travel itinerary within the user's "
        "budget using available tools."
    ),

    backstory=(
        "You are an expert travel planner. "
        "Use weather, attractions, hotels, and budget information "
        "to create practical travel plans."
    ),

    llm=llm,

    tools=[
        get_weather,
        get_places,
        get_hotels,
        calculate_budget,
    ],

    allow_delegation=False,

    verbose=False,
)