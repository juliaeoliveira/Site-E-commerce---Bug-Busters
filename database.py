from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.orm import sessionmaker,declarative_base, relationship
#conexão com sqlite


#criar a tabela
from sqlalchemy import Column,Integer,String,Float,Boolean,DateTime
#Importação date
from datetime import datetime
import pytz


engine=create_engine("sqlite:///loja.db")
SessionLocal=sessionmaker(bind=engine)
Base=declarative_base()


fuso = pytz.timezone('America/Sao_Paulo')
class Cliente(Base):
    __tablename__="cliente"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_cliente = Column(String, index=True) 
    data_nascimento = Column(DateTime, nullable=False)
    data_cadastro = Column(DateTime, default=lambda: datetime.now(fuso))
    email = Column(String, index=True)
    telefone = Column(String)
    
    #endereço
    rua = Column(String)
    numero = Column(String)
    complemento = Column(String, nullable=True)
    bairro = Column(String)
    cidade = Column(String)
    estado = Column(String(2))  #"SP", "RJ"
    cep = Column(String(10))    #"12345-678"

    #relacionamento com a tabela pagamento e Pedido
    pagamentos = relationship("Pagamento", back_populates="cliente")
    pedidos = relationship("Pedido", back_populates="cliente")
    

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
    estado = Column(String(2))  #"SP", "RJ"
    cep = Column(String(10))    #"12345-678"
    
    telefone = Column(String)
    email = Column(String)

    # relacionamento com a tabela pagamento
    pagamentos = relationship("Pagamento", back_populates="loja")

class Pagamento(Base):
    __tablename__="pagamento"
    id = Column(Integer,primary_key=True) 
    data_pagamento = Column(DateTime, default=lambda: datetime.now(fuso))
    valor = Column(Float)
    metodo_pagamento = Column(String)
    status = Column(Boolean, default=True)

    #chave estrangeira
    id_cliente = Column(Integer, ForeignKey('cliente.id'), nullable=False)
    id_pedido = Column(Integer, ForeignKey('pedido.id'), unique=True)
    cnpj_loja = Column(Integer, ForeignKey('loja.cnpj'))
    
    #relacionamento com a tabela Clente 
    cliente = relationship("Cliente", back_populates="pagamentos")
    pedido = relationship("Pedido", back_populates="pagamento")
    loja = relationship("Loja", back_populates="pagamentos")

class Pedido(Base):
    __tablename__="pedido"
    id = Column(Integer,primary_key=True)
    data_pedido = Column(DateTime, default=lambda: datetime.now(fuso))
    valor_total = Column(Float)
    status = Column(Boolean, default=True)
    #chave estrangeira
    id_cliente = Column(Integer, ForeignKey('cliente.id'), nullable=False)
    pagamento = relationship("Pagamento", uselist=False, back_populates="pedido")
    #relacionamento com a tabela cliente
    cliente = relationship("Cliente", back_populates="pedidos")

class Produtos(Base):
    __tablename__="produtos"
    id = Column(Integer,primary_key=True) 
    nome_produto = Column(String,index=True) 
    preco = Column(Float)
    categoria = Column(String,index=True)
    estoque = Column(Integer, default=0)
    data_cadastro = Column(DateTime, default=lambda: datetime.now(fuso))
    imagem_URL = Column(String)
    status = Column(Boolean, default=True)
    descricao=Column(String)

#Criar todas tabela e o banco de dados no sqlite
Base.metadata.create_all(bind=engine)
