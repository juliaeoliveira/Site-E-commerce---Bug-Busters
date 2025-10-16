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


def verificar_token(
    db_session: Session = Depends(get_db_session),
    token = Depends(esquema_oauth)
):
    uc = ServicosUsuario(db_session=db_session)
    uc.verify_token(access_token=token)