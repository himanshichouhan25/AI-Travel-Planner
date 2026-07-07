from crewai import LLM

from app.config import settings

llm = LLM(
    model=f"groq/{settings.MODEL_NAME}",
    api_key=settings.GROQ_API_KEY,

    temperature=0.3,

    max_tokens=1200,
)