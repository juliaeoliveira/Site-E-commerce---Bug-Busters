"""
from sqlalchemy.orm import relationship
from sqlalchemy import Column,Integer,Float,Boolean,DateTime,ForeignKey
#importar a conexão com o sqlite do database.py
from database import Base,engine
#Importação date
from datetime import datetime

class Pedido(Base):
    __tablename__="pedido"
    id = Column(Integer,primary_key=True)
    data_pedido = Column(DateTime, default=datetime.utcnow)
    valor_total = Column(Float)
    status = Column(Boolean, default=True)
    #chave estrangeira
    cliente_id = Column(Integer, ForeignKey('cliente.cpf'), nullable=False)
    #relacionamento com a tabela cliente
    cliente = relationship("Cliente", back_populates="cliente")

#Criar tabela produtos no sqlite
Base.metadata.create_all(bind=engine)"""