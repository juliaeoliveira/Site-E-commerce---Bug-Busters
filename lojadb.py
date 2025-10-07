import sqlite3
from datetime import datetime

DB = "loja.db"

def conectar():
    return sqlite3.connect(DB)

# ============================================================
# =============== FUNÇÕES DE INSERÇÃO =========================
# ============================================================

def inserir_loja():
    conn = conectar()
    cur = conn.cursor()

    print("\n=== Inserindo nova LOJA ===")
    cnpj = input("CNPJ: ")
    nome_loja = input("Nome da loja: ")
    rua = input("Rua: ")
    numero = input("Número: ")
    complemento = input("Complemento: ")
    bairro = input("Bairro: ")
    cidade = input("Cidade: ")
    estado = input("Estado (2 letras): ")
    cep = input("CEP: ")
    telefone = input("Telefone: ")
    email = input("Email: ")

    cur.execute("""
        INSERT INTO loja (cnpj, nome_loja, rua, numero, complemento, bairro, cidade, estado, cep, telefone, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (cnpj, nome_loja, rua, numero, complemento, bairro, cidade, estado, cep, telefone, email))

    conn.commit()
    conn.close()
    print("✅ Loja inserida com sucesso!")


def inserir_cliente():
    conn = conectar()
    cur = conn.cursor()

    print("\n=== Inserindo novo CLIENTE ===")
    nome_cliente = input("Nome do cliente: ")
    data_nascimento = input("Data de nascimento (YYYY-MM-DD): ")
    data_cadastro = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    email = input("Email: ")
    telefone = input("Telefone: ")
    rua = input("Rua: ")
    numero = input("Número: ")
    complemento = input("Complemento: ")
    bairro = input("Bairro: ")
    cidade = input("Cidade: ")
    estado = input("Estado (2 letras): ")
    cep = input("CEP: ")
    id_loja = input("ID da loja: ")

    cur.execute("""
        INSERT INTO cliente (nome_cliente, data_nascimento, data_cadastro, email, telefone,
        rua, numero, complemento, bairro, cidade, estado, cep, id_loja)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (nome_cliente, data_nascimento, data_cadastro, email, telefone,
          rua, numero, complemento, bairro, cidade, estado, cep, id_loja))

    conn.commit()
    conn.close()
    print("✅ Cliente inserido com sucesso!")


def inserir_produto():
    conn = conectar()
    cur = conn.cursor()

    print("\n=== Inserindo novo PRODUTO ===")
    nome_produto = input("Nome do produto: ")
    preco = float(input("Preço: "))
    descricao = input("Descrição: ")
    cor = input("Cor: ")
    categoria = input("Categoria: ")
    quantidade_estoque = int(input("Quantidade em estoque: "))
    data_cadastro = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    imagem_URL = input("URL da imagem: ")
    status = int(input("Status (1=ativo, 0=inativo): "))
    loja_id = input("ID da loja: ")

    cur.execute("""
        INSERT INTO produtos (nome_produto, preco, descricao, cor, categoria,
        quantidade_estoque, data_cadastro, imagem_URL, status, loja_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (nome_produto, preco, descricao, cor, categoria, quantidade_estoque,
          data_cadastro, imagem_URL, status, loja_id))

    conn.commit()
    conn.close()
    print("✅ Produto inserido com sucesso!")


def inserir_pedido():
    conn = conectar()
    cur = conn.cursor()

    print("\n=== Inserindo novo PEDIDO ===")
    data_pedido = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    valor_total = float(input("Valor total: "))
    status = int(input("Status (1=ativo, 0=cancelado): "))
    id_cliente = input("ID do cliente: ")

    cur.execute("""
        INSERT INTO pedido (data_pedido, valor_total, status, id_cliente)
        VALUES (?, ?, ?, ?)
    """, (data_pedido, valor_total, status, id_cliente))

    conn.commit()
    conn.close()
    print("✅ Pedido inserido com sucesso!")


def inserir_pagamento():
    conn = conectar()
    cur = conn.cursor()

    print("\n=== Inserindo novo PAGAMENTO ===")
    data_pagamento = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    valor = float(input("Valor: "))
    metodo_pagamento = input("Método de pagamento: ")
    status = int(input("Status (1=efetuado, 0=pendente): "))
    id_cliente = input("ID do cliente: ")
    id_pedido = input("ID do pedido: ")
    cnpj_loja = input("CNPJ da loja: ")

    cur.execute("""
        INSERT INTO pagamento (data_pagamento, valor, metodo_pagamento, status, id_cliente, id_pedido, cnpj_loja)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (data_pagamento, valor, metodo_pagamento, status, id_cliente, id_pedido, cnpj_loja))

    conn.commit()
    conn.close()
    print("✅ Pagamento inserido com sucesso!")


def inserir_item_pedido():
    conn = conectar()
    cur = conn.cursor()

    print("\n=== Inserindo ITEM DE PEDIDO ===")
    tamanho = input("Tamanho: ")
    quantidade = int(input("Quantidade: "))
    preco_unitario = float(input("Preço unitário: "))
    subtotal = quantidade * preco_unitario
    id_pedido = input("ID do pedido: ")
    id_produto = input("ID do produto: ")

    cur.execute("""
        INSERT INTO item_pedido (tamanho, quantidade, preco_unitario, subtotal, id_pedido, id_produto)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (tamanho, quantidade, preco_unitario, subtotal, id_pedido, id_produto))

    conn.commit()
    conn.close()
    print("✅ Item do pedido inserido com sucesso!")


# ============================================================
# ===================== MENU PRINCIPAL =======================
# ============================================================

def menu():
    opcoes = {
        "1": ("Inserir loja", inserir_loja),
        "2": ("Inserir cliente", inserir_cliente),
        "3": ("Inserir produto", inserir_produto),
        "4": ("Inserir pedido", inserir_pedido),
        "5": ("Inserir pagamento", inserir_pagamento),
        "6": ("Inserir item de pedido", inserir_item_pedido),
        "0": ("Sair", None)
    }

    while True:
        print("\n=== MENU PRINCIPAL ===")
        for k, v in opcoes.items():
            print(f"{k}. {v[0]}")

        escolha = input("Escolha uma opção: ")
        if escolha == "0":
            print("Saindo...")
            break

        func = opcoes.get(escolha)
        if func:
            func[1]()
        else:
            print("Opção inválida!")

if __name__ == "__main__":
    menu()
