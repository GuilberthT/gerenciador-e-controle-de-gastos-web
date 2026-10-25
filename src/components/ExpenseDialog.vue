<script setup lang="ts">
import { computed } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Notify } from 'quasar'
import ExpenseIncomeDialog from '@/components/ExpenseIncomeDialog.vue'
import { getExpensesTypes } from '@/api/expensesTypes'
import { createExpense, updateExpense } from '@/api/expenses'
import type { CreateExpensePayload, Expense } from '@/api/expenses'
import { formatDate } from '@/utils/format'

// Se receber uma despesa, o modal abre em modo de edição
const props = defineProps<{
  expense?: Expense | null
}>()

const expenseModal = defineModel<boolean>()

const queryClient = useQueryClient()

const { data } = useQuery({
  queryKey: ['expense-types'],
  queryFn: getExpensesTypes,
})

const initialData = computed(() => {
  if (!props.expense) {
    return null
  }

  return {
    description: props.expense.description,
    value: props.expense.value,
    typeId: props.expense.expenseType?._id ?? null,
    date: formatDate(props.expense.date),
  }
})

const { mutate } = useMutation({
  mutationFn: (payload: CreateExpensePayload) => props.expense
    ? updateExpense(props.expense._id, payload)
    : createExpense(payload),
  onSuccess: () => {
    const message = props.expense ? 'Despesa atualizada com sucesso!' : 'Despesa registrada com sucesso!'

    expenseModal.value = false

    queryClient.invalidateQueries({ queryKey: ['expenses-table'] })
    queryClient.invalidateQueries({ queryKey: ['get-total-expenses'] })

    Notify.create({
      message,
      color: 'positive',
      textColor: 'white',
    })
  },
  onError: (error) => {
    Notify.create({
      message: `Erro: ${error}`,
      color: 'negative',
      textColor: 'white',
    })
  },
})
</script>

<template>
  <ExpenseIncomeDialog
    v-model="expenseModal"
    type="expense"
    title="Despesa"
    :select-data="data ?? []"
    :initial-data="initialData"
    @handle-create="mutate($event)"
  />
</template>
