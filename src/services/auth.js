import { api } from './api'

export async function login(email, password) {
  const response = await api.post('/auth', { email, password }, { withCredentials: true }); 
  return response.data;
}

export async function verifyToken() {
  const response = await api.get('/verifytoken', { withCredentials: true }); 
  return response.data;
}