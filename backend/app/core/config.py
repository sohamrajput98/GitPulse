import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    GITHUB_API_TOKEN: str = os.getenv("GITHUB_API_TOKEN", "")

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = "utf-8"

# Create a single instance of the settings to be used throughout the application
settings = Settings()