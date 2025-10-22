from datetime import datetime, timedelta
from fastapi import status
from fastapi.exceptions import HTTPException #para caso ocorrer erros
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext
from jose import jwt, JWSError
from decouple import config
from models import Usuario_Model, Endereco as Endereco_Model
from schemas import Usuario , Endereco


CHAVE_SECRETA = config('CHAVE_SECRETA')
ALGORITMO = config('ALGORITMO')

#tempo do token de usuário 
ACCESS_TOKEN=30#30 MINUTOS de tempo de token

crypt_context = CryptContext(schemes=['sha256_crypt']) # esquema mais popular para fazer o hash de senha

class ServicosUsuario:
    def __init__(self, db_session: Session):
        self.db_session = db_session


    def registrar_usuario(self, usuario: Usuario , endereco : Endereco):
        usuario_model = Usuario_Model(
            nome_cliente = usuario.nome_cliente,
            data_nascimento = usuario.data_nascimento,
            data_cadastro = usuario.data_cadastro,
            email= usuario.email,
            telefone = usuario.telefone,
<<<<<<< HEAD
            nome_usuario = usuario.nome_usuario,
=======
>>>>>>> 271195c313743e77941dc2c83af658bd48f50078
            senha = crypt_context.hash(usuario.senha), # Senha hashada/criptografada 
            tipo = usuario.tipo
        )
        try:
            self.db_session.add(usuario_model)
            self.db_session.commit()
            self.db_session.refresh(usuario_model)

            #somente depois de criar usuario, cria-se o endereço pra pegar o id e colocar no endereço direto
            endereco_model = Endereco_Model(
                rua=endereco.rua,
                numero=endereco.numero,
                complemento=endereco.complemento,
                bairro=endereco.bairro,
                cidade=endereco.cidade,
                estado=endereco.estado,
                cep=endereco.cep, 
                usuario_id=endereco.usuario_id,
                loja_id=endereco.loja_id
            )
            if usuario.tipo.lower() == "cliente":
                endereco_model.usuario_id = usuario_model.id # associa o endereço ao usuário
            if usuario.tipo.lower() == "adm" or usuario.tipo.lower() == "administrador":
                endereco_model.loja_id = usuario_model.id

            self.db_session.add(endereco_model)
            self.db_session.commit()

        except IntegrityError:  #se tentar mandar um dado que já existe no banco
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='O usuário já existe'
            )
#função de gerar o hash da senha
def gerar_hash_senha(senha:str):
    return crypt_context.hash(senha)

#função para verificar o hash da senha
def verificar_hash_senha(senha:str , senha_hash:str):
    return crypt_context.verify(senha , senha_hash)

#criar token de usuário
def criar_token(dados:dict):
    dados_token=dados.copy()
    expira=datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN)
    dados_token.update({"exp":expira})
    token_jwt=jwt.encode(dados_token,CHAVE_SECRETA,
                         algorithm=ALGORITMO)
    return token_jwt


#verificar token do usuário
def verificar_token(token:str):
    try:
        payload=jwt.decode(token,CHAVE_SECRETA,
                           algorithms=[ALGORITMO])
        return payload
    except JWSError:
        return None