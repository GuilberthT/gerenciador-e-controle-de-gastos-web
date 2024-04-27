<script setup>
defineProps({
    totalReceitas: Number,
    totalDespesas: Number,
    saldo: Number
})
</script>

<template>
    <div>
        <h2>Total de Receitas: {{ totalReceitas }}</h2>
        <h2>Total de Despesas: {{ totalDespesas }}</h2>
        <h2>Balanço: {{ saldo }}</h2>
    </div>
</template>