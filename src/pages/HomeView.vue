<script setup>
import Balance from '@/components/Balance.vue';
import CustomInput from '@/components/CustomInput.vue';
import { computed, ref } from 'vue';

// Definindo a reatividade para receitas e despesas
const receitas = ref(0);
const despesas = ref(0);

// Calculando o total de receitas e despesas
const totalReceitas = computed(() => receitas.value);
const totalDespesas = computed(() => despesas.value);

// Calculando o saldo
const saldo = computed(() => receitas.value - despesas.value);
</script>

<template>
  <main>
    <!-- Inputs para adicionar receita e despesa -->
    <CustomInput label="Receita" v-model="receitas" />
    <CustomInput label="Despesa" v-model="despesas" />

    <!-- Exibindo o total de receitas, total de despesas e saldo -->
    <Balance :totalDespesas="totalDespesas" :totalReceitas="totalReceitas" :saldo="saldo" />
  </main>
</template>
