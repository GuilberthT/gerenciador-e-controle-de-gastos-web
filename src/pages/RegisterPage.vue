<template>
  <div class="container register-container">
    <h2>Formulário de Registro</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <label for="confirmPassword">Confirmar Senha:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit">Registrar</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'; 

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    };
  },
  methods: {
    async register() {
      try {
        if (this.password !== this.confirmPassword) {
          throw new Error('As senhas não conferem.');
        }
        await AuthService.register(this.name, this.email, this.password);
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response.data.msg || 'Erro ao registrar usuário.';
      }
    },
  },
};
</script>

<style scoped>

</style>
