from crewai import Crew, Process

from app.agents.planner_agent import planner_agent
from app.agents.tasks import planner_task


def run_travel_crew(
    user_input: str,
    memory_context: str = "",
):
    """
    Execute the AI Travel Planner Crew.
    """

    task = planner_task(
        user_input=user_input,
        memory_context=memory_context,
    )

    crew = Crew(
        agents=[planner_agent],
        tasks=[task],
        process=Process.sequential,
        verbose=False,
    )

    return crew.kickoff()