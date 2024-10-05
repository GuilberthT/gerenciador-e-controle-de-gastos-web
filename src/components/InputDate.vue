<script setup lang="ts">
import { QDate, QInput, QPopupProxy } from 'quasar'
import { ref } from 'vue'

const dateModel = defineModel<string>()

const popupProxy = ref(false)
</script>

<template>
  <div>
    <QInput v-model="dateModel" round label="Data">
      <QPopupProxy v-model="popupProxy" cover transition-show="scale" transition-hide="scale">
        <QDate v-model="dateModel" mask="DD/MM/YYYY" @update:model-value="popupProxy = !popupProxy" />
      </QPopupProxy>
    </QInput>
  </div>
</template>
