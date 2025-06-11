import { api } from './api'

export async function login(email, password) {
  const response = await api.post('/auth', { email, password })
  return response.data
}

export async function verifyToken(token) {
  const response = await api.get('/verifytoken', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}