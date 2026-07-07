import requests
import json

base_url = "http://localhost:8000"

# Step 1: Register a test user (handle if user already exists)
signup_payload = {
    "username": "tester123",
    "email": "tester123@example.com",
    "password": "Password123!"
}
print("Registering user...")
r_signup = requests.post(f"{base_url}/auth/signup", json=signup_payload)
print("Signup Response Status:", r_signup.status_code)
print("Signup Response:", r_signup.text)

# Step 2: Login to get JWT token
login_payload = {
    "username": "tester123@example.com",
    "password": "Password123!"
}
print("\nLogging in...")
# FastAPI OAuth2 expects application/x-www-form-urlencoded (form-data)
r_login = requests.post(f"{base_url}/auth/login", data=login_payload)
print("Login Response Status:", r_login.status_code)

if r_login.status_code == 200:
    token = r_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # Step 3: Call plan-trip endpoint
    plan_payload = {
        "destination": "Goa",
        "budget": 20000,
        "days": 2,
        "travel_style": "Solo"
    }
    print("\nCalling plan-trip API...")
    r_plan = requests.post(f"{base_url}/ai/plan-trip", json=plan_payload, headers=headers)
    print("Plan Trip Status:", r_plan.status_code)
    try:
        res_data = r_plan.json()
        print("\nSuccess:", res_data.get("success"))
        print("Message:", res_data.get("message"))
        print("\nStructured Plan Preview:")
        print(json.dumps(res_data["data"]["structured_plan"], indent=2)[:500] + "...")
    except Exception as e:
        print("Response Parsing Error:", e)
        print("Raw Response:", r_plan.text)
else:
    print("Login failed.")
