"""from sqlalchemy.orm import relationship
from sqlalchemy import Column,String,DateTime
#importar a conexão com o sqlite do database.py
from database import Base,engine
#Importação date
from datetime import datetime

class Cliente(Base):
    __tablename__="cliente"
    cpf = Column(String, primary_key=True)
    nome_cliente = Column(String, index=True) 
    data_nascimento= Column(DateTime, default=datetime.utcnow)
    data_cadastro = Column(DateTime, default=datetime.utcnow)
    email = Column(String, index=True)
    telefone = Column(String)
    
    #endereço
    rua = Column(String)
    numero = Column(String)
    complemento = Column(String, nullable=True)
    bairro = Column(String)
    cidade = Column(String)
    estado = Column(String(2))  # Ex: "SP", "RJ"
    cep = Column(String(10))    # Ex: "12345-678"
    pais = Column(String, default="Brasil")
    #relacionamento com a tabela pedidos
    pedidos = relationship("Pedido", back_populates="cliente")

#Criar tabela produtos no sqlite
Base.metadata.create_all(bind=engine)"""