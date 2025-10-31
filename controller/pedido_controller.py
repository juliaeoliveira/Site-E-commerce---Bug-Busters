from fastapi import APIRouter, Request, Form, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import Pedido, ItemPedido, Produto
from schemas import PedidoCreate, ItemPedidoCreate
from controller.usuario_autenticacao import obter_usuario_logado
from database import get_db
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from typing import List, Dict, Any

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


@router.get("/meus")
def listar_meus_pedidos(
    db: Session = Depends(get_db),
    usuario = Depends(obter_usuario_logado)
):
    pedidos: List[Pedido] = (
        db.query(Pedido)
        .filter(Pedido.id_usuario == usuario.id)
        .order_by(Pedido.data_pedido.desc())
        .all()
    )

    def serialize_pedido(p: Pedido) -> Dict[str, Any]:
        return {
            "id": p.id,
            "data_pedido": p.data_pedido,
            "valor_total": float(p.valor_total) if p.valor_total is not None else 0.0,
            "status": p.status,
            "itens": [
                {
                    "id": i.id,
                    "produto_id": i.id_produto,
                    "tamanho": i.tamanho,
                    "quantidade": i.quantidade,
                    "preco_unitario": float(i.preco_unitario) if i.preco_unitario is not None else 0.0,
                    "subtotal": float(i.subtotal) if i.subtotal is not None else 0.0,
                }
                for i in p.itens_pedido
            ],
        }

    return [serialize_pedido(p) for p in pedidos]


@router.get("/{pedido_id}")
def detalhar_pedido(
    pedido_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(obter_usuario_logado)
):
    pedido: Pedido | None = (
        db.query(Pedido)
        .filter(Pedido.id == pedido_id, Pedido.id_usuario == usuario.id)
        .first()
    )
    if not pedido:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")

    return {
        "id": pedido.id,
        "data_pedido": pedido.data_pedido,
        "valor_total": float(pedido.valor_total) if pedido.valor_total is not None else 0.0,
        "status": pedido.status,
        "itens": [
            {
                "id": i.id,
                "produto_id": i.id_produto,
                "tamanho": i.tamanho,
                "quantidade": i.quantidade,
                "preco_unitario": float(i.preco_unitario) if i.preco_unitario is not None else 0.0,
                "subtotal": float(i.subtotal) if i.subtotal is not None else 0.0,
            }
            for i in pedido.itens_pedido
        ],
    }
