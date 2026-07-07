from groq import Groq

from app.config import settings

# Create Groq Client
client = Groq(api_key=settings.GROQ_API_KEY)


def ask_ai(prompt: str) -> str:
    """
    Send a prompt to Groq and return the response.
    """

    try:
        response = client.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert AI Travel Planner. "
                        "Generate detailed, helpful and accurate travel plans."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.7,
            max_tokens=1500,
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Error: {str(e)}"