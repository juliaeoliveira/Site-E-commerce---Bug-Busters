#database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base
from urllib.parse import quote_plus


import os
# from dotenv import load_dotenv

# # Carregar variáveis do .env
# load_dotenv()

# USER = os.getenv("user")
# PASSWORD = quote_plus(os.getenv("password"))
# HOST = os.getenv("host")
# PORT = os.getenv("port")
# DBNAME = os.getenv("dbname")

# print("Tentando conectar em:")
# print(f"HOST={HOST}, PORT={PORT}, USER={USER}, DBNAME={DBNAME}")

# # String de conexão para SQLAlchemy
# DATABASE_URL = f"postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"

DATABASE_URL = "sqlite:///loja.db"

# Criar engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
'''
Essa função é usada com FastAPI para fornecer uma sessão 
do banco de forma segura.
yield db permite que a função funcione como generator, ou seja, 
FastAPI vai “pegar” a sessão e depois fechar automaticamente.
finally: db.close() garante que a sessão seja fechada, evitando 
vazamento de conexões.
'''