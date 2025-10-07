from models import SessionLocal, Produto

db = SessionLocal()
produtos = db.query(Produto).all()
print("Produtos encontrados:", produtos)
db.close()
