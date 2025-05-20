from pydantic import BaseModel
from typing import Optional, List


class VMBase(BaseModel):
    name: str
    cpu: float
    ram: float


class VMCreate(VMBase):
    server_id: int


class VM(VMBase):
    id: int
    status: bool
    server_id: int

    class Config:
        orm_mode = True


class ServerBase(BaseModel):
    name: str


class Server(ServerBase):
    id: int
    status: bool
    temperature: float
    cpu_load: float
    ram_usage: float
    vms: List[VM] = []

    class Config:
        orm_mode = True