from fastapi import APIRouter,Request,Form,UploadFile,File,Depends
# APIRouter=rota api para o front-end,
# Request=Requesição HTTP,
# Form=Formulário para criar e editar,
# UploadFile=Upload da foto,
# File=Função para gravar o caminho da imagem,
# Depends=dependência do banco de dados sqlite para o fastapi
from pydantic import BaseModel
from datetime import datetime
from sqlalchemy.orm import Session
from database import get_db
from models import Produto

from fastapi.responses import HTMLResponse,RedirectResponse
# HTMLResponse=resposta do html GET,POST,PUT,DELETE,
# RedirectResponse=redirecionar a página ao receber o método'GET'
from fastapi.templating import Jinja2Templates
from typing import Optional

#from models_teste import SessionLocal
#Jinja2Templates=responsável por renderizar o front-end,
#html,css,javascript
import os,shutil
#os=função de sistema, pegar caminhos de pasta 'imagem'
#shutil=salvar ou pegar o caminho do diretório 'caminho/imagem'
import random
#Session=modelagem dos daos ORM 'id,nome,preco'
#from models_teste import DATABASE_URL
#get_db=coletar o banco 'produtos.db' para a API
#from models_teste import Produto
#Produto manipular o models Produtos
router=APIRouter()#rotas da api
templates=Jinja2Templates(directory="templates")#pasta front-end


# app = FastAPI(title="Rotas de Produtos")

# # python -m uvicorn controlller.produto_controller:app --reload

UPLOAD_DIR="static/uploads"
os.makedirs(UPLOAD_DIR,exist_ok=True)

@router.get("/home/", response_class=HTMLResponse)
async def pagina_carrinho(request: Request):
        return templates.TemplateResponse("home.html",{
        "request":request
    })

@router.get("/", response_class=HTMLResponse)
async def listar_todos (request:Request, 
                        db:Session=Depends(get_db)):
    produtos = db.query(Produto).all()
    return templates.TemplateResponse(
        "produtos.html",
        {"request": request, "produtos": produtos}
    )        


#rota detalhe do produto
@router.get("/produtos/{id_produto}",
            response_class=HTMLResponse)
async def detalhe(request:Request,id_produto:int,
                  db:Session=Depends(get_db)):
    #query do produto
    produto=db.query(Produto).filter(Produto.id==id_produto).first()
    
    # Todos os outros produtos (exceto o atual)
    outros_produtos = db.query(Produto).filter(Produto.id != id_produto).all()

    # Selecionar 3 aleatórios (ou menos se não houver suficientes)
    sugestoes = random.sample(outros_produtos, min(3, len(outros_produtos)))

    return templates.TemplateResponse("descricao.html",{
        "request":request,"produto":produto,"sugestoes": sugestoes
    })

@router.get("/carrinho/", response_class=HTMLResponse)
async def pagina_carrinho(request: Request,id_produto:int,
                  db:Session=Depends(get_db)):
    #query do produto
    #produto=db.query(Produto).filter(Produto.id==id_produto).first()
    
    # Todos os outros produtos (exceto o atual)
    #outros_produtos = db.query(Produto).filter(Produto.id != id_produto).all()

    # Selecionar 3 aleatórios (ou menos se não houver suficientes)
    #sugestoes = random.sample(outros_produtos, min(3, len(outros_produtos)))
    return templates.TemplateResponse("carrinho.html", {"request": request})
'''
@router.get("/carrinho/",
            response_class=HTMLResponse)
async def detalhe(request:Request,id_produto:int,
                  db:Session=Depends(get_db)):
    #query do produto
    produto=db.query(Produto).filter(Produto.id==id_produto).first()
    
    # Todos os outros produtos (exceto o atual)
    outros_produtos = db.query(Produto).filter(Produto.id != id_produto).all()

    # Selecionar 3 aleatórios (ou menos se não houver suficientes)
    sugestoes = random.sample(outros_produtos, min(3, len(outros_produtos)))

    return templates.TemplateResponse("carrinhodiferenciado.html",{
        "request":request,"produto":produto,"sugestoes": sugestoes
    })
'''

# # Pegar todos os produtos 
# @app.get("/")
# async def listar_produtos(db:Session = Depends(get_db)):
#     produtos = db.query(Produto).all()
#     return {"produtos": [p.nome_produto for p in produtos]}

# # Buscar produtos pelo id 
# @app.get("/produtos/{produtos_id}")
# async def buscar_produtos(produtos_id:int):
#     conexao = sq.connect("loja.db")
#     cursor = conexao.cursor()
#     cursor.execute("""SELECT * FROM produtos WHERE id=?""", (produtos_id))
#     produtos_i = cursor.fetchall()
#     if produtos_i:
#         return{"produto":produtos_i}
    
# @app.get("/produtos/")
# async def buscar_produto_nome(produto_nome:str):
#         conexao = sq.connect("loja.db")
#         cursor = conexao.cursor()
#         cursor.execute("""SELECT * FROM produtos WHERE nome=?""", (produto_nome))
#         produto_n = cursor.fetchall()
#         if produto_n:
#             return{"produto":produto_n}
        
# @app.post("/produto-criar/")
# async def adicionar_produto(produto:Produto):
#     conexao = sq.connect("loja.db")
#     cursor = conexao.cursor()
#     # ...existing code...
#     cursor.execute("""INSERT INTO produtos(
#     nome_produto, 
#     descricao,
#     tamanho,
#     cor,
#     preco,  
#     quantidade_estoque, 
#     data_cadastro, 
#     imagem_URL,
#     loja_id
# ) VALUES (?,?,?,?,?,?,?,?,?)""",
# (
#     produto.nome_produto,
#     produto.descricao,
#     produto.tamanho,
#     produto.cor, 
#     produto.preco,
#     produto.quantidade_estoque,  # Corrigido aqui!
#     produto.data_cadastro.isoformat(), 
#     produto.imagem_URL,
#     produto.loja_id
# ))
#     conexao.commit()
#     produto_id = cursor.lastrowid
#     conexao.close()
#     return{"id":produto_id, "mensagem":"Produto Criado"}

# @app.put("/produtos-update/{produtos_id}")
# async def atualizar_produtos(produto_id:int, produto:Produto):
#     conexao = sq.connect("loja.db")
#     cursor = conexao.cursor()
#     cursor.execute("""UPDATE produtos SET 
#                    nome_produto=?, 
#                     preco=?, 
#                     categoria=?, 
#                     estoque=?, 
#                     data_cadastro=?, 
#                     imagem_URL=?, 
#                     status=?, 
#                     descricao=?
#                     WHERE id=?""",
#                     (produto.nome_produto, 
#                      produto.preco, 
#                      produto.categoria, 
#                      produto.estoque, 
#                      produto.data_cadastro.isoformat(), 
#                      produto.imagem_URL, 
#                      produto.status, 
#                      produto.descricao,
#                      produto_id,))
#     conexao.commit()
#     update = cursor.rowcount
#     conexao.close()
#     if update:
#         return{"mensagem":f"Produto {produto_id} atualizado!"}
#     return{"ERRO":"Produto não encontrado"}


# @app.delete("/delete-produto/{produto_id}")
# async def deletar_produto(produto_id:int):
#     conexao = sq.connect("loja.db")
#     cursor = conexao.cursor()
#     cursor.execute("""DELETE FROM produtos WHERE id=?""", 
#                    (produto_id,))
#     conexao.commit()
#     delete = cursor.rowcount
#     if delete:
#         return{"mensagem": f"Produto {produto_id} deletado"}
#     return{"mensagem":"Produto não encontrado!"}