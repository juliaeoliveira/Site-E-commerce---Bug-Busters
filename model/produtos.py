"""from sqlalchemy import Column,Integer,String,Float,Boolean,DateTime
#importar a conexão com o sqlite do database.py
from database import Base,engine
#Importação date
from datetime import datetime

class Produto(Base):
    __tablename__="produtos"
    id = Column(Integer,primary_key=True) #index no input do streamlit
    nome = Column(String,index=True) 
    preco = Column(Float)
    categoria = Column(String,index=True)
    estoque = Column(Integer, default=0)
    data_cadastro = Column(DateTime, default=datetime.utcnow)
    imagem_URL = Column(String)
    status = Column(Boolean, default=True)
    descricao=Column(String)

#Criar tabela produtos no sqlite
Base.metadata.create_all(bind=engine)"""