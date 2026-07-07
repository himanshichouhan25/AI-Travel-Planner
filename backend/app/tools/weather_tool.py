import requests

from crewai.tools import tool

from app.config import settings


@tool("Weather Tool")
def get_weather(city: str) -> str:
    """
    Returns current weather information for a city.
    """

    url = (
        f"{settings.WEATHER_BASE_URL}/weather"
        f"?q={city}"
        f"&appid={settings.WEATHER_API_KEY}"
        f"&units=metric"
    )

    response = requests.get(url, timeout=10)
    print("Status Code:", response.status_code)
    print("Response:", response.text)

    if response.status_code != 200:
        return "Unable to fetch weather."

    data = response.json()

    temp = data["main"]["temp"]
    humidity = data["main"]["humidity"]
    weather = data["weather"][0]["description"]
    wind = data["wind"]["speed"]

    return (
        f"""
Current Weather for {city}

Temperature: {temp}°C
Condition: {weather}
Humidity: {humidity}%
Wind Speed: {wind} m/s
"""
    )