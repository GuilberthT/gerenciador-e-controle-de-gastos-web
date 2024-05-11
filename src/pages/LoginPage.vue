<template>
  <div class="container login-container">
    <h2>Formulário de Login</h2>
    <form @submit.prevent="login">
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

<script>
import AuthService from '@/services/AuthService.js'; 

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const token = await AuthService.login(this.email, this.password);
        localStorage.setItem('user_token', token);
        this.$router.push('/profile');
      } catch (error) {
        this.errorMessage = error.response.data.msg || 'Erro ao fazer login.';
      }
    },
  },
};
</script>

<style scoped>

</style>
