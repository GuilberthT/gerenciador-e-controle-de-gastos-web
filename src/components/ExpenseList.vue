<template>
    <div class="container">
      <h2>Lista de Despesas</h2>
      <ul>
        <li v-for="expense in expenses" :key="expense._id">
          {{ expense.description }} - R$ {{ expense.amount }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import ExpenseService from '@/api/ExpenseService.js';
  
  export default {
    setup() {
      const expenses = ref([]);
  
      onMounted(async () => {
        expenses.value = await ExpenseService.getExpenses();
      });
  
      return {
        expenses
      };
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  