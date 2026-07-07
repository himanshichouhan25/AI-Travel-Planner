from app.tools.budget_tool import calculate_budget

print(
    calculate_budget.run(
        budget=30000,
        days=5,
        travel_style="Luxury"
    )
)