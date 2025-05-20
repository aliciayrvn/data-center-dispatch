from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix="/vms", tags=["vms"])

@router.get("/", response_model=list[schemas.VM])
async def list_vms(db: AsyncSession = Depends(get_db)):
    return await crud.get_vms(db)

@router.post("/", response_model=schemas.VM)
async def create_vm(vm: schemas.VMCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_vm(db, vm)

@router.put("/{vm_id}/start", response_model=schemas.VM)
async def start_vm(vm_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.update_vm_status(db, vm_id, True)

@router.put("/{vm_id}/stop", response_model=schemas.VM)
async def stop_vm(vm_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.update_vm_status(db, vm_id, False)

@router.delete("/{vm_id}", response_model=schemas.VM)
async def delete_vm(vm_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.delete_vm(db, vm_id)