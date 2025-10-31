from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from controller.produto_controller import router
from controller.usuario_controller import caminho_prefixo_usuario 
from controller.painel_usuario_controller import caminho_prefixo_painelUsuario
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from controller import pedido_controller

app = FastAPI(title="Loja de Vestidos")
templates = Jinja2Templates(directory="view/templates")

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

