<script setup>
import Sidebar from '@/components/SidebarPage.vue'

const route = useRoute()
console.log(route)
</script>

<template>
  <QLayout view="lhh LpR lff">
    <Sidebar v-if="route.path !== ('/login' || '/register')" />
    <QPageContainer>
      <QPage>
        <slot />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>
