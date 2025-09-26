from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import sqlite3 as sq

class Produto(BaseModel):
    nome_produto:str
    descricao:str
    tamanho:str
    cor:str
    preco:float
    quantidade_estoque:int
    data_cadastro:datetime
    imagem_URL:str
    loja_id:int
    

app = FastAPI(title="Rotas de Produtos")

# python -m uvicorn controlller.produto_controller:app --reload

# Pegar todos os produtos 
@app.get("/")
async def listar_produtos():
    conexao = sq.connect("loja.db")
    cursor = conexao.cursor()
    cursor.execute("""SELECT * FROM produtos""")
    todos_produtos = cursor.fetchall()
    conexao.close()
    return{"produtos": todos_produtos}

# Buscar produtos pelo id 
@app.get("/produtos/{produtos_id}")
async def buscar_produtos(produtos_id:int):
    conexao = sq.connect("loja.db")
    cursor = conexao.cursor()
    cursor.execute("""SELECT * FROM produtos WHERE id=?""", (produtos_id))
    produtos_i = cursor.fetchall()
    if produtos_i:
        return{"produto":produtos_i}
    
@app.get("/produtos/")
async def buscar_produto_nome(produto_nome:str):
        conexao = sq.connect("loja.db")
        cursor = conexao.cursor()
        cursor.execute("""SELECT * FROM produtos WHERE nome=?""", (produto_nome))
        produto_n = cursor.fetchall()
        if produto_n:
            return{"produto":produto_n}
        
@app.post("/produto-criar/")
async def adicionar_produto(produto:Produto):
    conexao = sq.connect("loja.db")
    cursor = conexao.cursor()
    # ...existing code...
    cursor.execute("""INSERT INTO produtos(
    nome_produto, 
    descricao,
    tamanho,
    cor,
    preco,  
    quantida_estoque, 
    data_cadastro, 
    imagem_URL,
    loja_id
) VALUES (?,?,?,?,?,?,?,?,?)""",
(
    produto.nome_produto,
    produto.descricao,
    produto.tamanho,
    produto.cor, 
    produto.preco,
    produto.quantida_estoque,  # Corrigido aqui!
    produto.data_cadastro.isoformat(), 
    produto.imagem_URL,
    produto.loja_id
))
    conexao.commit()
    produto_id = cursor.lastrowid
    conexao.close()
    return{"id":produto_id, "mensagem":"Produto Criado"}

@app.put("/produtos-update/{produtos_id}")
async def atualizar_produtos(produto_id:int, produto:Produto):
    conexao = sq.connect("loja.db")
    cursor = conexao.cursor()
    cursor.execute("""UPDATE produtos SET 
                   nome_produto=?, 
                    preco=?, 
                    categoria=?, 
                    estoque=?, 
                    data_cadastro=?, 
                    imagem_URL=?, 
                    status=?, 
                    descricao=?
                    WHERE id=?""",
                    (produto.nome_produto, 
                     produto.preco, 
                     produto.categoria, 
                     produto.estoque, 
                     produto.data_cadastro.isoformat(), 
                     produto.imagem_URL, 
                     produto.status, 
                     produto.descricao,
                     produto_id,))
    conexao.commit()
    update = cursor.rowcount
    conexao.close()
    if update:
        return{"mensagem":f"Produto {produto_id} atualizado!"}
    return{"ERRO":"Produto não encontrado"}


@app.delete("/delete-produto/{produto_id}")
async def deletar_produto(produto_id:int):
    conexao = sq.connect("loja.db")
    cursor = conexao.cursor()
    cursor.execute("""DELETE FROM produtos WHERE id=?""", 
                   (produto_id,))
    conexao.commit()
    delete = cursor.rowcount
    if delete:
        return{"mensagem": f"Produto {produto_id} deletado"}
    return{"mensagem":"Produto não encontrado!"}