from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from . import models, schemas

# Servers

async def get_servers(db: AsyncSession):
    result = await db.execute(select(models.Server))
    return result.scalars().all()

async def get_server(db: AsyncSession, server_id: int):
    result = await db.execute(select(models.Server).where(models.Server.id == server_id))
    return result.scalar_one_or_none()

# VMs

async def get_vms(db: AsyncSession):
    result = await db.execute(select(models.VM))
    return result.scalars().all()

async def create_vm(db: AsyncSession, vm: schemas.VMCreate):
    db_vm = models.VM(**vm.dict())
    db.add(db_vm)
    await db.commit()
    await db.refresh(db_vm)
    return db_vm

async def update_vm_status(db: AsyncSession, vm_id: int, status: bool):
    vm = await db.get(models.VM, vm_id)
    if vm:
        vm.status = status
        await db.commit()
        await db.refresh(vm)
    return vm

async def delete_vm(db: AsyncSession, vm_id: int):
    vm = await db.get(models.VM, vm_id)
    if vm:
        await db.delete(vm)
        await db.commit()
    return vm