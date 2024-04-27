<script setup>

defineProps({
  label: String
})

const emit = defineEmits(['emitValue'])

const model = defineModel()

</script>

<template>
  <div>
    <label for="inputReceita">{{ label }}:</label>
    <input type="number" id="inputReceita" v-model="model">
    <button @click="emit('emitValue', 2)">Emite</button>
  </div>
</template>