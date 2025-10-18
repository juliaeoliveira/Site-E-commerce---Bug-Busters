from datetime import datetime, timedelta
from fastapi import status
from fastapi.exceptions import HTTPException #para caso ocorrer erros
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext
from jose import jwt, JWTError
from decouple import config
from models import Usuario_Model, Endereco as Endereco_Model
from schemas import Usuario , Endereco , UsuarioLogin


CHAVE_SECRETA = config('CHAVE_SECRETA')
ALGORITMO = config('ALGORITMO')

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
            nome_usuario = usuario.nome_usuario,
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
            if usuario.tipo != "":
                if usuario.tipo.lower() == "cliente":
                    endereco_model.usuario_id = usuario_model.id # associa o endereço ao usuário
                if usuario.tipo.lower() == "adm" or "administrador": 
                    endereco_model.loja_id = '03.774.819/0005-28'

            self.db_session.add(endereco_model)
            self.db_session.commit()

        except IntegrityError:  #se tentar mandar um dado que já existe no banco
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='O usuário já existe'
            )

    def usuario_login(self, usuario: UsuarioLogin, expira_em: int = 90):
        usuario_existe = self.db_session.query(Usuario_Model).filter_by(nome_usuario=usuario.usuario).first() #busca no banco o usuario

        if usuario_existe is None: 
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Usuário ou senha inválido!' #se não achar no banco o usuário retorna essa mensagem
            )
        
        if not crypt_context.verify(usuario.senha, usuario_existe.senha): #verifica se as senha limpa e a hashada que esta no banco batem
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Usuário ou senha inválido!' #se a senha não bater retorna essa mensagem
            )
        
        expira = datetime.utcnow() + timedelta(minutes=expira_em) #expira em 90 minutos, apos isso o usuario recebe um HTTP 401 (Unauthorized),
        #com a mensagem: "Token has expired" e ele precisa realizar login novamente

        payload = {
            'sub': usuario.usuario,
            'exp': expira
        }

        acesso_token = jwt.encode(payload, CHAVE_SECRETA, algorithm=ALGORITMO) #cria a o token de acesso

        return {
            'acesso_token': acesso_token,
            'exp': expira.isoformat()#passando o datetime em formato de string
        }
        