from fastapi import APIRouter,Request,Form,UploadFile,File,Depends, HTTPException
# APIRouter=rota api para o front-end,
# Request=Requesição HTTP,
# Form=Formulário para criar e editar,
# UploadFile=Upload da foto,
# File=Função para gravar o caminho da imagem,
# Depends=dependência do banco de dados sqlite para o fastapi
from pydantic import BaseModel
from sqlalchemy import or_
from sqlalchemy.orm import Session
from database import get_db
from models import Produto
from .usuario_autenticacao import verificar_token
from models import Usuario_Model
from schemas import Products
from fastapi.responses import HTMLResponse,RedirectResponse
# HTMLResponse=resposta do html GET,POST,PUT,DELETE,
# RedirectResponse=redirecionar a página ao receber o método'GET'
from fastapi.templating import Jinja2Templates
from typing import Optional

#from models_teste import SessionLocal
#Jinja2Templates=responsável por renderizar o front-end,
#html,css,javascript
import os    #,shutil
#os=função de sistema, pegar caminhos de pasta 'imagem'
#shutil=salvar ou pegar o caminho do diretório 'caminho/imagem'
import random
#Session=modelagem dos daos ORM 'id,nome,preco'
#from models_teste import DATABASE_URL
#get_db=coletar o banco 'produtos.db' para a API
#from models_teste import Produto
#Produto manipular o models Produtos
router=APIRouter()#rotas da api
templates=Jinja2Templates(directory="view/templates")#pasta front-end


# app = FastAPI(title="Rotas de Produtos")

# # python -m uvicorn controlller.produto_controller:app --reload

UPLOAD_DIR="view/static/uploads"
os.makedirs(UPLOAD_DIR,exist_ok=True)

@router.get("/", response_class=HTMLResponse)
async def pagina_carrinho(request: Request):
        return templates.TemplateResponse("home.html",{
        "request":request
    })

@router.get("/produtos/", response_class=HTMLResponse)
async def listar_todos (request:Request, 
                        db:Session=Depends(get_db)):
    produtos = db.query(Produto).all()
    return templates.TemplateResponse(
        "produtos.html",
        {"request": request, "produtos": produtos}
    ) 

# Rota da Api para o Mobile

def _normalize_image_url(image_url: str | None, base_url: str) -> str:
    if not image_url:
        return ""
    image_url = image_url.strip()
    if image_url.startswith("http://") or image_url.startswith("https://"):
        return image_url
    return f"{base_url}static/uploads/{image_url}"


def _build_product_response(product: Produto, base_url: str) -> dict:
    return {
        "id": product.id,
        "nome_produto": product.nome_produto,
        "preco": float(product.preco),
        "descricao": product.descricao,
        "cor": product.cor,
        "categoria": product.categoria,
        "imagem1_url": _normalize_image_url(product.imagem1_url, base_url),
        "imagem2_url": _normalize_image_url(product.imagem2_url, base_url),
        "imagem3_url": _normalize_image_url(product.imagem3_url, base_url),
        "imagem4_url": _normalize_image_url(product.imagem4_url, base_url),
        "status": bool(product.status),
    }

