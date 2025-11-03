from fastapi import APIRouter, Depends, UploadFile, Request, Form, File
from fastapi.responses import HTMLResponse,RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import get_db
from controller.usuario_autenticacao import ServicosUsuario, verificar_hash_senha, criar_token, verificar_token
from models import Usuario_Model, Produto
from schemas import Usuario , Endereco
import shutil

from datetime import datetime
import pytz

fuso = pytz.timezone('America/Sao_Paulo')

UPLOAD_DIR="view/static/uploads"

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
    if email.endswith("@admsobveu.com"):
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
        confirmar_senha=confirmar_senha,
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
    token=criar_token({"sub":usuario.email, "adm":usuario.tipo == "adm"})

    #criar um if de admin ou user normal
    if usuario.tipo == "adm":
        destino="/usuario/admin"
    else:
        destino="/painel_usuario"  
    response=RedirectResponse(url=destino,status_code=303)
    response.set_cookie(key="token",value=token,httponly=True,samesite="Lax", secure=False, max_age=60 * 60, path="/")
    return response

##ota de adm crud produtos
@caminho_prefixo_usuario.get("/admin", response_class=HTMLResponse)
def pagina_adm(request: Request, db: Session = Depends(get_db)):
    #token do adm
    token = request.cookies.get("token")
    payload = verificar_token(token)
    if not payload or not payload.get("adm"):
        return RedirectResponse(url="/", status_code=303)
    produtos = db.query(Produto).all()
    return templates.TemplateResponse("admin.html",{
        "request":request, "produtos":produtos
    })

#rota criar produto
@caminho_prefixo_usuario.post("/admin/produto")
def criar_produto(request:Request,nome_produto:str=Form(...),
    preco:float=Form(...),
    descricao: str=Form(...),
    cor: str=Form(...),
    categoria: str=Form(...),
    quantidade_estoque: int=Form(...),
    imagem1_url:UploadFile=File(...),
    imagem2_url:UploadFile=File(...),
    imagem3_url:UploadFile=File(...),
    imagem4_url:UploadFile=File(...),
    status:bool=Form(...),
    loja_id:str=Form(...),
    db:Session=Depends(get_db)
            ):
    caminho_arquivo1 = f'{UPLOAD_DIR}/{imagem1_url.filename}'
    with open(caminho_arquivo1, "wb") as arquivo:
        shutil.copyfileobj(imagem1_url.file,arquivo)

    caminho_arquivo2 = f'{UPLOAD_DIR}/{imagem2_url.filename}'
    with open(caminho_arquivo2, "wb") as arquivo:
        shutil.copyfileobj(imagem2_url.file,arquivo)

    caminho_arquivo3 = f'{UPLOAD_DIR}/{imagem3_url.filename}'
    with open(caminho_arquivo3, "wb") as arquivo:
        shutil.copyfileobj(imagem3_url.file,arquivo)

    caminho_arquivo4 = f'{UPLOAD_DIR}/{imagem3_url.filename}'
    with open(caminho_arquivo4, "wb") as arquivo:
        shutil.copyfileobj(imagem3_url.file,arquivo)

    novo_produto=Produto(
        nome_produto=nome_produto,
        preco=preco,
        descricao = descricao,
        cor=cor,
        categoria=categoria,
        quantidade_estoque=quantidade_estoque,
        data_cadastro = datetime.now(fuso),
        imagem1_url=imagem1_url.filename,
        imagem2_url=imagem2_url.filename,
        imagem3_url=imagem3_url.filename,
        imagem4_url=imagem4_url.filename,
        status=status,
        loja_id=loja_id
        )
    
    db.add(novo_produto)
    db.commit()
    db.refresh(novo_produto)
    return RedirectResponse(url="/usuario/admin",status_code=303) 

#atualizar produto get edição do produto
@caminho_prefixo_usuario.get("/admin/produto/editar/{id}",
           response_class=HTMLResponse)
def editar_produto(id: int, request: Request, db: Session=Depends(get_db)):
    token = request.cookies.get("token")
    payload = verificar_token(token)
    if not payload or not payload.get("adm"):
        return RedirectResponse(url="/", status_code=303)
    produto=db.query(Produto).filter(Produto.id==id).first()
    if not produto:
        return RedirectResponse(url="/usuario/admin",status_code=303)
    return templates.TemplateResponse("editar.html",{
        "request":request, "produto":produto
    })

#rota editar produto
@caminho_prefixo_usuario.post("/admin/produto/atualizar/{id}")
def atualizar_produto(
    id:int,
    nome_produto:str=Form(...),
    preco:float=Form(...),
    descricao:str=Form(...),
    cor:str=Form(...),
    categoria:str=Form(...),
    quantidade_estoque:int=Form(...),
    imagem1_url:UploadFile=File(None),
    imagem2_url:UploadFile=File(None),
    imagem3_url:UploadFile=File(None),
    imagem4_url:UploadFile=File(None),
    status:bool=Form(...),
    loja_id:str=Form(...),
    db:Session=Depends(get_db)
            ):

    produto=db.query(Produto).filter(Produto.id==id).first()
    if not produto:
        return RedirectResponse(url="/usuario/admin",status_code=303)
    #atualizar os campos
    produto.nome_produto=nome_produto
    produto.preco=preco
    produto.descricao=descricao
    produto.cor=cor
    produto.categoria=categoria
    produto.quantidade_estoque=quantidade_estoque

    #atualizar a imagens se tiver
    if imagem1_url and imagem1_url.filename !="":
        caminho_arquivo = f'{UPLOAD_DIR}/{imagem1_url.filename}'
    with open(caminho_arquivo, "wb") as arquivo:
        shutil.copyfileobj(imagem1_url.file,arquivo)
    produto.imagem1_url= imagem1_url.filename

    if imagem2_url and imagem2_url.filename !="":
        caminho_arquivo = f'{UPLOAD_DIR}/{imagem2_url.filename}'
    with open(caminho_arquivo, "wb") as arquivo:
        shutil.copyfileobj(imagem2_url.file,arquivo)
    produto.imagem2_url= imagem2_url.filename

    if imagem3_url and imagem3_url.filename !="":
        caminho_arquivo = f'{UPLOAD_DIR}/{imagem3_url.filename}'
    with open(caminho_arquivo, "wb") as arquivo:
        shutil.copyfileobj(imagem3_url.file,arquivo)
    produto.imagem3_url= imagem3_url.filename

    if imagem4_url and imagem4_url.filename !="":
        caminho_arquivo = f'{UPLOAD_DIR}/{imagem4_url.filename}'
    with open(caminho_arquivo, "wb") as arquivo:
        shutil.copyfileobj(imagem4_url.file,arquivo)
    produto.imagem4_url= imagem4_url.filename

    produto.status=status
    produto.loja_id=loja_id

    db.commit()
    db.refresh(produto)
    return RedirectResponse(url="/usuario/admin",status_code=303)


#deletar produto
@caminho_prefixo_usuario.post("/admin/produto/deletar/{id}")
def deletar_produto(id:int,db:Session=Depends(get_db)):
    produto=db.query(Produto).filter(Produto.id==id).first()
    if produto:
        db.delete(produto)
        db.commit()
    return RedirectResponse(url="/usuario/admin",status_code=303)



