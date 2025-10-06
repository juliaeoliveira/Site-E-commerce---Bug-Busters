from fastapi import FastAPI
from controller.produto_controller import router
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="MVC Produtos")

app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(router)
# python -m uvicorn app:app --reload