@router.get("/products", response_model=list[Products])
def list_products(request: Request, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(Produto).offset(skip).limit(limit).all()
    base_url = str(request.base_url)
    return [_build_product_response(product, base_url) for product in products]

# 1. Primeiro a rota de busca (Específica)
@router.get("/products/search", response_model=list[Products])
def search_products(request: Request, q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Produto)
    if q:
        search_term = f"%{q}%"
        query = query.filter(
            or_(Produto.nome_produto.ilike(search_term), Produto.descricao.ilike(search_term))
        )
    products = query.all()
    base_url = str(request.base_url)
    return [_build_product_response(product, base_url) for product in products]

# 2. Depois a rota de detalhes (Genérica)
@router.get("/products/{id_produto}")
async def details_products(request: Request, id_produto: int, db: Session = Depends(get_db)):
    product = db.query(Produto).filter(Produto.id == id_produto).first()
    if not product:
        raise HTTPException(status_code=404, detail="produto não encontrado")
    base_url = str(request.base_url)
    return {
        "produtos": _build_product_response(product, base_url),
    }
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

@router.get("/painel_usuario/carrinho", response_class=HTMLResponse)
async def pagina_carrinho(request: Request,id_produto:Optional[int]=None,
                  db:Session=Depends(get_db)):
    #validação para ter ctz que o usuario esta logado, caso nn exibir a mensagem com link do login 
    token = request.cookies.get("token")
    payload = verificar_token(token)
    if not token or not verificar_token(token):
        return templates.TemplateResponse("msg_carrinho.html", {
            "request": request,
            # "mensagem": "Para acessar seu carrinho, por favor faça login na sua conta.",
            # "link_login": "/usuario/login"
        })
    usuario = db.query(Usuario_Model).filter(Usuario_Model.email == payload["sub"]).first()

    if not usuario:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Usuário não encontrado.",
            "link_login": "/usuario/login"
        })
    
    primeiro_nome = usuario.nome_cliente.split(' ')[0]
    #query do produto
    if id_produto:
         produto=db.query(Produto).filter(Produto.id==id_produto).first()
    
    # Todos os outros produtos (exceto o atual)
    outros_produtos = db.query(Produto).filter(Produto.id != id_produto).all()

    # Selecionar 3 aleatórios (ou menos se não houver suficientes)
    sugestoes = random.sample(outros_produtos, min(3, len(outros_produtos)))
    return templates.TemplateResponse("painel_usuario_carrinho.html", {"request": request, "sugestoes":sugestoes, "primeiro_nome" : primeiro_nome})


@router.get("/colecoes", response_class=HTMLResponse)
async def pagina_colecoes(request: Request, db: Session = Depends(get_db)):
    """Exibe a página de coleções com produtos agrupados por categoria.

    Cada categoria é tratada como uma coleção.
    """
    produtos = db.query(Produto).all()

    # tenta obter primeiro nome do usuário (opcional)
    primeiro_nome = None
    try:
        token = request.cookies.get("token")
        payload = verificar_token(token)
        if payload:
            usuario = db.query(Usuario_Model).filter(Usuario_Model.email == payload.get("sub")).first()
            if usuario:
                primeiro_nome = usuario.nome_cliente.split(' ')[0]
    except Exception:
        primeiro_nome = None

    # Agrupa produtos por categoria
    colecoes = {}
    for p in produtos:
        chave = (p.categoria or "Sem Categoria").strip()
        colecoes.setdefault(chave, []).append(p)

    # Ordena as categorias alfabeticamente para exibição consistente
    categorias_ordenadas = sorted(colecoes.items(), key=lambda x: x[0].lower())

    return templates.TemplateResponse("colecoes.html", {
        "request": request,
        "colecoes": categorias_ordenadas,
        "primeiro_nome": primeiro_nome
    })


@router.get("/colecoes/{nome_colecao}", response_class=HTMLResponse)
async def pagina_colecao_produtos(nome_colecao: str, request: Request, db: Session = Depends(get_db)):
    """Exibe todos os produtos de uma coleção específica.
    
    Mapeia nome da coleção (Brisa do Altar, Sussurros, Encanto, O Desabrochar) 
    para categorias no banco de dados.
    """
    # Mapear coleção para categoria (nome exibido → valor do banco)
    mapeamento = {
        "Brisa do Altar": "brisa_do_altar",
        "Sussurros": "sussurros",
        "Encanto": "encanto",
        "O Desabrochar": "o_desabrochar",
    }
    
    categoria_db = mapeamento.get(nome_colecao, nome_colecao)
    
    # Busca produtos dessa categoria
    produtos = db.query(Produto).filter(Produto.categoria == categoria_db).all()
    
    # tenta obter primeiro nome do usuário (opcional)
    primeiro_nome = None
    try:
        token = request.cookies.get("token")
        payload = verificar_token(token)
        if payload:
            usuario = db.query(Usuario_Model).filter(Usuario_Model.email == payload.get("sub")).first()
            if usuario:
                primeiro_nome = usuario.nome_cliente.split(' ')[0]
    except Exception:
        primeiro_nome = None
    
    return templates.TemplateResponse("colecao_produtos.html", {
        "request": request,
        "nome_colecao": nome_colecao,
        "produtos": produtos,
        "primeiro_nome": primeiro_nome
    })
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