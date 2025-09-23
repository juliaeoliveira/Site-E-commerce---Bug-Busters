from database import SessionLocal , Usuario
#models
#from models.usuarios import Usuario
#criar usuario e listar os usuários
def criar_cliente(nome:str,email:str):
    session=SessionLocal()
    usuario=Usuario(nome=nome,email=email)
    session.add(usuario)
    session.commit()
    session.close()
#testar
#criar_usuario("teste","teste@email")

def listar_usuario():
    session=SessionLocal()
    usuario=session.query(Usuario).all()
    session.close()
    return usuario