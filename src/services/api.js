import axios from 'axios'

export const api = axios.create({
  baseURL: "https://weblibrary-api.up.railway.app",
  withCredentials: true
})