import requests

from crewai.tools import tool

from app.config import settings


@tool("Hotel Tool")
def get_hotels(city: str) -> str:
    """
    Returns the top nearby hotels for a given city using
    Geoapify Geocoding API and Places API.
    """

    try:
        # ------------------------------------------
        # Step 1: Get Latitude & Longitude
        # ------------------------------------------

        geocode_url = "https://api.geoapify.com/v1/geocode/search"

        geocode_params = {
            "text": city,
            "apiKey": settings.GEOAPIFY_API_KEY,
        }

        geo_response = requests.get(
            geocode_url,
            params=geocode_params,
            timeout=10,
        )

        geo_response.raise_for_status()

        geo_data = geo_response.json()

        if not geo_data.get("features"):
            return f"❌ No location found for '{city}'."

        properties = geo_data["features"][0]["properties"]

        lat = properties["lat"]
        lon = properties["lon"]

        # ------------------------------------------
        # Step 2: Search Hotels
        # ------------------------------------------

        places_url = "https://api.geoapify.com/v2/places"

        places_params = {
            "categories": "accommodation.hotel",
            "filter": f"circle:{lon},{lat},5000",
            "limit": 5,
            "apiKey": settings.GEOAPIFY_API_KEY,
        }

        places_response = requests.get(
            places_url,
            params=places_params,
            timeout=10,
        )

        places_response.raise_for_status()

        places_data = places_response.json()

        if not places_data.get("features"):
            return f"❌ No hotels found near {city}."

        # ------------------------------------------
        # Step 3: Format Result
        # ------------------------------------------

        hotels = []

        for index, feature in enumerate(
            places_data["features"],
            start=1,
        ):

            prop = feature.get("properties", {})

            name = prop.get("name", "Unknown Hotel")

            address = prop.get(
                "formatted",
                "Address not available",
            )

            hotels.append(
                f"""
{index}. 🏨 {name}
📍 {address}
"""
            )

        return f"""
🏨 Top Hotels in {city}

{''.join(hotels)}
"""

    except requests.exceptions.RequestException as e:
        return f"❌ API Error: {str(e)}"

    except Exception as e:
        return f"❌ Error: {str(e)}"