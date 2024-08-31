<script setup lang="ts">
import { ref } from 'vue'
import { QDate, QInput, QPopupProxy } from 'quasar'

const dateModel = ref<string>('')

const popupProxy = ref<boolean>(false)
</script>

<template>
  <QInput v-model="dateModel" icon="event" round color="primary" label="Data">
    <QPopupProxy v-model="popupProxy" cover transition-show="scale" transition-hide="scale">
      <QDate v-model="dateModel" mask="DD/MM/YYYY" @update:model-value="popupProxy = !popupProxy" />
    </QPopupProxy>
  </QInput>
</template>
