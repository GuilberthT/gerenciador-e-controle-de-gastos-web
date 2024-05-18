<script setup>
import { login } from '@/api/AuthService';
import { Notify, QBtn, QForm, QInput } from 'quasar';
import { ref } from 'vue';

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleLogin() {
  try {
    const dataLogin = {
      email: email.value,
      password: password.value
    }

    const token = await login(dataLogin)
    
    Notify.create({
      message: `${email.value} Logado com sucesso!`,
      color: "positive",
      textColor: "white"
    })

    localStorage.setItem('token', token)
  } catch (error) {
    Notify.create({
      message: error.response.data.msg,
      color: "negative",
      textColor: "white"
    })
  }
}
</script>

<template>
  <div class="container login-container">
    <h2>Formulário de Login</h2>
    <QForm @submit="handleLogin">
      <div class="inputForm">
        <QInput dense outlined type="email" id="email" label="email" v-model="email" />
        <QInput dense outlined type="password" id="password" label="Senha" v-model="password" />
      </div>
      <QBtn type="submit" color="primary" label="Entrar" />
    </QForm>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<style>
.inputForm {
  width: 20vw;
}
</style>