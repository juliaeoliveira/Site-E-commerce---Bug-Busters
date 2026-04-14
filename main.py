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

from fastapi.staticfiles import StaticFiles



app = FastAPI(title="Loja de Vestidos")
templates = Jinja2Templates(directory="view/templates")



app.mount("/static", StaticFiles(directory="view/static"), name="static")
# Mount explícito para uploads também (por segurança e certeza)
app.mount("/uploads", StaticFiles(directory="view/static/uploads"), name="uploads")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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


# Monta os arquivos de imagens da pasta 'coleção/img_colecao' em '/img_colecao'
app.mount("/img_colecao", StaticFiles(directory="coleção/img_colecao"), name="img_colecao")


app.include_router(router)
app.include_router(pedido_controller.router)

app.include_router(caminho_prefixo_usuario)
app.include_router(caminho_prefixo_painelUsuario)

@app.get("/historico")
def historico(request: Request):
    return templates.TemplateResponse("historico.html", {"request":request})

@app.get("/debug/images")
def debug_images(request: Request):
    """Endpoint para debug - mostra URLs das imagens servidas"""
    import os
    upload_dir = "view/static/uploads"
    scheme = request.url.scheme
    server = request.headers.get('host', request.url.netloc)
    base_url = f"{scheme}://{server}"
    
    images = []
    if os.path.exists(upload_dir):
        for file in os.listdir(upload_dir)[:10]:  # Primeiras 10 imagens
            if file.endswith(('.jpg', '.jpeg', '.png', '.gif')):
                images.append({
                    "filename": file,
                    "url": f"{base_url}/static/uploads/{file}"
                })
    
    return {
        "base_url": base_url,
        "host_header": request.headers.get('host'),
        "scheme": scheme,
        "upload_dir": upload_dir,
        "uploaded_images": images,
        "message": "Acesse as URLs acima para verificar se as imagens carregam"
    }

# python -m uvicorn main:app --reload


