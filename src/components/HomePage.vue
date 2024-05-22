<script setup>
import { ref, onMounted } from 'vue';
import { getExpenses } from '@/api/expenses.js';
import { useRouter } from 'vue-router';

const expenses = ref([]);
const router = useRouter();

async function loadExpenses() {
    try {
        expenses.value = await getExpenses();
    } catch (error) {
        router.push('/login');
    }
}

onMounted(loadExpenses);
</script>
<template>
    <div v-for="data in expenses" :key="data._id">
        {{ data.value }}
    </div>
</template>