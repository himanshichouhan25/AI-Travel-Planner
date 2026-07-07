from crewai.tools import tool


@tool("Budget Tool")
def calculate_budget(
    budget: int,
    days: int,
    travel_style: str = "Standard"
) -> str:
    """
    Calculate a smart budget breakdown based on
    budget, days and travel style.
    """

    travel_style = travel_style.lower()

    if travel_style == "budget":
        hotel = 0.30
        food = 0.25
        transport = 0.20
        activities = 0.15
        miscellaneous = 0.10

    elif travel_style == "luxury":
        hotel = 0.50
        food = 0.20
        transport = 0.15
        activities = 0.10
        miscellaneous = 0.05

    else:
        hotel = 0.40
        food = 0.20
        transport = 0.20
        activities = 0.15
        miscellaneous = 0.05

    hotel_cost = budget * hotel
    food_cost = budget * food
    transport_cost = budget * transport
    activities_cost = budget * activities
    misc_cost = budget * miscellaneous

    budget_per_day = budget / days

    return f"""
==============================
TRIP BUDGET SUMMARY
==============================

💰 Total Budget: ₹{budget}

📅 Duration: {days} Days

🎒 Travel Style: {travel_style.title()}

📈 Budget Per Day: ₹{budget_per_day:.2f}

--------------------------------

🏨 Hotel:
₹{hotel_cost:.2f}

🍽 Food:
₹{food_cost:.2f}

🚗 Transport:
₹{transport_cost:.2f}

🎯 Activities:
₹{activities_cost:.2f}

🛍 Miscellaneous:
₹{misc_cost:.2f}

--------------------------------

Daily Average

🏨 Hotel/day:
₹{hotel_cost/days:.2f}

🍽 Food/day:
₹{food_cost/days:.2f}

🚗 Transport/day:
₹{transport_cost/days:.2f}

🎯 Activities/day:
₹{activities_cost/days:.2f}

🛍 Misc/day:
₹{misc_cost/days:.2f}

--------------------------------

💡 Budget Tips

• Keep 5-10% extra for emergencies.
• Book hotels in advance.
• Use local transport whenever possible.
• Keep digital and cash payments both available.

==============================
"""