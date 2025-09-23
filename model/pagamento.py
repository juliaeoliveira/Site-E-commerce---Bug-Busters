"""from sqlalchemy.orm import relationship
from sqlalchemy import Column,Integer,String,Float,Boolean,DateTime,ForeignKey
#importar a conexão com o sqlite do database.py
from database import Base,engine
#Importação date
from datetime import datetime

class Pagamento(Base):
    __tablename__="pagamento"
    id = Column(Integer,primary_key=True) 
    data_pagamento = Column(DateTime, default=datetime.utcnow)
    valor = Column(Float)
    metodo_pagamento = Column(String)
    status = Column(Boolean, default=True)
    #chave estrangeira
    produto_id = Column(Integer, ForeignKey('produtos.id'), nullable=False)
    #relacionamento com a tabela Produto
    produto = relationship("Produtos", back_populates="pagamento")

#Criar tabela produtos no sqlite
Base.metadata.create_all(bind=engine)"""