// src/services/api.ts
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
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Something went wrong');
    }
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