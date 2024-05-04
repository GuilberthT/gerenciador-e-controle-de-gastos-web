<script setup>
import { getExpenses } from '@/api/expenses/expenses.js';
import { onMounted, ref } from 'vue';

const expenses = ref()

onMounted(async () => {
    expenses.value = await getExpenses()
})

</script>
<template>
    <div v-for="data in expenses" :key="data._id">
        {{ data.value }}
    </div>
</template>