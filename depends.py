from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import SessionLocal
from controller.usuario_autenticacao import ServicosUsuario


esquema_oauth = OAuth2PasswordBearer(tokenUrl='/usuario/login')


def get_db_session():
    try:
        session = SessionLocal()
        yield session
    finally:
        session.close()
