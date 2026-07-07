import requests

from crewai.tools import tool

from app.config import settings


@tool("Places Tool")
def get_places(city: str) -> str:
    """
    Returns top tourist attractions for a city using Geoapify.
    """

    try:
        # ==========================
        # STEP 1: Get Place Details
        # ==========================

        geocode_url = (
            "https://api.geoapify.com/v1/geocode/search"
            f"?text={city}"
            "&limit=1"
            "&format=json"
            f"&apiKey={settings.GEOAPIFY_API_KEY}"
        )

        geo_response = requests.get(geocode_url, timeout=10)
        geo_response.raise_for_status()

        geo_data = geo_response.json()

        results = geo_data.get("results", [])

        if not results:
            return f"City '{city}' not found."

        place_id = results[0].get("place_id")

        if not place_id:
            return f"Place ID not found for '{city}'."

        # ==========================
        # STEP 2: Get Tourist Places
        # ==========================

        places_url = (
            "https://api.geoapify.com/v2/places"
            "?categories=tourism.attraction,tourism.sights"
            f"&filter=place:{place_id}"
            "&limit=10"
            f"&apiKey={settings.GEOAPIFY_API_KEY}"
        )

        response = requests.get(places_url, timeout=10)

        print("\nPlaces URL:")
        print(places_url)

        print("\nStatus Code:")
        print(response.status_code)

        print("\nResponse:")
        print(response.text)

        response.raise_for_status()

        data = response.json()

        features = data.get("features", [])

        if not features:
            return f"No tourist attractions found in {city}."

        result = f"\nTop Tourist Attractions in {city}\n\n"

        for i, feature in enumerate(features, start=1):

            props = feature.get("properties", {})

            name = props.get("name", "Unknown Place")

            address = props.get(
                "formatted",
                "Address not available",
            )

            result += (
                f"{i}. {name}\n"
                f"   📍 {address}\n\n"
            )

        return result

    except requests.exceptions.RequestException as e:
        return f"Geoapify API Error:\n{e}"

    except Exception as e:
        return f"Unexpected Error:\n{e}"