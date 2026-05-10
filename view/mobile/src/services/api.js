import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.0.2.2:8000"

async function getAuthHeaders() {
    const token = await AsyncStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}

export async function getProducts() {
    const response = await fetch(`${BASE_URL}/products`)
    const data = await response.json();
    return data;
}

export async function getDetailsProduct(id_product) {
    try {
        const response = await fetch(`${BASE_URL}/products/${id_produto}`)
        if (!response.ok) {
            throw new Error('Produto não encontrado!')
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Erro ao buscar detalhes: ", error)
        return null
    }
}

export async function searchProducts(query) {
    const url = query
        ? `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
        : `${BASE_URL}/products`

    const response = await fetch(url)
    const data = await response.json();
    return data;
}

export async function getColecoes() {
    try {
        console.log("Buscando coleções de:", `${BASE_URL}/products/colecoes`);
        const response = await fetch(`${BASE_URL}/products/colecoes`)
        console.log("Status da resposta:", response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error("Erro da API:", errorData);
            throw new Error(`Erro HTTP ${response.status}: ${errorData}`)
        }
        const data = await response.json()
        console.log("Dados recebidos:", data);
        return data.colecoes || data
    } catch (error) {
        console.error("Erro ao buscar coleções:", error)
        return []
    }
}

export async function getProdutosByCategoria(categoria) {
    try {
        const response = await fetch(`${BASE_URL}/products/colecoes`)
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`)
        }
        const data = await response.json()
        const colecoes = data.colecoes || data
        
        // Encontra a coleção pela categoria
        const colecaoEncontrada = colecoes.find(c => c.nome.toLowerCase() === categoria.toLowerCase())
        return colecaoEncontrada ? colecaoEncontrada.produtos : []
    } catch (error) {
        console.error(`Erro ao buscar produtos da categoria ${categoria}:`, error)
        return []
    }
}

// Rota do Carrinho 
// No seu arquivo de API do React Native

export async function getCartData(id_produto = null) {
    try {
        const headers = await getAuthHeaders(); // Usa sua função que pega o token do AsyncStorage
        
        let url = `${BASE_URL}/api/carrinho`;
        if (id_produto) {
            url += `?id_produto=${id_produto}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: headers
        });

        const data = await response.json();

        if (!response.ok) {
            // Se o backend retornar 401, você pode tratar o logout aqui
            throw new Error(data.detail || "Erro ao carregar dados do carrinho");
        }

        return data; // Retorna { usuario: {...}, sugestoes: [...] }
    } catch (error) {
        console.error("Erro getCartData:", error);
        throw error;
    }
}

export async function CreateUser(userData) {
    const response = await fetch(`${BASE_URL}/usuario/create_user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
    }

    return await response.json();
}

export async function criarEndereco(dados) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/usuario/criar_endereco_mobile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dados)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
}

export async function Login(email, senha) {
    const response = await fetch(`${BASE_URL}/usuario/login_mobile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            senha
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}

export async function getPerfil() {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/usuario/perfil`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}

export async function getDadosConta() {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/painel_usuario/dados_conta`, {
        method: "GET",
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}

export async function getEnderecos() {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/painel_usuario/enderecos_cadastrados`, {
        method: "GET",
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}

export async function getPedidos() {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/painel_usuario/seus_pedidos`, {
        method: "GET",
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}

export async function getDetalhePedido(id_pedido) {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/painel_usuario/seus_pedidos/${id_pedido}`, {
        method: "GET",
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail);
    }

    return data;
}

export async function getComprarNovamente() {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${BASE_URL}/painel_usuario/comprar_novamente_mobile`,
            {
                method: "GET",
                headers
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Erro ao buscar produtos comprados anteriormente");
        }

        return data;

    } catch (error) {
        console.error("Erro getComprarNovamente:", error);
        return [];
    }
}

export async function editarUsuario(dados) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/painel_usuario/editar_usuario_mobile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dados)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
}

export async function editarEndereco(dados) {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${BASE_URL}/painel_usuario/editar_endereco_mobile`, {
      method: "PUT",
      headers,
      body: JSON.stringify(dados)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Erro ao editar endereço");
    }

    return data;

  } catch (error) {
    throw new Error(error.message);
  }
}