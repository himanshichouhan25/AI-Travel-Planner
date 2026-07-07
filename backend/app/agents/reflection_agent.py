from crewai import Agent

from app.agents.config import llm


reflection_agent = Agent(
    role="Travel Reviewer",
    goal="Review and improve travel plans.",
    backstory=(
        "You analyze itineraries, detect missing information, "
        "remove inconsistencies, and improve overall quality."
    ),
    llm=llm,
    verbose=True,
)