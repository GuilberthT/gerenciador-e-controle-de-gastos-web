<template>
    <div class="container">
      <h2>Lista de Receitas</h2>
      <ul>
        <li v-for="income in incomes" :key="income._id">
          {{ income.description }} - R$ {{ income.amount }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import IncomeService from '@/services/IncomeService.js';
  
  export default {
    setup() {
      const incomes = ref([]);
  
      onMounted(async () => {
        incomes.value = await IncomeService.getIncomes();
      });
  
      return {
        incomes
      };
    }
  };
  </script>
  
  <style scoped>

  </style>
  