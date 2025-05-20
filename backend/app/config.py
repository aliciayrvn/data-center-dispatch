from pydantic_settings import BaseSettings  # вместо pydantic

class Settings(BaseSettings):
    database_url: str

    class Config:
        env_file = ".env"

settings = Settings()