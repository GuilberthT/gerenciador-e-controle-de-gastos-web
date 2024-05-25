import axios from './axiosInstance.js'

export async function login(data) {
  const response = await axios.post('/user/login', data)
  return response.data.token
}

export async function getUser() {
  const token = localStorage.getItem('token')
  if (!token)
    throw new Error('Token não encontrado.')

  const response = await axios.get('/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.user
}

export async function logout() {
  localStorage.removeItem('token')
}

// import axios from './axiosInstance.js';

// export async function login(data){
//   const response = await axios.post('/user/login', data);

//   return response.data.token;
// }

// export async function getUser(){
//   const token = localStorage.getItem('token');
//   if (!token) {
//     throw new Error('Token não encontrado.');
//   }
//   const response = await axios.get('/user/me', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data.user;
// }

// export async function logout(){
//   localStorage.removeItem('token');
// }
