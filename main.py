from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from controller.produto_controller import router
from controller.usuario_controller import caminho_prefixo_usuario 
from controller.painel_usuario_controller import caminho_prefixo_painelUsuario
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from controller import pedido_controller

app = FastAPI(title="Loja de Vestidos")
templates = Jinja2Templates(directory="view/templates")

# Exception handler para erros de validação
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        field = " -> ".join(str(loc) for loc in error["loc"])
        errors.append(f"{field}: {error['msg']}")
    error_msg = "Erro de validação: " + "; ".join(errors)
    print(f"Erro de validação na requisição {request.url}: {error_msg}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": error_msg}
    )

# #--------------------------------------------------------------
# app.add_middleware(                                          #-
#     CORSMiddleware,                                          #-  
#     allow_origins=["*"],  # você pode restringir depois      #-  
#     allow_credentials=True,                                  #-  Parte insirida com o chat, resolveu o erro da pagina loginexemplo nn estar
#     allow_methods=["*"],                                     #-  se conectando com o servidor "configuração CORS no backend"
#     allow_headers=["*"],                                     #-  
# )                                                            #-    
# #--------------------------------------------------------------

app.mount("/static", StaticFiles(directory="view/static"), name="static")

app.include_router(router)
app.include_router(pedido_controller.router)

app.include_router(caminho_prefixo_usuario)
app.include_router(caminho_prefixo_painelUsuario)

@app.get("/historico")
def historico(request: Request):
    return templates.TemplateResponse("historico.html", {"request":request})

# python -m uvicorn main:app --reload

