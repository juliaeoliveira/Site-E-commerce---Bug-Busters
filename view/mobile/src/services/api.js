import axios from "axios";
import { AsyncStorage } from "react-native";


// Ajuste para o IP/domínio do backend
const API_BASE_URL = "http://10.0.2.2:8000"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }, 
});

export const productService = {
  getProducts: async (skip = 0, limit = 10) => {
    const response = await api.get(`/products/?skip=${skip}&limit=${limit}`);
    return response.data;
  },
  searchProducts: async (query, category, minPrice, maxPrice, color, skip = 0, limit = 10) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (category) params.append('category', category);
    if (minPrice !== null && minPrice !== undefined) params.append('min_price', minPrice);
    if (maxPrice !== null && maxPrice !== undefined) params.append('max_price', maxPrice);
    if (color) params.append('color', color);
    params.append('skip', skip);
    params.append('limit', limit);

    const response = await api.get(`/products/search?${params.toString()}`);
    return response.data;
  },
}