from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

# URL к базе из конфигурации
DATABASE_URL = settings.database_url

# Создание асинхронного движка
engine = create_async_engine(DATABASE_URL, echo=True, future=True)

# Создание асинхронной фабрики сессий
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Базовый класс для моделей
Base = declarative_base()

# Зависимость для FastAPI
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session