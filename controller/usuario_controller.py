from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm #formulário de autenticação
from sqlalchemy.orm import Session
from depends import get_db_session, verificar_token
from controller.usuario_autenticacao import ServicosUsuario
from models import Usuario_Model
from schemas import Usuario


caminho_prefixo_usuario = APIRouter(prefix='/usuario')
teste_router = APIRouter(prefix='/teste ', dependencies=[Depends(verificar_token)])

@caminho_prefixo_usuario.post('/registrar')
def usuario_registrar(
    usuario : Usuario,
    db_session: Session = Depends(get_db_session), #cria uma dependência que fornece uma sessão para a função, garantindo que ela seja aberta e fechada corretamente
):
     # Verificar se o nome de usuário já existe
    usuarios_existente = db_session.query(Usuario_Model).filter(Usuario_Model.usuario == usuario.usuario).first()
    if usuarios_existente:
        raise HTTPException(status_code=400, detail="Usuário já existe.")
    
    # Verificar se o email já existe
    if usuario.email:
        emails_existente = db_session.query(Usuario_Model).filter(Usuario_Model.email == usuario.email).first()
        if emails_existente:
            raise HTTPException(status_code=400, detail="Email já está em uso.")
    
   #se passar por todas as validações add usuario
    su = ServicosUsuario(db_session=db_session)
    su.registrar_usuario(usuario=usuario)
    return JSONResponse(
        content={'msg': 'sucesso'},
        status_code=status.HTTP_201_CREATED
    )


@caminho_prefixo_usuario.post('/login')
def usuario_login(
    request_form_usuario : OAuth2PasswordRequestForm = Depends(),
    db_session: Session = Depends(get_db_session),
):
    su = ServicosUsuario(db_session=db_session)
    usuario = Usuario(
        usuario=request_form_usuario.username,
        # email=request_form_usuario.email, #O OAuth2PasswordRequestForm não tem o campo email
        senha=request_form_usuario.password
    )
    dados_autenticacao = su.usuario_login(usuario=usuario)
    return JSONResponse(
        content=dados_autenticacao,
        status_code=status.HTTP_200_OK
        )

@teste_router.get('/teste')
def test_user_verify():
    return 'It works'