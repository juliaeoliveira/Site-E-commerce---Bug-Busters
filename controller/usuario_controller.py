from fastapi import APIRouter, Depends, status, Request, Form
from fastapi.responses import HTMLResponse,RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import get_db
from controller.usuario_autenticacao import ServicosUsuario, verificar_hash_senha, criar_token, verificar_token
from models import Usuario_Model
from schemas import Usuario , Endereco

from datetime import datetime
import pytz

fuso = pytz.timezone('America/Sao_Paulo')

templates=Jinja2Templates(directory="view/templates")
caminho_prefixo_usuario = APIRouter(prefix='/usuario')


@caminho_prefixo_usuario.get("/registrar",response_class=HTMLResponse)
def pagina_cadastro(request:Request):
    return templates.TemplateResponse("cadastro_usuario.html",{
        "request":request
    })

#formulário criar usuário
@caminho_prefixo_usuario.post("/registrar")
def cadastrar_usuario( request:Request,
    nome_cliente: str = Form(...),
    data_nascimento: str = Form(...),
    email: str = Form(...),
    telefone: str = Form(...),
    senha: str = Form(...),
    confirmar_senha: str = Form(...),

    rua: str = Form(...),
    numero: str = Form(...),
    complemento: str = Form(None),
    bairro: str = Form(...),
    cidade: str = Form(...),
    estado: str = Form(...),
    cep: str = Form(...),

    db: Session = Depends(get_db)
):
    
    email = email.strip().lower()

    #validação da confirmação de senha
    if senha != confirmar_senha:
        return {"mensagem": "As senhas não coincidem."}
    
    #define o tipo com base no domínio do e-mail
    if email.endswith("@adm_sobveu.com"):
        tipo = "adm"
    else:
        tipo = "cliente"
    
    
    usuario_email=db.query(Usuario_Model).filter(Usuario_Model.email==email).first()
    if usuario_email:
        return {"mensagem":"Email já cadastrado!"}
    novo_usuario=Usuario(
        nome_cliente=nome_cliente,
        data_nascimento=data_nascimento,
        data_cadastro=datetime.now(fuso),
        email=email,
        telefone=telefone,
        senha=senha,
        tipo=tipo
    )

    endereco = Endereco(
        rua=rua,
        numero=numero,
        complemento=complemento,
        bairro=bairro,
        cidade=cidade,
        estado=estado,
        cep=cep
    )
   #se passar por todas as validações add usuario
    su = ServicosUsuario(db_session=db)
    su.registrar_usuario(usuario=novo_usuario,endereco=endereco)
    return RedirectResponse(url="/usuario/login",status_code=303)

#rota login usuário
@caminho_prefixo_usuario.get("/login",response_class=HTMLResponse)
def home(request:Request):
    return templates.TemplateResponse("login.html",
                            {"request":request})
#post login do usuário
@caminho_prefixo_usuario.post("/login")
def login(request:Request, email:str=Form(...),
        senha:str=Form(...), db:Session=Depends(get_db)
):
    usuario=db.query(Usuario_Model).filter(Usuario_Model.email==email).first()
    if not usuario or not verificar_hash_senha(senha,
                                               usuario.senha):
        return {"mensagem":"Credenciais inválidas"}
    token=criar_token({"sub":usuario.email})
    response=RedirectResponse(url="/usuario/dashboard",status_code=303)
    response.set_cookie(key="token",value=token,
                        httponly=True)
    return response

#criar rota do dashboard do usuário , página protegida
@caminho_prefixo_usuario.get("/dashboard",response_class=HTMLResponse)
def dashboard(request:Request):
    token=request.cookies.get("token")
    if not token or not verificar_token(token):
        return RedirectResponse(url="/",status_code=303)
    return templates.TemplateResponse("dashboard.html",
                    {"request":request})
