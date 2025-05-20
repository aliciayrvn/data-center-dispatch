from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix="/servers", tags=["servers"])

@router.get("/", response_model=list[schemas.Server])
async def list_servers(db: AsyncSession = Depends(get_db)):
    return await crud.get_servers(db)

@router.get("/{server_id}", response_model=schemas.Server)
async def get_server(server_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.get_server(db, server_id)