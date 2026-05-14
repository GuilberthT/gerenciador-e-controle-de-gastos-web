<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function irPara(pagina: string) {
  router.push({ name: pagina })
}
</script>

<template>
  <QHeader elevated>
    <QToolbar class="bg-green-7">
      <QToolbarTitle>
        <span>Controle de Gastos</span>
      </QToolbarTitle>
      <QBtn flat label="visão geral" class="text-white" @click="irPara('Home')" />
      <QBtn flat label="despesas" class="text-white" @click="irPara('Expenses')" />
      <QBtn flat label="receitas" class="text-white" @click="irPara('Incomes')" />
      <QBtn flat label="comparativo" class="text-white" disable />
      <QSpace />
      <QBtn flat round icon="settings" class="text-white" disable />
      <QBtn flat round icon="notifications" class="text-white" disable />
      <QBtn flat round icon="account_circle" class="text-white" disable />
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
