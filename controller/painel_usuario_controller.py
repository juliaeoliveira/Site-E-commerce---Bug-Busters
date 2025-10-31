from fastapi import APIRouter, Depends, UploadFile, Request, Form, File
from fastapi.responses import HTMLResponse,RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import get_db
from controller.usuario_autenticacao import gerar_hash_senha, verificar_hash_senha, criar_token, verificar_token
from models import Usuario_Model, Produto
from schemas import Usuario as UsuarioSchema
import os,shutil
import random
from typing import Optional

from datetime import datetime
import pytz

fuso = pytz.timezone('America/Sao_Paulo')

UPLOAD_DIR="view/static/uploads"

templates=Jinja2Templates(directory="view/templates")
caminho_prefixo_painelUsuario = APIRouter(prefix='/painel_usuario')

#criar rota do dashboard do usuário , página protegida
@caminho_prefixo_painelUsuario.get("",response_class=HTMLResponse)
def painel_usuario(request:Request):
    token=request.cookies.get("token")
    if not token or not verificar_token(token):
        return RedirectResponse(url="/",status_code=303)
    return templates.TemplateResponse("painel_usuario.html",
                    {"request":request})

@caminho_prefixo_painelUsuario.get("/produtos", response_class=HTMLResponse)
async def listar_todos (request:Request, 
                        db:Session=Depends(get_db)):
    produtos = db.query(Produto).all()
    return templates.TemplateResponse(
        "painel_usuario_produtos.html",
        {"request": request, "produtos": produtos}
    )        


#rota detalhe do produto
@caminho_prefixo_painelUsuario.get("/produtos/{id_produto}",
            response_class=HTMLResponse)
async def detalhe(request:Request,id_produto:int,
                  db:Session=Depends(get_db)):
    #query do produto
    produto=db.query(Produto).filter(Produto.id==id_produto).first()
    
    # Todos os outros produtos (exceto o atual)
    outros_produtos = db.query(Produto).filter(Produto.id != id_produto).all()

    # Selecionar 3 aleatórios (ou menos se não houver suficientes)
    sugestoes = random.sample(outros_produtos, min(3, len(outros_produtos)))

    return templates.TemplateResponse("painel_usuario_descricao.html",{
        "request":request,"produto":produto,"sugestoes": sugestoes
    })



