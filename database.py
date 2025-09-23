from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.orm import sessionmaker,declarative_base, relationship
#conexão com sqlite


#criar a tabela
from sqlalchemy import Column,Integer,String,Float,Boolean,DateTime
#Importação date
from datetime import datetime


engine=create_engine("sqlite:///loja.db")
SessionLocal=sessionmaker(bind=engine)
Base=declarative_base()

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

class Produtos(Base):
    __tablename__="produtos"
    id = Column(Integer,primary_key=True) 
    nome_produto = Column(String,index=True) 
    preco = Column(Float)
    categoria = Column(String,index=True)
    estoque = Column(Integer, default=0)
    data_cadastro = Column(DateTime, default=datetime.utcnow)
    imagem_URL = Column(String)
    status = Column(Boolean, default=True)
    descricao=Column(String)
    #relacionamento com a tabela pagamento
    pagamentos = relationship("Pagamento", back_populates="produto")

#Criar todas tabela e o banco de dados no sqlite
Base.metadata.create_all(bind=engine)
