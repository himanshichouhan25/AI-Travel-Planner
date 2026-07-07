from crewai import Agent

from app.agents.config import llm
from app.tools.budget_tool import calculate_budget


budget_agent = Agent(
    role="Budget Planner",
    goal="Estimate the complete travel budget for the user.",
    backstory=(
        "You are an expert travel budget planner. "
        "You estimate hotel, food, transport, activities, "
        "and miscellaneous expenses while keeping the trip "
        "within the user's budget."
    ),
    llm=llm,
    tools=[calculate_budget],
    verbose=True,
)