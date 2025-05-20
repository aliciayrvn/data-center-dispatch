from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from .database import Base

class Server(Base):
    __tablename__ = "servers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    status = Column(Boolean, default=True)
    temperature = Column(Float)
    cpu_load = Column(Float)
    ram_usage = Column(Float)

    vms = relationship("VM", back_populates="server")


class VM(Base):
    __tablename__ = "vms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    status = Column(Boolean, default=False)
    cpu = Column(Float)
    ram = Column(Float)

    server_id = Column(Integer, ForeignKey("servers.id"))
    server = relationship("Server", back_populates="vms")