<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function irPara(pagina: string) {
  router.push({ name: pagina })
}

function irParaConfiguracoes() {
  router.push({ name: 'configuracoes' })
}

function irParaNotificacoes() {
  router.push({ name: 'notificacoes' })
}

function irParaPerfil() {
  router.push({ name: 'perfil' })
}
</script>

<template>
  <QHeader elevated>
    <QToolbar class="bg-green-7">
      <QToolbarTitle>
        <!-- <img src="path/to/logo.png" height="35" /> -->
        <span>Controle de Gastos</span>
      </QToolbarTitle>
      <QBtn flat label="visão geral" class="text-white" @click="irPara('Home')" />
      <QBtn flat label="despesas" class="text-white" @click="irPara('Expenses')" />
      <QBtn flat label="receitas" class="text-white" @click="irPara('Incomes')" />
      <QBtn flat label="comparativo" class="text-white" @click="irPara('comparativo')" />
      <QSpace />
      <QBtn flat round icon="settings" class="text-white" @click="irParaConfiguracoes" />
      <QBtn flat round icon="notifications" class="text-white" @click="irParaNotificacoes" />
      <QBtn flat round icon="account_circle" class="text-white" @click="irParaPerfil" />
    </QToolbar>
  </QHeader>
</template>

<style scoped>
.bg-green-7 {
  background-color: #00C853;
}
.text-white {
  color: white;
}
</style>
