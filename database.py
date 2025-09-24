from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.orm import sessionmaker,declarative_base, relationship
#conexão com sqlite


#criar a tabela
from sqlalchemy import Column,Integer,String,Float,Boolean,DateTime
#importação date
from datetime import datetime
# import pytz


engine=create_engine("sqlite:///loja.db")
SessionLocal=sessionmaker(bind=engine)
Base=declarative_base()


# fuso = pytz.timezone('America/Sao_Paulo') # // timezone aplicado corretamente
class Cliente(Base):
    __tablename__="cliente"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_cliente = Column(String, index=True) #// sujestão de melhoria: nome_cliente poderia ter tamanho máximo definido (String(100) por exemplo).
    data_nascimento = Column(DateTime, nullable=False)
    # data_cadastro = Column(DateTime, default=lambda: datetime.now(fuso))
    email = Column(String, index=True)
    telefone = Column(String)
    
#     #endereço
#     rua = Column(String)
#     numero = Column(String)
#     complemento = Column(String, nullable=True)
#     bairro = Column(String)
#     cidade = Column(String)
#     estado = Column(String(2))  #"SP", "RJ"
#     cep = Column(String(10))    #"12345-678"
#     # // sugestão de possíveis melhorias: telefone, email e cep poderiam ter validações (regex ou restrições na aplicação).
#     #chave estrangeira da loja // correto
#     id_loja = Column(String, ForeignKey("loja.cnpj"), nullable=False)

#     #relacionamento com as tabelas // relacionamentos corretos
#     pagamentos = relationship("Pagamento", back_populates="cliente")
#     pedidos = relationship("Pedido", back_populates="cliente")
#     loja = relationship("Loja", back_populates="clientes")
    

# class Loja(Base):
#     __tablename__="loja"
#     cnpj = Column(String, primary_key=True) 
#     nome_loja = Column(String, index=True) #// sujestão de melhoria: "nome_loja" poderia ter limite de caracteres.

#     #endereço
#     rua = Column(String)
#     numero = Column(String)
#     complemento = Column(String, nullable=True)
#     bairro = Column(String)
#     cidade = Column(String)
#     estado = Column(String(2))  #"SP", "RJ"
#     cep = Column(String(10))    #"12345-678"
#     telefone = Column(String)
#     email = Column(String)

#     #relacionamento com as tabelas // corretos
#     pagamentos = relationship("Pagamento", back_populates="loja")
#     clientes = relationship("Cliente", back_populates="loja")
#     produtos = relationship("Produtos", back_populates="loja")

# class Pagamento(Base):
#     __tablename__="pagamento"
#     id = Column(Integer,primary_key=True) #// será que não faria sentido por o ID como autoincrement= True? Ainda mais que é do tipo Integer
#     data_pagamento = Column(DateTime, default=lambda: datetime.now(fuso))
#     valor = Column(Float)
#     metodo_pagamento = Column(String) #//sugestão melhoria: usar tipo Enum, ao invé de String
#     status = Column(Boolean, default=True)

#     #chave estrangeira
#     id_cliente = Column(Integer, ForeignKey('cliente.id'), nullable=False)
#     id_pedido = Column(Integer, ForeignKey('pedido.id'), unique=True)
#     cnpj_loja = Column(String, ForeignKey('loja.cnpj')) #// Também não deveria incluir nullable=False ?
    
#     #relacionamento com as tabelas // corretos
#     cliente = relationship("Cliente", back_populates="pagamentos")
#     pedido = relationship("Pedido", back_populates="pagamento")
#     loja = relationship("Loja", back_populates="pagamentos")

# class Pedido(Base):
#     __tablename__="pedido"
#     id = Column(Integer,primary_key=True)
#     data_pedido = Column(DateTime, default=lambda: datetime.now(fuso))
#     valor_total = Column(Float)
#     status = Column(Boolean, default=True)
#     #chave estrangeira
#     id_cliente = Column(Integer, ForeignKey('cliente.id'), nullable=False)
#     pagamento = relationship("Pagamento", uselist=False, back_populates="pedido")
#     #relacionamento com a tabela cliente 
#     cliente = relationship("Cliente", back_populates="pedidos")
# #// Na classe Pedido estão faltando os atributos tamanho (definir com a DBA s haverá quantidade)
# #// Está faltando o relacionamento entre Pedido e Produto
class Produtos(Base):
    __tablename__="produtos"
    id = Column(Integer,primary_key=True) 
    nome_produto = Column(String,index=True) 
    preco = Column(Float)
    categoria = Column(String,index=True)
    estoque = Column(Integer, default=0)
    # data_cadastro = Column(DateTime, default=lambda: datetime.now(fuso))
    imagem_URL = Column(String)
    status = Column(Boolean, default=True)
    descricao=Column(String) 

    #chave estrangeira
    loja_id = Column(String, ForeignKey("loja.cnpj"), nullable=False)

    #relação com a tabela
    loja = relationship("Loja", back_populates="produtos")

#criar todas tabelas e o banco de dados no sqlite
Base.metadata.create_all(bind=engine)
