// src/services/api.ts
import { getToken } from '@/app/utils/secureStore';


const BASE_URL = 'http://localhost:5000/api';

export const api = async (endpoint: string, method: string = 'GET', data: any = null, token: string | null = null) => {

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const config: RequestInit = {
    method,
    headers,
  };
  if (data) {
    config.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const text = await response.text(); // ← tenta capturar como texto
    console.log('Resposta bruta da API:', text);

    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch (err) {
      console.error('Erro ao fazer parse do JSON:', err);
      throw new Error('Resposta inválida do servidor');
    }

    if (!response.ok) {
      throw new Error(responseData.message || 'algo de errado aconteceu');
    }
    console.log('API Response (parseado):', responseData);
    return responseData;
  } catch (error) {
    throw error;
  }
};

// Auth services
export const authService = {
  register: (userData: { nome: string; email: string; senha: string }) =>
    api('/users/register', 'POST', userData),
  login: (credentials: { email: string; senha: string }) =>
    api('/users/login', 'POST', credentials),
};

// Product services
export const productService = {
  getProducts: () => api('/products'),
  createProduct: (productData: any, token: string) =>
    api('/products', 'POST', productData, token),
};

// Cart services
export const cartService = {
  getCart: (userId: string, token: string) =>
    api(`/cart/${userId}`, 'GET', null, token),
  addToCart: (cartData: { usuario: string; produto: string; quantidade: number }, token: string) =>
    api('/cart', 'POST', cartData, token),
  removeFromCart: (userId: string, productId: string, token: string) =>
    api(`/cart/${userId}/${productId}`, 'DELETE', null, token),
};

// Order services
export const orderService = {
  createOrder: (orderData: { usuario: string }, token: string) =>
    api('/orders', 'POST', orderData, token),
  getOrders: (token: string) =>
    api('/orders', 'GET', null, token),
};

// user services
export const userService = {
  getCurrentUser: async () => {
    const token = await getToken();
    if (!token) throw new Error('No token found');

    const response = await api('/users/me', 'GET', null, token); // Pass token here
    return response.user;
  },
  updateUser: async (userData: Record<string, any>) => {
    const token = await getToken();
    if (!token) throw new Error('No token found');
  
    const currentUserResponse = await api('/users/me', 'GET', null, token);
    const userId = currentUserResponse.user._id;
  
    const response = await api(`/users/${userId}`, 'POST', userData, token);
    return response.user;
  },
  
};
