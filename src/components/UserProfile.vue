<script setup>
import { ref, onMounted } from 'vue';
import { getUser, logout } from '@/api/AuthService.js';
import { useRouter } from 'vue-router';

const user = ref({});
const router = useRouter();

async function loadUser() {
  try {
    user.value = await getUser();
  } catch (error) {
    console.error('Erro ao carregar informações do usuário:', error);
    handleLogout();
  }
}

function handleLogout() {
  logout();
  router.push('/login');
}

onMounted(loadUser);
</script>

<template>
  <div class="container profile-container">
    <h2>Perfil do Usuário</h2>
    <p>Nome: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <button @click="logout">Sair</button>
  </div>
</template>

<!-- <template>
  <div class="container profile-container">
    <h2>Perfil do Usuário</h2>
    <p>Nome: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <button @click="logout">Sair</button>
  </div>
</template>

<script>
import AuthService from '@/api/AuthService.js'; 
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
</script> -->
