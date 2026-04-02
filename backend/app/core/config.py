from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Alykul API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://alykul:alykul_secret@postgres:5432/alykul"

    # Redis
    REDIS_URL: str = "redis://redis:6379/0"

    # Auth
    SECRET_KEY: str = "change-me-in-production-use-openssl-rand-hex-32"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # WhatsApp
    WHATSAPP_NUMBER: str = "996555123456"

    # SMS (placeholder for Beeline/MegaCom API)
    SMS_API_URL: str = ""
    SMS_API_KEY: str = ""

    # Payment
    MBANK_API_URL: str = ""
    MBANK_API_KEY: str = ""
    OPTIMA_API_URL: str = ""
    OPTIMA_API_KEY: str = ""

    # AI / OpenRouter
    OPENROUTER_API_KEY: str = "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"

    # Frontend
    FRONTEND_URL: str = "https://alykul.baimuras.pro"

    class Config:
        env_file = ".env"


settings = Settings()
