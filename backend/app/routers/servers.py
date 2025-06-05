from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from .. import crud, schemas
from app.utils.monitor import get_local_server_info, get_remote_server_info
from typing import List

router = APIRouter(prefix="/servers", tags=["servers"])

# @router.get("/", response_model=list[schemas.Server])
# async def list_servers(db: AsyncSession = Depends(get_db)):
#     return await crud.get_servers(db)
@router.get("/", response_model=List[schemas.Server])
async def list_servers(db: AsyncSession = Depends(get_db)):
    servers = await crud.get_servers(db)
    servers_data = [s.__dict__ for s in servers]
    # Добавляем локальный сервер
    servers_data.insert(0, get_local_server_info())
    # Добавляем данные с другого сервера (например, 192.168.1.42)
    servers_data.append(get_remote_server_info("192.168.0.17"))
    return servers_data

@router.get("/{server_id}", response_model=schemas.Server)
async def get_server(server_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.get_server(db, server_id)