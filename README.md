FastAPI Adapter Routes
Informe o Link da sua API.JSON ex: http://suaapi.com/openapi.json

URL da API

http://127.0.0.1:8000/openapi.json

API detectada Loja de Vestidos

Guia da Adaptação FastAPI + React Native
Excelente! Como arquiteto Fullstack especializado em FastAPI e React Native, analiso seu esquema OpenAPI e farei as sugestões necessárias para otimizar essa arquitetura para o consumo por um aplicativo mobile moderno, além de aprimorar a estrutura e a performance.

Análise Geral do Esquema OpenAPI
O esquema atual descreve uma aplicação que combina endpoints de API REST (retornando application/json) com endpoints que retornam páginas HTML (text/html). Essa é uma abordagem comum para aplicações web que usam templates de servidor (Jinja2, etc.).

Pontos Fortes:

Boa granularidade das rotas, com endpoints específicos para CRUD de produtos, gerenciamento de pedidos e usuários.
Uso de path parameters ({id_produto}, {nome_colecao}) e schemas para request bodies (PedidoCreate, Body_..._post).
Definição de schemas para validação de entrada (Pydantic ValidationError).
Pontos de Melhoria para React Native (e uma arquitetura mais desacoplada):

HTML vs. JSON: A maioria das rotas GET para visualização (/, /produtos/, /colecoes, painel_usuario/*, /usuario/admin/*) retorna text/html. Para um cliente React Native, todas as respostas devem ser application/json. Isso exigirá a criação de novas rotas de API ou a modificação das existentes para retornar JSON.
Autenticação: O esquema não detalha o mecanismo de autenticação pós-login. Para React Native, JWT (JSON Web Tokens) é o padrão de mercado para autenticação stateless e segura.
DTOs (Data Transfer Objects): As respostas JSON existentes (poucas) estão vazias (schema: {}). É crucial definir DTOs claros para garantir que o cliente React Native receba apenas os dados necessários.
Padronização de Rotas: Há rotas repetidas com propósitos semelhantes sob diferentes prefixos (/produtos/ e /painel_usuario/produtos/). Para uma API, o ideal é ter uma rota canônica que possa ser consumida por diferentes clientes, com a diferenciação de acesso sendo feita por autenticação/autorização.
1. Novas Rotas Sugeridas
Para atender às necessidades de um cliente React Native e otimizar a API, sugiro as seguintes rotas, seguindo um padrão /api/v1/ para indicar que são endpoints de API JSON e versionamento.

a) Rota de Busca de Produtos
Baseada na lógica das rotas /produtos/ (listar todos) e /produtos/{id_produto} (detalhe), mas retornando JSON e permitindo filtros.

Endpoint: GET /api/v1/produtos/search
Resumo: Busca produtos com base em critérios de filtro e texto livre.
Descrição: Permite pesquisar produtos por nome, descrição, categoria, cor e faixa de preço. Ideal para a funcionalidade de busca no aplicativo mobile.
Parâmetros de Query:
q (string, opcional): Termo de busca livre (nome, descrição).
category (string, opcional): Filtra por categoria específica.
min_price (float, opcional): Preço mínimo.
max_price (float, opcional): Preço máximo.
color (string, opcional): Filtra por cor.
limit (integer, opcional, default: 10, max: 100): Número máximo de itens a retornar (para paginação).
skip (integer, opcional, default: 0): Número de itens a pular (para paginação).
Respostas:
200 OK: application/json - Uma lista de ProdutoListDTO.
422 Unprocessable Entity: application/json - Erro de validação.
b) Rota de Autenticação (JWT)
Essencial para um fluxo de login seguro e stateless para o aplicativo React Native.

Endpoint: POST /api/v1/auth/token

Resumo: Autentica um usuário e retorna um JWT.

Descrição: Recebe as credenciais do usuário (email e senha) e, se válidas, emite um token de acesso JWT. Este token deve ser incluído em todas as requisições subsequentes a rotas protegidas.

Request Body (FastAPI OAuth2PasswordRequestForm):

username (string, form): Email do usuário.
password (string, form): Senha do usuário.
Respostas:

200 OK: application/json
{
  "access_token": "eyJhbGciOiJIUzI1Ni...",
  "token_type": "bearer"
}
400 Bad Request: application/json - Credenciais inválidas.
422 Unprocessable Entity: application/json - Erro de validação.
Endpoint (Opcional, para refresh de token): POST /api/v1/auth/refresh_token

Resumo: Gera um novo token de acesso usando um refresh token (se implementado).
Importante: Todas as rotas que exigem autenticação devem ser protegidas no FastAPI usando Depends(get_current_user: User) onde get_current_user verifica o JWT.
2. Modelos Pydantic (DTOs) para React Native
A seguir, sugestões de Pydantic Models (Schemas de resposta) para garantir que o cliente React Native receba dados otimizados. Os modelos Body_..._post existentes são para entrada, então focaremos nos modelos de saída.

from pydantic import BaseModel, EmailStr
from typing import List, Optional
import datetime

# --- Produtos ---
class ProdutoBaseDTO(BaseModel):
    id: int
    nome_produto: str
    preco: float
    cor: str
    categoria: str
    imagem_principal_url: str # Usar apenas uma imagem principal para listagens
    status: bool

class ProdutoDetalheDTO(ProdutoBaseDTO):
    descricao: str
    quantidade_estoque: int
    imagem1_url: Optional[str] = None
    imagem2_url: Optional[str] = None
    imagem3_url: Optional[str] = None
    imagem4_url: Optional[str] = None
    loja_id: Optional[str] = None # Dependendo se é relevante para o cliente mobile

# --- Usuários ---
class EnderecoDTO(BaseModel):
    id: Optional[int] = None # Opcional se for um endereço novo ou apenas visualização
    rua: str
    numero: str
    complemento: Optional[str] = None
    bairro: str
    cidade: str
    estado: str
    cep: str

class UsuarioPerfilDTO(BaseModel):
    id: int
    nome_cliente: str
    email: EmailStr
    data_nascimento: datetime.date # Assumindo que a data é tratada como um objeto date
    telefone: str
    # Não inclua a senha!
    endereco: Optional[EnderecoDTO] = None # Se o usuário tem um endereço associado

# --- Pedidos ---
class ItemPedidoDTO(BaseModel):
    id: int
    id_produto: int
    nome_produto: str # Conveniência para o cliente mobile
    tamanho: str
    quantidade: int
    preco_unitario: float
    subtotal: float
    imagem_produto_url: Optional[str] = None # Para mostrar no histórico

class PedidoListDTO(BaseModel):
    id: int
    valor_total: float
    status_pedido: str # Ex: 'Pendente', 'Confirmado', 'Enviado', 'Cancelado'
    data_pedido: datetime.datetime # Data de criação do pedido

class PedidoDetalheDTO(PedidoListDTO):
    itens_pedido: List[ItemPedidoDTO]
    endereco_entrega: Optional[EnderecoDTO] = None # Endereço específico para este pedido
    # Outros campos relevantes como método de pagamento, etc.

# --- Resposta de Erro Padronizada (já existe HTTPValidationError, mas podemos simplificar) ---
class ErrorResponseDTO(BaseModel):
    message: str
    details: Optional[List[str]] = None
    code: Optional[int] = None # Código de erro interno, se houver

# --- Token JWT ---
class TokenDTO(BaseModel):
    access_token: str
    token_type: str = "bearer"
Aplicação no FastAPI: Para as rotas que atualmente retornam HTML, você as modificaria para retornar JSON usando esses DTOs. Exemplo para listar produtos:

from fastapi import APIRouter, Depends
from typing import List
# Suponha que ProdutoDB seja seu modelo de banco de dados
from app.database import get_db, Produto as ProdutoDB
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/v1")

@router.get("/produtos/", response_model=List[ProdutoBaseDTO], summary="Listar todos os produtos (JSON)")
async def listar_todos_produtos_json(db: Session = Depends(get_db)):
    produtos = db.query(ProdutoDB).filter(ProdutoDB.status == True).all()
    return produtos # FastAPI converterá ProdutoDB para ProdutoBaseDTO

@router.get("/produtos/{id_produto}", response_model=ProdutoDetalheDTO, summary="Detalhar produto (JSON)")
async def detalhe_produto_json(id_produto: int, db: Session = Depends(get_db)):
    produto = db.query(ProdutoDB).filter(ProdutoDB.id == id_produto, ProdutoDB.status == True).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

# Rota de busca
@router.get("/produtos/search", response_model=List[ProdutoBaseDTO], summary="Buscar produtos (JSON)")
async def search_produtos_json(
    q: Optional[str] = Query(None, description="Termo de busca (nome, descrição)"),
    category: Optional[str] = Query(None, description="Filtra por categoria"),
    min_price: Optional[float] = Query(None, gt=0, description="Preço mínimo"),
    max_price: Optional[float] = Query(None, gt=0, description="Preço máximo"),
    color: Optional[str] = Query(None, description="Filtra por cor"),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(ProdutoDB).filter(ProdutoDB.status == True)
    if q:
        query = query.filter(ProdutoDB.nome_produto.ilike(f"%{q}%") | ProdutoDB.descricao.ilike(f"%{q}%"))
    if category:
        query = query.filter(ProdutoDB.categoria.ilike(f"%{category}%"))
    if min_price:
        query = query.filter(ProdutoDB.preco >= min_price)
    if max_price:
        query = query.filter(ProdutoDB.preco <= max_price)
    if color:
        query = query.filter(ProdutoDB.cor.ilike(f"%{color}%"))

    produtos = query.offset(skip).limit(limit).all()
    return produtos
3. Exemplos de Service React Native
Vamos usar axios para as requisições, que é uma biblioteca popular e robusta para React Native.

src/services/api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para armazenar o token

const API_BASE_URL = 'http://localhost:8000/api/v1'; // Ajuste para o IP/domínio do seu backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT a todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros genéricos (opcional, pode ser feito no componente)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Exemplo: Se 401 Unauthorized, tentar fazer refresh ou deslogar
    if (error.response && error.response.status === 401) {
      console.log('Token expirado ou inválido. Redirecionando para login.');
      // Aqui você poderia tentar um refresh token se tivesse um,
      // ou limpar o token e redirecionar para a tela de login.
      await AsyncStorage.removeItem('userToken');
      // Redirecionar para tela de login (depende da sua navegação, ex: navigate('Login'))
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    // Usamos 'multipart/form-data' ou 'application/x-www-form-urlencoded' para OAuth2PasswordRequestForm no FastAPI
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/auth/token', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token } = response.data;
    await AsyncStorage.setItem('userToken', access_token);
    return response.data;
  },
  logout: async () => {
    await AsyncStorage.removeItem('userToken');
    // Você pode chamar um endpoint de logout no backend se precisar invalidar sessões lá.
  },
  register: async (userData) => {
    const response = await api.post('/usuario/registrar', userData); // Modificar para POST /api/v1/auth/register se for JSON
    return response.data;
  },
};

export const productService = {
  getProducts: async (skip = 0, limit = 10) => {
    const response = await api.get(`/produtos/?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  getProductDetail: async (id) => {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  },
  searchProducts: async (query, category, minPrice, maxPrice, color, skip = 0, limit = 10) => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    if (minPrice) params.append('min_price', minPrice);
    if (maxPrice) params.append('max_price', maxPrice);
    if (color) params.append('color', color);
    params.append('skip', skip);
    params.append('limit', limit);

    const response = await api.get(`/produtos/search?${params.toString()}`);
    return response.data;
  },
  // Outras funções CRUD para admin (criar, atualizar, deletar produto)
  createProduct: async (productData, images) => {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    // Supondo que images é um array de objetos { uri, name, type }
    images.forEach((image, index) => {
      formData.append(`imagem${index + 1}_url`, {
        uri: image.uri,
        name: image.name || `image${index + 1}.jpg`,
        type: image.type || 'image/jpeg',
      });
    });

    const response = await api.post('/usuario/admin/produto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  updateProduct: async (id, productData, images) => {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    images.forEach((image, index) => {
        formData.append(`imagem${index + 1}_url`, {
            uri: image.uri,
            name: image.name || `image${index + 1}.jpg`,
            type: image.type || 'image/jpeg',
        });
    });

    const response = await api.post(`/usuario/admin/produto/atualizar/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export const userService = {
  getUserProfile: async () => {
    const response = await api.get('/painel_usuario/meus_dados'); // Assumindo que esta rota agora retorna JSON
    return response.data;
  },
  updateUserProfile: async (userData) => {
    const response = await api.post('/painel_usuario/editar_usuario', userData); // Modificar para JSON
    return response.data;
  },
  updateUserAddress: async (addressData) => {
    const response = await api.post('/painel_usuario/editar_endereco', addressData); // Modificar para JSON
    return response.data;
  }
};

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/pedido/salvar', orderData);
    return response.data;
  },
  getOrders: async () => {
    const response = await api.get('/pedido/meus'); // Assumindo que esta rota agora retorna JSON
    return response.data;
  },
  getOrderDetail: async (id) => {
    const response = await api.get(`/pedido/${id}`); // Assumindo que esta rota agora retorna JSON
    return response.data;
  },
  cancelOrder: async (orderId) => {
    const formData = new URLSearchParams();
    formData.append('id_pedido', orderId);
    const response = await api.post('/painel_usuario/meus-pedidos/cancelar_pedido', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },
};

// Exemplo de uso em um componente React Native
/*
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import { authService, productService } from '../services/api';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar produtos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await authService.login('seu@email.com', 'suasenha');
      Alert.alert('Sucesso', 'Login realizado!');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Erro ao fazer login.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      <Text>Bem-vindo à Loja!</Text>
      <Button title="Fazer Login" onPress={handleLogin} />
      {products.map(product => (
        <Text key={product.id}>{product.nome_produto} - R${product.preco}</Text>
      ))}
    </View>
  );
}
*/
4. Tratamento de Erros no React Native
O FastAPI retorna erros HTTP padronizados (como 404 Not Found, 422 Unprocessable Entity, 401 Unauthorized, etc.) com um corpo JSON que geralmente contém um campo detail. Podemos usar isso no React Native para exibir mensagens amigáveis.

// Dentro de uma função assíncrona que faz uma chamada à API
import { Alert } from 'react-native';

const handleApiCall = async () => {
  try {
    // ... sua chamada à API, ex: await authService.login(...)
    Alert.alert('Sucesso', 'Operação realizada com êxito!');
  } catch (error) {
    let errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
    let errorDetails = [];

    if (error.response) {
      // Erro recebido do servidor (HTTP status code fora de 2xx)
      const statusCode = error.response.status;
      const responseData = error.response.data;

      switch (statusCode) {
        case 400: // Bad Request
          errorMessage = responseData.detail || 'Requisição inválida.';
          break;
        case 401: // Unauthorized (Token inválido ou ausente)
          errorMessage = 'Sessão expirada ou credenciais inválidas. Por favor, faça login novamente.';
          // Redirecionar para tela de login e limpar token
          // await AsyncStorage.removeItem('userToken');
          // navigation.navigate('Login');
          break;
        case 403: // Forbidden (Usuário não tem permissão)
          errorMessage = responseData.detail || 'Você não tem permissão para realizar esta ação.';
          break;
        case 404: // Not Found
          errorMessage = responseData.detail || 'Recurso não encontrado.';
          break;
        case 422: // Unprocessable Entity (Erro de validação Pydantic)
          errorMessage = 'Dados inválidos. Verifique os campos informados.';
          if (responseData.detail && Array.isArray(responseData.detail)) {
            errorDetails = responseData.detail.map(err => {
              const loc = err.loc.join(' -> ');
              return `Campo: ${loc}, Erro: ${err.msg}`;
            });
            errorMessage += '\nDetalhes:\n' + errorDetails.join('\n');
          }
          break;
        case 500: // Internal Server Error
          errorMessage = 'Problemas internos no servidor. Estamos trabalhando para resolver!';
          break;
        default:
          errorMessage = responseData.detail || `Erro do servidor: ${statusCode}`;
      }
    } else if (error.request) {
      // A requisição foi feita mas nenhuma resposta foi recebida (ex: rede offline)
      errorMessage = 'Falha na conexão com o servidor. Verifique sua internet.';
    } else {
      // Algo aconteceu na configuração da requisição que disparou um erro
      errorMessage = `Erro: ${error.message}`;
    }

    Alert.alert('Erro', errorMessage);
    console.error('API Error:', error);
  }
};
Dicas para o tratamento de erros:

Centralize a lógica: Crie uma função utilitária handleApiError(error) que encapsule a lógica acima para reutilização.
UI/UX: Use componentes de feedback como Toast (ex: react-native-toast-message) ou Snackbar para erros menos críticos, e Alert para erros que exigem uma ação ou são mais graves.
Login/Logout: Para 401, certifique-se de deslogar o usuário no app (limpar AsyncStorage e redirecionar para a tela de login).
5. Dica de Performance: Paginação (Query Parameters)
As rotas que retornam listas de dados, como /api/v1/produtos/ e /api/v1/pedidos/meus, podem facilmente se tornar gargalos de performance se o volume de dados for grande. A paginação é crucial.

Como implementar:

FastAPI (Backend): Adicione parâmetros de query skip e limit aos seus endpoints GET que retornam listas.

from fastapi import Query

@router.get("/produtos/", response_model=List[ProdutoBaseDTO], summary="Listar produtos paginados")
async def listar_produtos_paginados(
    skip: int = Query(0, ge=0, description="Número de itens a pular (offset)"),
    limit: int = Query(10, ge=1, le=100, description="Número máximo de itens a retornar (tamanho da página)"),
    db: Session = Depends(get_db)
):
    produtos = db.query(ProdutoDB).filter(ProdutoDB.status == True).offset(skip).limit(limit).all()
    return produtos
skip: Quantos registros devem ser pulados do início do resultado. (ex: 0 para primeira página, 10 para segunda página se limit for 10).
limit: O número máximo de registros a serem retornados em uma única resposta.
ge=0, ge=1, le=100: Validações de Pydantic/FastAPI para garantir que os valores são razoáveis.
React Native (Frontend): Gerencie o estado skip e limit (ou page e pageSize) em seus componentes e passe-os para o serviço da API.

// No seu componente React Native
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { productService } from '../services/api'; // Ajuste o caminho

function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // Representa 'skip'
  const [hasMore, setHasMore] = useState(true); // Indica se há mais páginas para carregar
  const limit = 10; // Itens por página

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return; // Evita múltiplas chamadas ou chamadas desnecessárias

    setLoading(true);
    try {
      const data = await productService.getProducts(page * limit, limit);
      if (data.length === 0) {
        setHasMore(false); // Não há mais produtos
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos paginados:', error);
      // Tratar o erro (exibir mensagem ao usuário)
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchProducts();
  }, []); // Chamar apenas na montagem inicial

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.nome_produto}</Text>}
      onEndReached={fetchProducts} // Chama fetchProducts quando o usuário rola até o final
      onEndReachedThreshold={0.5} // Define a que distância do final a função deve ser chamada (0.5 = metade do caminho)
      ListFooterComponent={renderFooter}
    />
  );
}
Benefícios da Paginação:

Redução da carga no servidor: O servidor processa e retorna menos dados por requisição.
Melhora no tempo de resposta: Menos dados para serializar, transferir e deserializar.
Melhora na experiência do usuário: O aplicativo carrega os dados progressivamente ("scroll infinito"), em vez de travar enquanto tenta carregar tudo de uma vez.
Menor consumo de memória: Tanto no servidor quanto no cliente.
Com essas análises e sugestões, você terá uma base sólida para evoluir sua API FastAPI e construir um aplicativo React Native performático e robusto para sua Loja de Vestidos. Lembre-se que a chave é a consistência no retorno de JSON e a segurança na autenticação.