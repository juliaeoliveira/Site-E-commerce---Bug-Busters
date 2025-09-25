from database import Produtos, Base
from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3

app = FastAPI(title="Rotas de Produtos")


@app.get("/")
async def listar_produtos():
    conexao = sqlite3.connect("loja.db")
    cursor = conexao.cursor()
    cursor.execute("""SELECT * FROM produtos""")
    todos_produtos = cursor.fetchall()
    conexao.close()
    return{"produtos": todos_produtos}