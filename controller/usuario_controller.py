from fastapi import APIRouter, Depends, status, Request, Form
from fastapi.responses import JSONResponse,HTMLResponse,RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import get_db
from controller.usuario_autenticacao import ServicosUsuario, verificar_hash_senha, criar_token, verificar_token
from models import Usuario_Model
from schemas import Usuario , Endereco

templates=Jinja2Templates(directory="templates")
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
    data_cadastro: str = Form(...),
    email: str = Form(...),
    telefone: str = Form(...),
    nome_usuario: str = Form(...),
    senha: str = Form(...),
    tipo: str = Form(...),

    rua: str = Form(...),
    numero: str = Form(...),
    complemento: str = Form(None),
    bairro: str = Form(...),
    cidade: str = Form(...),
    estado: str = Form(...),
    cep: str = Form(...),

    db: Session = Depends(get_db)
):
    usuario=db.query(Usuario_Model).filter(Usuario_Model.nome_usuario==nome_usuario).first()
    if usuario:
        return {"mensagem":"Nome de usuário já cadastrado!"}
    novo_usuario=Usuario(
        nome_cliente=nome_cliente,
        data_nascimento=data_nascimento,
        data_cadastro=data_cadastro,
        email=email,
        telefone=telefone,
        nome_usuario=nome_usuario,
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
    return JSONResponse(
        content={'msg': 'sucesso'},
        status_code=status.HTTP_201_CREATED
    ) , RedirectResponse(url="/",status_code=303)








# @caminho_prefixo_usuario.post('/registrar')
# def usuario_registrar(
#     usuario : Usuario,
#     endereco : Endereco,
#     db_session: Session = Depends(get_db_session), #cria uma dependência que fornece uma sessão para a função, garantindo que ela seja aberta e fechada corretamente
# ):
#     #verificar se o nome de usuário já existe
#     usuarios_existente = db_session.query(Usuario_Model).filter(Usuario_Model.nome_usuario == usuario.nome_usuario).first()
#     if usuarios_existente:
#         raise HTTPException(status_code=400, detail="Usuário já existe.")
    
#     #verificar se o email já existe
#     if usuario.email:
#         emails_existente = db_session.query(Usuario_Model).filter(Usuario_Model.email == usuario.email).first()
#         if emails_existente:
#             raise HTTPException(status_code=400, detail="Email já está em uso.")
    
#    #se passar por todas as validações add usuario
#     su = ServicosUsuario(db_session=db_session)
#     su.registrar_usuario(usuario=usuario,endereco=endereco)
#     return JSONResponse(
#         content={'msg': 'sucesso'},
#         status_code=status.HTTP_201_CREATED
#     )

#rota login usuário
@caminho_prefixo_usuario.get("/login",response_class=HTMLResponse)
def home(request:Request):
    return templates.TemplateResponse("login.html",
                            {"request":request})
#post login do usuário
@caminho_prefixo_usuario.post("/login")
def login(request:Request, nome_usuario:str=Form(...),
        senha:str=Form(...), db:Session=Depends(get_db)
):
    usuario=db.query(Usuario_Model).filter(Usuario_Model.nome_usuario==nome_usuario).first()
    if not usuario or not verificar_hash_senha(senha,
                                               usuario.senha):
        return {"mensagem":"Credenciais inválidas"}
    token=criar_token({"sub":usuario.nome_usuario})
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












# @caminho_prefixo_usuario.post('/login')
# def usuario_login(
#     usuario_login: UsuarioLogin,
#     db_session: Session = Depends(get_db_session),
# ):
#     su = ServicosUsuario(db_session=db_session)

#     dados_autenticacao = su.usuario_login(usuario=usuario_login)
#     return JSONResponse(
#         content=dados_autenticacao,
#         status_code=status.HTTP_200_OK
#         )