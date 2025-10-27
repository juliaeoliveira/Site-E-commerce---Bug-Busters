from fastapi import APIRouter, Request, Form, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import Pedido, ItemPedido, Produto
from schemas import PedidoCreate, ItemPedidoCreate
from controller.usuario_autenticacao import obter_usuario_logado
from database import get_db
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse

from datetime import datetime
import pytz

router = APIRouter(prefix="/pedido", tags=["Pedido"])
templates = Jinja2Templates(directory="view/templates")

fuso = pytz.timezone("America/Sao_Paulo")

@router.post("/salvar", status_code=status.HTTP_201_CREATED)
def criar_pedido(
    pedido: PedidoCreate,
    db: Session = Depends(get_db),
    usuario=Depends(obter_usuario_logado)
):
    # Cria o pedido principal
    novo_pedido = Pedido(
        id_usuario=usuario.id,
        data_pedido=datetime.now(fuso),
        valor_total=pedido.valor_total,
        status=True
    )
    db.add(novo_pedido)
    db.commit()
    db.refresh(novo_pedido)

    # Cria os itens do pedido
    for item in pedido.itens_pedido:
        produto = db.query(Produto).filter(Produto.id == item.id_produto).first()
        if not produto:
            raise HTTPException(status_code=404, detail=f"Produto ID {item.id_produto} não encontrado.")

        item_pedido = ItemPedido(
            id_pedido=novo_pedido.id,
            id_produto=item.id_produto,
            tamanho=item.tamanho,
            quantidade=item.quantidade,
            preco_unitario=item.preco_unitario,
            subtotal=item.subtotal
        )
        db.add(item_pedido)

    db.commit()
    return {"mensagem": "Pedido criado com sucesso!", "pedido_id": novo_pedido.id}

@router.post("/fechar")
def fechar_pedido(request: Request):
    return RedirectResponse(url="/historico", status_code = 303)
