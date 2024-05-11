import axios from 'axios';

const token = localStorage.getItem('token')

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_LOCAL,
    headers: {
        Authorization: `Bearer ${token || ''}`
    }
});

export default instance