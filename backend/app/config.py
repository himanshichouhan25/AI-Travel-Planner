from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ==========================
    # Database
    # ==========================
    DATABASE_URL: str

    # ==========================
    # JWT Authentication
    # ==========================
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # ==========================
    # Groq
    # ==========================
    GROQ_API_KEY: str
    MODEL_NAME: str

    # ==========================
    # OpenWeather
    # ==========================
    WEATHER_API_KEY: str
    WEATHER_BASE_URL: str

    # ==========================
    # Geoapify
    # ==========================
    GEOAPIFY_API_KEY: str
    GEOAPIFY_BASE_URL: str = "https://api.geoapify.com/v2"

    # ==========================
    # CORS
    # ==========================
    ALLOWED_ORIGINS: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()