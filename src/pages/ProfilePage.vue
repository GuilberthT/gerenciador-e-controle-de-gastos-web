<template>
    <div class="container profile-container">
      <h2>Perfil do Usuário</h2>
      <p>Nome: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <button @click="logout">Sair</button>
    </div>
  </template>
  
  <script>
  import AuthService from '@/services/AuthService.js'; 
  export default {
    data() {
      return {
        user: {},
      };
    },
    async created() {
      await this.loadUser();
    },
    methods: {
      async loadUser() {
        try {
          this.user = await AuthService.getUser();
        } catch (error) {
          console.error('Erro ao carregar informações do usuário:', error);
          this.logout();
        }
      },
      logout() {
        AuthService.logout();
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
 
  </style>
  