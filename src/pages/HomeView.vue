<script setup>
import { computed, ref } from 'vue';

// reatividade
const numero1 = ref(0)
const numero2 = ref(0)

const soma = computed(() => Number(numero1.value) + Number(numero2.value))

</script>

<template>
  <main>
    <!-- diretive -->
    <!-- two way databind -->
    <input type="text" v-model="numero1">
    <input type="text" v-model="numero2">

    <!-- Double mustache -->
    <h1 v-show="soma != 0">Soma: {{ soma }}</h1>
  </main>
</template>
