import Cookies from 'js-cookie'
import axios from './axiosInstance.js'

export async function login(data) {
  const response = await axios.post('/user/login', data)

  return response.data.token
}

export async function logout() {
  Cookies.remove('token')

  localStorage.removeItem('token')
}
