from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from controller.produto_controller import router
from controller.usuario_controller import caminho_prefixo_usuario
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Loja de Vestidos")

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

app.include_router(caminho_prefixo_usuario)

# python -m uvicorn main:app --reload

