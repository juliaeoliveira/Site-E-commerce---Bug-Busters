import re
from pydantic import BaseModel, field_validator,EmailStr
from typing import Optional
from datetime import datetime,timezone


class Usuario(BaseModel):
    #informações pessoais e contato
    nome_cliente : str
    data_nascimento : datetime
    data_cadastro : datetime
    email : EmailStr 
    telefone : str

    #informações para login
    senha : str
    tipo : Optional[str] = None 

    id_loja : Optional[str] = None 

    #validação do nome do cliente
    @field_validator('nome_cliente')
    @classmethod
    def validar_nome(cls, valor):
        nome = valor.strip()#remove espaços extras no início/fim
        if len(nome) < 3:
            raise ValueError('O nome deve conter pelo menos 3 caracteres.')
        #usa expressão para permitir apenas letras (com acentos) e espaços
        #A–Z e À–ÿ permitem letras com acentos --> validação feita com o chat para nn perder tempo
        if not re.match(r'^[A-Za-zÀ-ÿ\s]+$', nome):
            raise ValueError('O nome deve conter apenas letras e espaços.')
        return nome.title()
    
    #validação da data de nascimento
    @field_validator('data_nascimento')
    @classmethod
    def validar_data_nascimento(cls, valor):
        hoje = datetime.now(timezone.utc)
        if valor.tzinfo is None:
            valor = valor.replace(tzinfo=timezone.utc)
        if valor > hoje:
            raise ValueError('A data de nascimento não pode ser no futuro.')
        return valor
    
    #validação da data de cadastro
    @field_validator('data_cadastro')
    @classmethod
    def validar_data_cadastro(cls, valor, info):
       hoje = datetime.now(timezone.utc)
       if valor.tzinfo is None:
        valor = valor.replace(tzinfo=timezone.utc)
        if valor > hoje:
            raise ValueError("A data de cadastro não pode ser no futuro.")
        return valor
    
    #validação do telefone
    @field_validator('telefone')
    @classmethod
    def validar_telefone(cls, valor):
        numero_telefone = re.sub(r'\D', '', valor) #remove todos os caracteres que não são dígitos (ex: espaços, parênteses, hífens)

        #garante que o telefone tenha 10 ou 11 dígitos (formato brasileiro)
        #10 → fixo com DDD | 11 → celular com DDD
        if not re.match(r'^\d{10,11}$', numero_telefone):
            raise ValueError('Telefone deve conter 10 ou 11 dígitos numéricos [ ex: 11 99748-1839 ].')
        return numero_telefone
    
    #validação da senha
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
    

    
class Endereco(BaseModel):
    cep : str
    rua : str
    numero : str
    complemento : Optional[str] = None
    bairro : str
    cidade : str
    estado : str
    loja_id : Optional[str] = None
    usuario_id : Optional[int] = None

    #validação do CEP
    @field_validator('cep')
    @classmethod
    def validar_cep(cls, valor):
        valor = valor.strip()#remove espaços e normaliza formato

        if not re.match(r'^\d{5}-?\d{3}$', valor): #expressão regular para CEP no formato "12345-678" ou "12345678"
            raise ValueError('CEP inválido. Use o formato 12345-678 ou 12345678.')

        valor = valor.replace("-", "")#garante formato padronizado (com hífen)
        return f"{valor[:5]}-{valor[5:]}"
        
    
    #validação da rua
    @field_validator('rua')
    @classmethod
    def validar_rua(cls, valor):
        if len(valor.strip()) < 3:
            raise ValueError('O nome da rua deve conter pelo menos 3 caracteres.')
        return valor.strip().title()

    #validação do número
    @field_validator('numero')
    @classmethod
    def validar_numero(cls, valor):
        if not re.match(r'^\d+[A-Za-z]?$|^(S/?N)$', valor.strip(), re.IGNORECASE):#aceita número (ex: "123") ou complementos simples (ex: "123A", "S/N")
            raise ValueError('Número inválido. Exemplo válido: "123", "123A" ou "S/N".')
        return valor.strip().upper()

    #validação do complemento (opcional)
    @field_validator('complemento')
    @classmethod
    def validar_complemento(cls, valor):
        if valor and len(valor.strip()) < 2:
            raise ValueError('O complemento deve conter pelo menos 2 caracteres, se informado.')
        return valor.strip().title() if valor else valor


    #validação do bairro
    @field_validator('bairro')
    @classmethod
    def validar_bairro(cls, valor):
        if len(valor.strip()) < 3:
            raise ValueError('O nome do bairro deve conter pelo menos 3 caracteres.')
        return valor.strip().title()


    #validação da cidade
    @field_validator('cidade')
    @classmethod
    def validar_cidade(cls, valor):
        if len(valor.strip()) < 2:
            raise ValueError('O nome da cidade deve conter pelo menos 2 caracteres.')
        if not re.match(r'^[A-Za-zÀ-ÿ\s]+$', valor.strip()):
            raise ValueError('O nome da cidade deve conter apenas letras e espaços.')
        return valor.strip().title()

    # Validação do estado (UF)
    @field_validator('estado')
    @classmethod
    def validar_estado(cls, valor):
        valor = valor.strip().upper()

        # Lista de siglas válidas de estados brasileiros
        ufs_validas = {
            "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES",
            "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR",
            "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
            "SP", "SE", "TO"
        }

        if valor not in ufs_validas:
            raise ValueError(f'Estado inválido: "{valor}". Use apenas a sigla, ex: "SP".')

        return valor 

