<script setup>
import { login } from '@/api/AuthService';
import { ref } from 'vue';

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleLogin(){
  try {
    const dataLogin = {
      email: email.value,
      password: password.value
    }

    const token = await login(dataLogin)
  
    localStorage.setItem('token', token)
  } catch (error) {
    errorMessage.value = error.response.data.msg
  }
}
</script>

<template>
  <div class="container login-container">
    <h2>Formulário de Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>