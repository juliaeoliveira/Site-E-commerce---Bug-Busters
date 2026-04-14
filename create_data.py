from models import Produto
from database import SessionLocal
from decimal import Decimal

db = SessionLocal()

novo_produto = Produto(
    nome_produto="Vestido Floral",
    preco=Decimal("129.90"),
    descricao="Vestido leve com estampa floral",
    cor="Azul",
    categoria="Vestidos",
    quantidade_estoque=10,
    imagem1_url="https://cdn-1.azazie.com/upimg/h65/f6/53/1ea6661ff836a40451fe4aa46deff653.jpg.webp",
    imagem2_url="https://cdn-1.azazie.com/upimg/h65/39/ef/be9996d9d628b3a6f2b5d81fb67c39ef.jpg.webp",
    imagem3_url="https://cdn-1.azazie.com/upimg/h65/9b/cf/28c0de8d572974ddda76f961ce8a9bcf.jpg.webp",
    imagem4_url="https://cdn-1.azazie.com/upimg/h65/55/6d/66db81909df7fd051ac6acc63923556d.jpg.webp",
    loja_id="12345678000199"
)

db.add(novo_produto)
db.commit()
db.refresh(novo_produto)

print("Produto criado:", novo_produto.id)