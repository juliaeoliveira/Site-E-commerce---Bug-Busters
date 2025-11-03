from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse,RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import get_db
from controller.usuario_autenticacao import verificar_token
from models import Usuario_Model, Produto, Endereco, Pedido
import random

templates=Jinja2Templates(directory="view/templates")
caminho_prefixo_painelUsuario = APIRouter(prefix='/painel_usuario')

#criar rota do dashboard do usuário , página protegida
@caminho_prefixo_painelUsuario.get("",response_class=HTMLResponse)
def painel_usuario(request:Request, db: Session = Depends(get_db)):
    token=request.cookies.get("token")
    payload = verificar_token(token)

    if not payload:
        return RedirectResponse(url="/",status_code=303)
    
    usuario = db.query(Usuario_Model).filter(Usuario_Model.email == payload["sub"]).first()

    if not usuario:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Usuário não encontrado.",
            "link_login": "/usuario/login"
        })
    
    primeiro_nome = usuario.nome_cliente.split(' ')[0]
    return templates.TemplateResponse("painel_usuario.html",
                    {"request":request, "primeiro_nome": primeiro_nome})

@caminho_prefixo_painelUsuario.get("/carrinho", response_class=HTMLResponse)
def pagina_carrinho(request: Request):
    token=request.cookies.get("token")
    if not token or not verificar_token(token):
        return RedirectResponse(url="/",status_code=303)
    return templates.TemplateResponse("painel_usuario_carrinho.html", {"request": request})

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

#dados do usuario
@caminho_prefixo_painelUsuario.get("/me/dados", response_class=HTMLResponse)
def meus_dados(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token")
    payload = verificar_token(token)

    if not payload:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Parece que seu token de login expirou, por favor faça login novamente.",
            "link_login": "/usuario/login"
        })

    usuario = db.query(Usuario_Model).filter(Usuario_Model.email == payload["sub"]).first()

    if not usuario:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Usuário não encontrado.",
            "link_login": "/usuario/login"
        })
    #Usando o id do usuário para buscar o endereço
    endereco = db.query(Endereco).filter(Endereco.usuario_id == usuario.id).first()

    return templates.TemplateResponse("painel_usuario_meus_dados.html", {
        "request": request,
        "usuario": usuario,
        "endereco": endereco
    })

#listar pedidos do usuário
@caminho_prefixo_painelUsuario.get("/meus-pedidos",response_class=HTMLResponse)
def meus_pedidos(request:Request,db:Session=Depends(get_db)):
    token=request.cookies.get("token")
    payload=verificar_token(token)
    if not payload:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Parece que seu token de login expirou, por favor faça login novamente.",
            "link_login": "/usuario/login"
        })
    email=payload.get("sub")

    usuario = db.query(Usuario_Model).filter(Usuario_Model.email == email).first()
    if not usuario:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Usuário não encontrado.",
            "link_login": "/usuario/login"
        })
    
    pedidos=db.query(Pedido).filter(Pedido.id_usuario == usuario.id).order_by(Pedido.data_pedido.desc()).all()
    return templates.TemplateResponse("painel_usuario_meus_pedidos.html",
        {"request":request,"pedidos":pedidos})

#detalhes dos pedidos do usuario
@caminho_prefixo_painelUsuario.get("/meus-pedidos/{id_pedido}", response_class=HTMLResponse)
def detalhe_pedido(id_pedido: int, request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token")
    payload = verificar_token(token)

    if not payload:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Parece que seu token de login expirou, por favor faça login novamente.",
            "link_login": "/usuario/login"
        })

    pedido = db.query(Pedido).filter(Pedido.id == id_pedido).first()

    if not pedido:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Nenhum pedido registrado.",
            "link_login": "/painel_usuario/carrinho"
        })

    itens = pedido.itens_pedido  
    return templates.TemplateResponse("painel_usuario_detalhe_pedido.html", {
        "request": request,
        "pedido": pedido,
        "itens": itens
    })

#comprar novamente: Pagina de produtos que usuario já comprou novamente 
@caminho_prefixo_painelUsuario.get("/comprar_novamente", response_class=HTMLResponse)
def comprar_novamente(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token")
    payload = verificar_token(token)

    # Verifica se o token é válido
    if not payload:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Parece que seu login expirou. Faça login novamente.",
            "link_login": "/usuario/login"
        })

    email=payload.get("sub")
    
    usuario = db.query(Usuario_Model).filter(Usuario_Model.email==email).first()
    id_usuario = usuario.id

    pedidos = db.query(Pedido).filter(Pedido.id_usuario == id_usuario).all()

    if not pedidos:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Você ainda não realizou nenhum pedido.",
            "link_login": "/painel_usuario/carrinho"
        })

    #extrai todos os produtos únicos comprados anteriormente
    produtos_comprados = []
    for pedido in pedidos:
        for item in pedido.itens_pedido:
            produtos_comprados.append(item.produto)

    #remove duplicados
    produtos_unicos = {p.id: p for p in produtos_comprados}.values()
    #Cria um dicionário onde a chave é o ID do produto (p.id) e o valor é o próprio produto (p),
    # garantindo que produtos com o mesmo ID (ou seja, duplicados) sejam substituídos e assim eliminados.
    # Em seguida, .values() retorna apenas os produtos únicos (sem duplicatas).

    return templates.TemplateResponse("painel_usuario_comprar_novamente.html", {
        "request": request,
        "produtos": produtos_unicos
    })




#remove o cookie do token do usuario
@caminho_prefixo_painelUsuario.get("/lougout")
def logout(request:Request):
    response=RedirectResponse(url="/",status_code=303)
    response.delete_cookie(key="token")
    return response


