<script setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Notify } from 'quasar'
import ExpenseIncomeDialog from '@/components/ExpenseIncomeDialog.vue'
import { getIncomeTypes } from '@/api/incomeTypes'
import { createIncome } from '@/api/income'

const expenseModal = defineModel({ type: Boolean })

const queryClient = useQueryClient()

const { data } = useQuery({
  queryKey: ['income-types'],
  queryFn: getIncomeTypes,
})

const { mutate } = useMutation({
  mutationFn: data => createIncome(data),
  onSuccess: () => {
    expenseModal.value = false

    queryClient.invalidateQueries({ queryKey: ['get-total-incomes'] })

    Notify.create({
      message: 'Receita registrada com sucesso!',
      color: 'positive',
      textColor: 'white',
    })
  },
})
</script>

<template>
  <ExpenseIncomeDialog
    v-model="expenseModal" type="income" title="Receita" :select-data="data"
    @handle-create="mutate($event)"
  />
</template>
