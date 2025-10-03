#conexão com sqlite
from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.orm import sessionmaker,declarative_base, relationship
#criar a tabela
from sqlalchemy import Column,Integer,String,Float,Boolean,DateTime,Numeric
#importação date
from datetime import datetime
import pytz

import os
from dotenv import load_dotenv

# Carregar variáveis do .env
load_dotenv()

USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

print("Tentando conectar em:")
print(f"HOST={HOST}, PORT={PORT}, USER={USER}, DBNAME={DBNAME}")

# String de conexão para SQLAlchemy
DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"

# Criar engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

fuso = pytz.timezone('America/Sao_Paulo') # // timezone aplicado corretamente


class Cliente(Base):
    __tablename__="cliente"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_cliente = Column(String(100), index=True) 
    data_nascimento = Column(DateTime, nullable=False)
    data_cadastro = Column(DateTime, default=lambda: datetime.now(fuso))
    email = Column(String, index=True)
    telefone = Column(String)

    #chave estrangeira da loja
    id_loja = Column(String, ForeignKey("loja.cnpj"), nullable=False)

    #relacionamento com as tabelas
    pagamentos = relationship("Pagamento", back_populates="cliente") #N:1
    pedidos = relationship("Pedido", back_populates="cliente") #N:1
    loja = relationship("Loja", back_populates="clientes") #1:N

    endereco = relationship(
        "Endereco",
        back_populates="cliente",
        cascade="all, delete-orphan",
        uselist=False  # porque um cliente tem 1 endereço
    )


class Loja(Base):
    __tablename__="loja"
    cnpj = Column(String, primary_key=True)
    nome_loja = Column(String(100), index=True)
    telefone = Column(String)
    email = Column(String)

    #relacionamento com as tabelas
    pagamentos = relationship("Pagamento", back_populates="loja") #N:1
    clientes = relationship("Cliente", back_populates="loja") #N:1
    produtos = relationship("Produto", back_populates="loja") #N:1

class Endereco(Base):
    __tablename__="endereco"
    id = Column(Integer,primary_key=True, autoincrement=True) 
    rua = Column(String)
    numero = Column(String)
    complemento = Column(String, nullable=True)
    bairro = Column(String)
    cidade = Column(String)
    estado = Column(String(2))  #"SP", "RJ"
    cep = Column(String(10))    #"12345-678"

    #chave estrangeira com os donos de endereços
    cliente_id = Column(Integer,ForeignKey("cliente.id"),nullable=True)
    loja_id = Column(String,ForeignKey("loja.cnpj"),nullable=True)

    #relacionamento com as tabelas
    clientes = relationship("Cliente", back_populates="endereco")
    loja = relationship("Loja", back_populates="endereco")
    endereco = relationship(
        "Endereco",
        back_populates="loja",
        cascade="all, delete-orphan",
        uselist=False  # porque uma loja tem 1 endereço
    )


class Pagamento(Base):
    __tablename__="pagamento"
    id = Column(Integer,primary_key=True, autoincrement=True) 
    data_pagamento = Column(DateTime, default=lambda: datetime.now(fuso))
    valor = Column(Numeric(10,2)) #considerar o uso de Numeric(10,2), ao invés de float
    metodo_pagamento = Column(String)
    status = Column(Boolean, default=True)

    #chave estrangeira
    id_cliente = Column(Integer, ForeignKey('cliente.id'), nullable=False)
    id_pedido = Column(Integer, ForeignKey('pedido.id'), nullable=False)
    cnpj_loja = Column(String, ForeignKey('loja.cnpj'), nullable=False)
    
    #relacionamento com as tabelas
    cliente = relationship("Cliente", back_populates="pagamentos") #1:N
    pedido = relationship("Pedido", back_populates="pagamentos") #1:N
    loja = relationship("Loja", back_populates="pagamentos") #1:N


class Pedido(Base):
    __tablename__="pedido"
    id = Column(Integer,primary_key=True,autoincrement=True)
    data_pedido = Column(DateTime, default=lambda: datetime.now(fuso))
    valor_total = Column(Numeric(10,2)) #soma de todos os itens_pedido
    status = Column(Boolean, default=True)
    
    #chave estrangeira
    id_cliente = Column(Integer, ForeignKey('cliente.id'), nullable=False)
    
    #relacionamento com a tabela cliente
    pagamentos = relationship("Pagamento", back_populates="pedido") #N:1
    cliente = relationship("Cliente", back_populates="pedidos") #1:N
    itens_pedido = relationship("ItemPedido", back_populates="pedido", cascade="all, delete-orphan") #N:1
    

class Produto(Base):
    __tablename__="produtos"
    id = Column(Integer,primary_key=True, autoincrement=True) 
    nome_produto = Column(String,index=True)
    preco = Column(Numeric(10,2))
    descricao=Column(String)
    cor = Column(String, index=True) # a cor será fixa, uma para cada vestido
    categoria = Column(String,index=True)
    quantidade_estoque = Column(Integer, default=0) #global, ou seja, a quantidade no estoque não depende do tamanho do vestido
    data_cadastro = Column(DateTime, default=lambda: datetime.now(fuso))
    imagem1_URL = Column(String)
    imagem2_URL = Column(String)
    imagem3_URL = Column(String)
    imagem4_URL = Column(String)
    status = Column(Boolean, default=True) 
 
    #chave estrangeira
    loja_id = Column(String, ForeignKey("loja.cnpj"), nullable=False)

    #relação com as tabelas
    loja = relationship("Loja", back_populates="produtos") #1:N
    itens_pedido = relationship("ItemPedido", back_populates="produto") #N:1


class ItemPedido(Base):
    __tablename__="item_pedido"
    id = Column(Integer,primary_key=True,autoincrement=True) 
    tamanho = Column(String, index=True)
    quantidade= Column(Integer, default=0)
    preco_unitario = Column(Numeric(10,2))
    subtotal = Column(Float) #valor de (quantidade * preco_unitario)

    #chave estrangeira
    id_pedido = Column(Integer, ForeignKey('pedido.id'), nullable=False)
    id_produto = Column(Integer, ForeignKey("produtos.id"), nullable=False) 
    
    #relacionamento com as tabelas produto e pedido
    pedido = relationship("Pedido", back_populates="itens_pedido") #1:N 
    produto = relationship("Produto", back_populates="itens_pedido") #1:N

#criar todas tabelas e o banco de dados no sqlite
Base.metadata.create_all(bind=engine)