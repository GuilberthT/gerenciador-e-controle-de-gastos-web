import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: 'https://gerenciador-e-controle-de-gasto-git-7e5dbf-guilberthts-projects.vercel.app/',
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('token')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default instance
