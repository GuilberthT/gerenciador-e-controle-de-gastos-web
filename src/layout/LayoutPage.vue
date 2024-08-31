<script setup lang="ts">
import { useRoute } from 'vue-router'
import Sidebar from '@/components/SidebarPage.vue'

const route = useRoute()
</script>

<template>
  <QLayout view="lhh LpR lff">
    <Sidebar v-if="route.path !== '/login' && route.path !== '/register'" />
    <QPageContainer>
      <QPage>
        <slot />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>
