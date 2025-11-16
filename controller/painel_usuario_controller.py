from fastapi import APIRouter, Depends, Request, Form
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
def pagina_carrinho(request: Request, db: Session = Depends(get_db)):
    token=request.cookies.get("token")
    payload = verificar_token(token)
    if not token or not verificar_token(token):
        return RedirectResponse(url="/",status_code=303)
    usuario = db.query(Usuario_Model).filter(Usuario_Model.email == payload["sub"]).first()
    primeiro_nome = usuario.nome_cliente.split(' ')[0]
    return templates.TemplateResponse("painel_usuario_carrinho.html", {"request": request , "primeiro_nome" : primeiro_nome})

@caminho_prefixo_painelUsuario.get("/produtos", response_class=HTMLResponse)
async def listar_todos (request:Request, 
                        db:Session=Depends(get_db)):
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
    produtos = db.query(Produto).all()
    return templates.TemplateResponse(
        "painel_usuario_produtos.html",
        {"request": request, "produtos": produtos, "primeiro_nome" : primeiro_nome}
    )        

#rota detalhe do produto
@caminho_prefixo_painelUsuario.get("/produtos/{id_produto}",
            response_class=HTMLResponse)
async def detalhe(request:Request,id_produto:int,
                  db:Session=Depends(get_db)):
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
    #query do produto
    produto=db.query(Produto).filter(Produto.id==id_produto).first()
    
    # Todos os outros produtos (exceto o atual)
    outros_produtos = db.query(Produto).filter(Produto.id != id_produto).all()

    # Selecionar 3 aleatórios (ou menos se não houver suficientes)
    sugestoes = random.sample(outros_produtos, min(3, len(outros_produtos)))

    return templates.TemplateResponse("painel_usuario_descricao.html",{
        "request":request,"produto":produto,"sugestoes": sugestoes, "primeiro_nome" : primeiro_nome
    })

#dados do usuario
@caminho_prefixo_painelUsuario.get("/meus_dados", response_class=HTMLResponse)
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

    primeiro_nome = usuario.nome_cliente.split(' ')[0]
    return templates.TemplateResponse("painel_usuario_meus_dados.html", {
        "request": request,
        "usuario": usuario,
        "endereco": endereco,
        "primeiro_nome" : primeiro_nome
    })

@caminho_prefixo_painelUsuario.get("/editar_usuario")
def editar_usuario(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token")
    payload = verificar_token(token)

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
    
    primeiro_nome = usuario.nome_cliente.split(' ')[0]
    return templates.TemplateResponse("painel_usuario_editar_usuario.html",{
        "request":request, "usuario":usuario, "primeiro_nome" : primeiro_nome
    })


@caminho_prefixo_painelUsuario.post("/editar_usuario")
def editar_usuario(request:Request,
    nome_cliente: str = Form(...),
    email: str = Form(...),
    data_nascimento: str = Form(...),
    telefone: str = Form(...),
    db: Session = Depends(get_db)
    ):
    
    token=request.cookies.get("token")
    payload=verificar_token(token)
    if not payload:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Parece que seu token de login expirou, por favor faça login novamente.",
            "link_login": "/usuario/login"
        })
    email_cadastrado=payload.get("sub")

    usuario = db.query(Usuario_Model).filter(Usuario_Model.email == email_cadastrado).first()
    if not usuario:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Usuário não encontrado.",
            "link_login": "/usuario/login"
        })
    
    #atualizar os campos
    usuario.nome_cliente = nome_cliente
    usuario.email = email
    usuario.data_nascimento = data_nascimento
    usuario.telefone = telefone

    db.commit()
    db.refresh(usuario)
    return RedirectResponse(url="/painel_usuario/meus_dados",status_code=303)

