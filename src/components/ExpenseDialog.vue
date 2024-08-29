<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import { Notify } from 'quasar'
import ExpenseIncomeDialog from '@/components/ExpenseIncomeDialog.vue'
import { getExpensesTypes } from '@/api/expensesTypes'
import { createExpense } from '@/api/expenses'

interface ExpenseType {
  id: number;
  name: string;
}

const expenseModal = defineModel({ type: Boolean })

const { data } = useQuery<ExpenseType[]>({
  queryKey: ['expense-types'],
  queryFn: getExpensesTypes,
})

const { mutate } = useMutation({
  mutationFn: (expense: any) => createExpense(expense),
  onSuccess: () => {
    expenseModal.value = false 

    Notify.create({
      message: 'Despesa registrada com sucesso!',
      color: 'positive',
      textColor: 'white',
    })
  },
})
</script>

<template>
  <ExpenseIncomeDialog v-model="expenseModal" type="expense" title="Despesa" :select-data="data" @handle-create="mutate($event)" />
</template>