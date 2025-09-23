"""from sqlalchemy import Column,String
#importar a conexão com o sqlite do database.py
from database import Base,engine
#Importação date

class Loja(Base):
    __tablename__="loja"
    cnpj = Column(String, primary_key=True)
    nome_loja = Column(String, index=True)

    #endereço
    rua = Column(String)
    numero = Column(String)
    complemento = Column(String, nullable=True)
    bairro = Column(String)
    cidade = Column(String)
    estado = Column(String(2))  # Ex: "SP", "RJ"
    cep = Column(String(10))    # Ex: "12345-678"
    pais = Column(String, default="Brasil")
    
    telefone = Column(String)
    email = Column(String)

#Criar tabela produtos no sqlite
Base.metadata.create_all(bind=engine)"""