@caminho_prefixo_painelUsuario.get("/editar_endereco")
def editar_endereco(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token")
    payload = verificar_token(token)

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
    
    endereco = usuario.endereco

    #caso o usuário ainda não tenha endereço cadastrado
    if not endereco:
        endereco = Endereco(
            cep="",
            rua="",
            numero="",
            complemento="",
            bairro="",
            cidade="",
            estado=""
        )
    
    primeiro_nome = usuario.nome_cliente.split(' ')[0]

    return templates.TemplateResponse("painel_usuario_editar_endereco.html",{
        "request" : request, "endereco" : endereco, "primeiro_nome" : primeiro_nome
    })

@caminho_prefixo_painelUsuario.post("/editar_endereco")
def editar_endereco(request:Request,
    cep : str = Form(...),
    rua : str = Form(...),
    numero : str = Form(...),
    complemento : str = Form(...),
    bairro : str = Form(...),
    cidade : str = Form(...),
    estado : str = Form(...),
    db: Session = Depends(get_db)
    ):
    
    token=request.cookies.get("token")
    payload=verificar_token(token)
    if not payload:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Parece que seu token de login expirou, por favor faça login novamente.",
            "link_login": "/usuario/login"
        })
    email_cadastrado=payload.get("sub")

    usuario = db.query(Usuario_Model).filter(Usuario_Model.email == email_cadastrado).first()
    if not usuario:
        return templates.TemplateResponse("mensagem.html", {
            "request": request,
            "mensagem": "Usuário não encontrado.",
            "link_login": "/usuario/login"
        })
    
    endereco = usuario.endereco
    
    #atualizar os campos
    if endereco is None:
        endereco = Endereco(
            usuario_id=usuario.id,
            cep=cep,
            rua=rua,
            numero=numero,
            complemento=complemento,
            bairro=bairro,
            cidade=cidade,
            estado=estado
        )
        db.add(endereco)

    else:
        endereco.cep = cep
        endereco.rua = rua
        endereco.numero = numero
        endereco.complemento = complemento
        endereco.bairro = bairro
        endereco.cidade = cidade
        endereco.estado = estado

    db.commit()
    db.refresh(endereco)
    return RedirectResponse(url="/painel_usuario/meus_dados",status_code=303)


#listar pedidos do usuário
@caminho_prefixo_painelUsuario.get("/meus_pedidos",response_class=HTMLResponse)
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
    primeiro_nome = usuario.nome_cliente.split(' ')[0]
    return templates.TemplateResponse("painel_usuario_meus_pedidos.html",
        {"request":request,"pedidos":pedidos,"primeiro_nome":primeiro_nome})

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
    email=payload.get("sub")
    usuario = db.query(Usuario_Model).filter(Usuario_Model.email == email).first()
    pedido = db.query(Pedido).filter(Pedido.id == id_pedido).first()

    if not pedido:
        return templates.TemplateResponse("mensagem_pedido.html", {
            "request": request,
            "mensagem": "Nenhum pedido registrado.",
            "link": "/painel_usuario/produtos"
        })

    itens = pedido.itens_pedido  
    primeiro_nome = usuario.nome_cliente.split(' ')[0]
    return templates.TemplateResponse("painel_usuario_detalhe_pedido.html", {
        "request": request,
        "pedido": pedido,
        "itens": itens,
        "primeiro_nome" : primeiro_nome
    })

@caminho_prefixo_painelUsuario.post("/meus-pedidos/cancelar_pedido", response_class=HTMLResponse)
def cancelar_pedido(request: Request, db: Session = Depends(get_db), id_pedido : int=Form(...)):
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

    # Busca apenas o pedido específico que pertence a este usuário
    pedido = (db.query(Pedido).filter(Pedido.id == id_pedido, Pedido.id_usuario == id_usuario).first())

    if not pedido:
        return templates.TemplateResponse("mensagem_pedido.html", {
            "request": request,
            "mensagem": "Você ainda não realizou nenhum pedido.",
            "link": "/painel_usuario/produtos"
        })
    
    pedido.status = "cancelado"
    db.commit()
    db.refresh(pedido)

    return RedirectResponse (url="/painel_usuario/meus_pedidos", status_code=303)

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
        return templates.TemplateResponse("mensagem_pedido.html", {
            "request": request,
            "mensagem": "Você ainda não realizou nenhum pedido.",
            "link": "/painel_usuario/produtos"
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
    primeiro_nome = usuario.nome_cliente.split(' ')[0]
    return templates.TemplateResponse("painel_usuario_comprar_novamente.html", {
        "request": request,
        "produtos": produtos_unicos,
        "primeiro_nome" : primeiro_nome
    })


#remove o cookie do token do usuario
@caminho_prefixo_painelUsuario.get("/lougout")
def logout(request:Request):
    response=RedirectResponse(url="/",status_code=303)
    response.delete_cookie(key="token")
    return response


