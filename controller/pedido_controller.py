from fastapi import APIRouter, Request, Form, UploadFile, File, Depends, HTTPException, status
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from models import Pedido, ItemPedido, Produto, Usuario_Model
from schemas import PedidoCreate, ItemPedidoCreate
from controller.usuario_autenticacao import obter_usuario_logado,  verificar_token
from database import get_db
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from typing import List, Dict, Any
import traceback
import json

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
    try:
        # Valida se há itens no pedido
        if not pedido.itens_pedido:
            raise HTTPException(status_code=400, detail="O pedido deve conter pelo menos um item.")
        
        # Valida valores
        if pedido.valor_total <= 0:
            raise HTTPException(status_code=400, detail="O valor total do pedido deve ser maior que zero.")
        
        # Cria o pedido principal
        novo_pedido = Pedido(
            id_usuario=usuario.id,
            data_pedido=datetime.now(fuso),
            valor_total=pedido.valor_total,
            status=True
        )
        db.add(novo_pedido)
        db.flush()  # Garante que o ID seja gerado sem fazer commit ainda
        db.refresh(novo_pedido)

        # Cria os itens do pedido
        for item in pedido.itens_pedido:
            produto = db.query(Produto).filter(Produto.id == item.id_produto).first()
            if not produto:
                db.rollback()
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
    except HTTPException:
        db.rollback()
        raise
    except IntegrityError as e:
        db.rollback()
        error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
        print(f"Erro de integridade: {error_msg}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=400, 
            detail=f"Erro de integridade no banco de dados. Verifique se todos os dados estão corretos. Detalhes: {error_msg}"
        )
    except SQLAlchemyError as e:
        db.rollback()
        error_msg = str(e)
        print(f"Erro SQLAlchemy: {error_msg}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Erro no banco de dados: {error_msg}"
        )
    except Exception as e:
        db.rollback()
        error_msg = str(e)
        print(f"Erro inesperado: {error_msg}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500, 
            detail=f"Erro ao criar pedido: {error_msg}"
        )

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


# checkout de pedidos 
@router.post("/checkout")
def checkout(
    pedido: PedidoCreate,
    db: Session = Depends(get_db),
    usuario=Depends(obter_usuario_logado)
):
    # Valida se há itens no pedido
    if not pedido.itens_pedido:
        raise HTTPException(status_code=400, detail="Carrinho vazio")
    
    try:
        # Cria o pedido principal
        novo_pedido = Pedido(
            id_usuario=usuario.id,
            data_pedido=datetime.now(fuso),
            valor_total=pedido.valor_total,
            status=True
        )
        db.add(novo_pedido)
        db.flush()  # Garante que o ID seja gerado sem fazer commit ainda
        db.refresh(novo_pedido)

        # Cria os itens do pedido
        for item in pedido.itens_pedido:
            produto = db.query(Produto).filter(Produto.id == item.id_produto).first()
            if not produto:
                db.rollback()
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
        return RedirectResponse(url="/painel_usuario/meus_pedidos", status_code=303)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao processar checkout: {str(e)}")