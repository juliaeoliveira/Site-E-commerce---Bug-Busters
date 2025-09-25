from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.orm import sessionmaker,declarative_base, relationship
#conexão com sqlite

#criar a tabela
from sqlalchemy import Column,Integer,String,Float,Boolean,DateTime
#importação date
from datetime import datetime
import pytz

engine=create_engine("sqlite:///loja_teste.db")
SessionLocal=sessionmaker(bind=engine)
Base=declarative_base()

fuso = pytz.timezone('America/Sao_Paulo')
class Cliente(Base):
    __tablename__="cliente"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_cliente = Column(String(100), index=True) 
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

    #chave estrangeira da loja
    id_loja = Column(String, ForeignKey("loja.cnpj"), nullable=False)

    #relacionamento com as tabelas
    pagamentos = relationship("Pagamento", back_populates="cliente")
    pedidos = relationship("Pedido", back_populates="cliente")
    loja = relationship("Loja", back_populates="clientes")


class Loja(Base):
    __tablename__="loja"
    cnpj = Column(String, primary_key=True)
    nome_loja = Column(String(100), index=True)

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

    #relacionamento com as tabelas
    pagamentos = relationship("Pagamento", back_populates="loja")
    clientes = relationship("Cliente", back_populates="loja")
    produtos = relationship("Produtos", back_populates="loja")

class Pagamento(Base):
    __tablename__="pagamento"
    id = Column(Integer,primary_key=True, autoincrement=True) 
    data_pagamento = Column(DateTime, default=lambda: datetime.now(fuso))
    valor = Column(Float)
    metodo_pagamento = Column(String)
    status = Column(Boolean, default=True)

    #chave estrangeira
    id_cliente = Column(Integer, ForeignKey('cliente.id'), nullable=False)
    id_pedido = Column(Integer, ForeignKey('pedido.id'), unique=True)
    cnpj_loja = Column(String, ForeignKey('loja.cnpj'), nullable=False)
    
    #relacionamento com as tabelas
    cliente = relationship("Cliente", back_populates="pagamentos")
    pedido = relationship("Pedido", back_populates="pagamento")
    loja = relationship("Loja", back_populates="pagamentos")


class Pedido(Base):
    __tablename__="pedido"
    id = Column(Integer,primary_key=True, autoincrement=True)
    data_pedido = Column(DateTime, default=lambda: datetime.now(fuso))
    valor_total = Column(Float)
    status = Column(Boolean, default=True)
    
    #chave estrangeira
    id_cliente = Column(Integer, ForeignKey('cliente.id'), nullable=False)
    id_produto = Column(Integer, ForeignKey("produtos.id"), nullable=False)
    
    #relacionamento com a tabela cliente
    pagamento = relationship("Pagamento", uselist=False, back_populates="pedido")
    cliente = relationship("Cliente", back_populates="pedidos")
    produto = relationship("Produtos", back_populates="pedido") #1:1
    

class Produtos(Base):
    __tablename__="produtos"
    id = Column(Integer,primary_key=True, autoincrement=True) 
    nome_produto = Column(String,index=True) 
    descricao=Column(String) 
    tamanho = Column(String, index=True)
    cor = Column(String, index=True)
    preco = Column(Float)
    quantidade_estoque = Column(Integer, default=0)
    data_cadastro = Column(DateTime, default=lambda: datetime.now(fuso))
    imagem_URL = Column(String)
    categoria = Column(String,index=True)
    status = Column(Boolean, default=True)

    #chave estrangeira
    loja_id = Column(String, ForeignKey("loja.cnpj"), nullable=False)

    #relação com as tabelas
    loja = relationship("Loja", back_populates="produtos")
    pedido = relationship("Pedido", back_populates="produto") #1:1

#criar todas tabelas e o banco de dados no sqlite
Base.metadata.create_all(bind=engine)
#teste - inserir dados na tabela loja 
# função para inserir dados na tabela loja
def dados_loja(
    cnpj: str,
    nome_loja: str,
    rua: str,
    numero: str,
    complemento: str,
    bairro: str,
    cidade: str,
    estado: str,
    cep: str,
    telefone: str,
    email: str
):
    session = SessionLocal()
    try:
        loja = Loja(
            cnpj=cnpj,
            nome_loja=nome_loja,
            rua=rua,
            numero=numero,
            complemento=complemento,
            bairro=bairro,
            cidade=cidade,
            estado=estado,
            cep=cep,
            telefone=telefone,
            email=email
        )
        session.add(loja)
        session.commit()
        print(f"✅ Loja {nome_loja} criada com sucesso!")
    except Exception as e:
        session.rollback()
        print("❌ Erro ao inserir loja:", e)
    finally:
        session.close()

dados_loja(
    "A7K9Q2",
    "Sob Véu",
    "Rua Correia de Andrade",
    "232",
    "Escritório",
    "Brás",
    "São Paulo",
    "SP",
    "03008-020",
    "(11) 3312-3550",
    "sobveuoficial@gmail.com"
)
