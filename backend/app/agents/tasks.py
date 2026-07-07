from crewai import Task

from app.agents.planner_agent import planner_agent


def planner_task(user_input: str, memory_context: str = ""):
    return Task(
        description=f"""
User Profile:
{memory_context}

Trip Request:
{user_input}

Use the available tools whenever needed.

Create a travel plan with:

1. Trip Overview
2. Current Weather
3. Top Attractions
4. Top 3 Hotels
5. Day-wise Itinerary
6. Budget Summary
7. Packing Checklist
8. Local Food
9. Travel Tips
10. Safety Tips

Keep the plan practical, realistic, and concise.
""",
        expected_output="""
A well-structured travel itinerary including:

- Overview
- Weather
- Attractions
- Hotels
- Day-wise Plan
- Budget
- Packing List
- Food Recommendations
- Travel Tips
- Safety Tips
""",
        agent=planner_agent,
    )