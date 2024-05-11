<script setup>
import { getExpenses } from '@/api/expenses.js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const expenses = ref()
const router = useRouter()

onMounted(async () => {
    try {
        expenses.value = await getExpenses()
    } catch (error) {
        router.push('/login')
    }
})

</script>
<template>
    <div v-for="data in expenses" :key="data._id">
        {{ data.value }}
    </div>
</template>