<script setup>
import { ref, computed } from 'vue';

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
  <<main>
  <!-- Inputs para adicionar receita e despesa -->
  <div>
    <label for="inputReceita">Receita:</label>
    <input type="number" id="inputReceita" v-model="receitas">
  </div>
  <div>
    <label for="inputDespesa">Despesa:</label>
    <input type="number" id="inputDespesa" v-model="despesas">
  </div>

  <!-- Exibindo o total de receitas, total de despesas e saldo -->
  <div>
    <h2>Total de Receitas: {{ totalReceitas }}</h2>
    <h2>Total de Despesas: {{ totalDespesas }}</h2>
    <h2>Balanço: {{ saldo }}</h2>
  </div>
</main>

</template>''
