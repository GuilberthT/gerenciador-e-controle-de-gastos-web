import axios from '../api/axiosInstance.js';
; 

const AuthService = {
  async login(email, password) {
    const data = { email, password };
    const response = await axios.post('/user/login', data); 
    return response.data.token;
  },
  async getUser() {
    const token = localStorage.getItem('user_token');
    if (!token) {
      throw new Error('Token não encontrado.');
    }
    const response = await axios.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  },
  logout() {
    localStorage.removeItem('user_token');
  },
};

export default AuthService;
