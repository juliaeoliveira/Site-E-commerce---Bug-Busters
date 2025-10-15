import re
from pydantic import BaseModel, field_validator,EmailStr
from typing import Optional

# Simulando banco de dados com emails já registrados 
USUARIOS_EXISTENTES = [
    {"username": "joao123", "email": "joao@example.com"},
    {"username": "maria", "email": "maria@email.com"},
]

class Usuario(BaseModel):
    usuario: str
    email: Optional[EmailStr] = None #opcional pois o login não depende do email e o OAuth2PasswordRequestForm não tem o campo email por padrão
    senha: str

    # Validação do usuario
    @field_validator('usuario')
    @classmethod
    def validacao_usuario(classe, valor):
        if not re.match(r'^[a-zA-Z0-9_.-]{3,20}$', valor):
            raise ValueError('Usuario deve ter entre 3 e 20 caracteres e conter apenas letras, números, ".", "_" ou "-".')
        return valor

    # Validação do email 
    @field_validator('email')
    @classmethod
    def validacao_email(classe, valor):
        for usuario in USUARIOS_EXISTENTES:
            if usuario['email'].lower() == valor.lower():
                raise ValueError('Email já está em uso.')
        return valor

    # Validação da senha
    @field_validator('senha')
    @classmethod
    def validacao_senha(classe, valor):
        if len(valor) < 8:
            raise ValueError('A senha deve ter pelo menos 8 caracteres.')
        if not re.search(r'[A-Z]', valor):
            raise ValueError('A senha deve conter pelo menos uma letra maiúscula.')
        if not re.search(r'[a-z]', valor):
            raise ValueError('A senha deve conter pelo menos uma letra minúscula.')
        if not re.search(r'\d', valor):
            raise ValueError('A senha deve conter pelo menos um número.')
        if not re.search(r'[@#$%^&+=!-]', valor):
            raise ValueError('A senha deve conter pelo menos um caractere especial (@#$%^&+=!-).')
        if " " in valor:
            raise ValueError('A senha não pode conter espaços.')
        return valor
