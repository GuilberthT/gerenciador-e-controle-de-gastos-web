<template>
    <q-layout>
      <q-header elevated>
        <q-toolbar class="bg-green-7">
          <q-toolbar-title>
            <img src="path/to/logo.png" alt="Controle de Gastos" height="35">
          </q-toolbar-title>
          <q-btn flat label="visão geral" @click="irPara('Home')" class="text-white" />
          <q-btn flat label="gastos" @click="irPara('Expenses')" class="text-white" />
          <q-btn flat label="relatórios" @click="irPara('relatorios')" class="text-white" />
          <q-btn flat label="Rendas" @click="irPara('Incomes')" class="text-white" />
          <q-space />
          <q-btn flat round icon="settings" class="text-white" @click="irParaConfiguracoes" />
          <q-btn flat round icon="notifications" class="text-white" @click="irParaNotificacoes" />
          <q-btn flat round icon="account_circle" class="text-white" @click="irParaPerfil" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  export default {
    name: 'ExpensesPage',
    methods: {
      irPara(pagina) {
        this.$router.push({ name: pagina });
      },
      irParaConfiguracoes() {
        this.$router.push({ name: 'configuracoes' });
      },
      irParaNotificacoes() {
        this.$router.push({ name: 'notificacoes' });
      },
      irParaPerfil() {
        this.$router.push({ name: 'perfil' });
      }
    }
  };
  </script>
  
  <style scoped>
  .bg-green-7 {
    background-color: #00C853;
  }
  .text-white {
    color: white;
  }
  </style>
  