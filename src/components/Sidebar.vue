<script setup>
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
</style>