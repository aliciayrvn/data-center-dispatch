from fastapi import FastAPI
from app.routers import servers, vms, auth
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Data Center Dispatch")

# Подключаем роутеры
app.include_router(servers.router)
app.include_router(vms.router)
app.include_router(auth.router)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # или ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создание таблиц при запуске
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)