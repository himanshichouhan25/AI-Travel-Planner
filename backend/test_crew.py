import os
import sys

# Add the backend directory to sys.path so we can import app
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from app.agents.crew import run_travel_crew

user_input = "Destination: Manali, Budget: 30000, Days: 3, Travel Style: Luxury"
memory_context = "User likes scenic places and prefers hotel stays."

print("Running travel crew...")
result = run_travel_crew(user_input=user_input, memory_context=memory_context)
print("\n--- CREW RESULT ---")
print(result)
