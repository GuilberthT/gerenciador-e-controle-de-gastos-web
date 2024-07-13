<script setup>
import { useMutation, useQuery } from '@tanstack/vue-query'
import { Notify } from 'quasar'
import ExpenseIncomeDialog from '@/components/ExpenseIncomeDialog.vue'
import { getExpensesTypes } from '@/api/expensesTypes'
import { createExpense } from '@/api/expenses'

const expenseModal = defineModel({ type: Boolean })

const { data } = useQuery({
  queryKey: ['expense-types'],
  queryFn: getExpensesTypes,
})

const { mutate } = useMutation({
  mutationFn: data => createExpense(data),
  onSuccess: () => {
    expenseModal.value = false

    Notify.create({
      message: 'Despensa registrada com sucesso!',
      color: 'positive',
      textColor: 'white',
    })
  },
})
</script>

<template>
  <ExpenseIncomeDialog v-model="expenseModal" type="expense" title="Despesa" :select-data="data" @handle-create="mutate($event)" />
</template>
