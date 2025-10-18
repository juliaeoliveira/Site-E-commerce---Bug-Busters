from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm #formulário de autenticação
from sqlalchemy.orm import Session
from depends import get_db_session, verificar_token
from controller.usuario_autenticacao import ServicosUsuario
from models import Usuario_Model
from schemas import Usuario , Endereco , UsuarioLogin


caminho_prefixo_usuario = APIRouter(prefix='/usuario')

@caminho_prefixo_usuario.post('/registrar')
def usuario_registrar(
    usuario : Usuario,
    endereco : Endereco,
    db_session: Session = Depends(get_db_session), #cria uma dependência que fornece uma sessão para a função, garantindo que ela seja aberta e fechada corretamente
):
    #verificar se o nome de usuário já existe
    usuarios_existente = db_session.query(Usuario_Model).filter(Usuario_Model.nome_usuario == usuario.nome_usuario).first()
    if usuarios_existente:
        raise HTTPException(status_code=400, detail="Usuário já existe.")
    
    #verificar se o email já existe
    if usuario.email:
        emails_existente = db_session.query(Usuario_Model).filter(Usuario_Model.email == usuario.email).first()
        if emails_existente:
            raise HTTPException(status_code=400, detail="Email já está em uso.")
    
   #se passar por todas as validações add usuario
    su = ServicosUsuario(db_session=db_session)
    su.registrar_usuario(usuario=usuario,endereco=endereco)
    return JSONResponse(
        content={'msg': 'sucesso'},
        status_code=status.HTTP_201_CREATED
    )


@caminho_prefixo_usuario.post('/login')
def usuario_login(
    usuario_login: UsuarioLogin,
    db_session: Session = Depends(get_db_session),
):
    su = ServicosUsuario(db_session=db_session)

    dados_autenticacao = su.usuario_login(usuario=usuario_login)
    return JSONResponse(
        content=dados_autenticacao,
        status_code=status.HTTP_200_OK
        )