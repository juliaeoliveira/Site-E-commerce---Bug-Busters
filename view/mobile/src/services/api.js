import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.0.2.2:8000"

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