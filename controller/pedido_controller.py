from fastapi import APIRouter, Request, Form, UploadFile, File, Depends
from database import get_db
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse

router = APIRouter(prefix="/pedido", tags=["Pedido"])
templates = Jinja2Templates(directory="view/templates")

@router.post("/fechar")
def fechar_pedido(request: Request):
    return RedirectResponse(url="/historico", status_code = 303)
