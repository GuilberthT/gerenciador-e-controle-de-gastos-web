<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function irPara(pagina) {
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
      <QBtn flat label="gastos" class="text-white" @click="irPara('Expenses')" />
      <QBtn flat label="relatórios" class="text-white" @click="irPara('relatorios')" />
      <QBtn flat label="Rendas" class="text-white" @click="irPara('Incomes')" />
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

<!-- <script setup>
const drawer = ref(false)
</script>

<template>
    <div>
      <QHeader>
        <QToolbar>
          <QBtn flat @click="drawer = !drawer" round dense :icon="drawer ? 'chevron_left' : 'chevron_right'" />
          <QToolbarTitle class="text-center">Controle De Gastos</QToolbarTitle>
        </QToolbar>
      </QHeader>
      <QDrawer  v-model="drawer" show-if-above :width="200" :breakpoint="500">
        <QScrollArea class="fit">
          <QList padding class="menu-list">
            <QItem clickable v-ripple>
              <QItemSection avatar>
                  <QIcon name="inbox" />
              </QItemSection>

              <QItemSection>
                <RouterLink to="/expenses">Gastos</RouterLink>

              </QItemSection>
            </QItem>
          </QList>
        </QScrollArea>
      </QDrawer>
    </div>
</template>

<style scoped>
.q-header {
  background-color: red;
}

a {
  text-decoration: none;
  color: black;
}
</style> -->
