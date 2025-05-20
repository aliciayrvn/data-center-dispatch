from fastapi import FastAPI
from app.routers import servers, vms
from app.database import Base, engine

app = FastAPI(title="Data Center Dispatch")

# Подключаем роутеры
app.include_router(servers.router)
app.include_router(vms.router)

# Создание таблиц при запуске
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)