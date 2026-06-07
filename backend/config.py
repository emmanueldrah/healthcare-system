import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "MediCore"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 8  # 8 hours
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://medicore:medicore_pass@localhost:5432/medicore")

    class Config:
        case_sensitive = True

settings = Settings()
