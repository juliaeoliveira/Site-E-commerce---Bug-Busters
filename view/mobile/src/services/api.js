const BASE_URL = "https://10.0.2.2:3000"

export async function getProducts() {
    const response = await fetch(`${BASE_URL}/products`)
    const data = await response.json();
    return data;
}