<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Notify } from 'quasar'
import ExpenseIncomeDialog from '@/components/ExpenseIncomeDialog.vue'
import { getIncomeTypes } from '@/api/incomeTypes'
import type { IncomeType } from '@/api/incomeTypes'
import { createIncome } from '@/api/income'
import type { CreateIncomePayload } from '@/api/income'

const incomeModal = defineModel<boolean>()

const queryClient = useQueryClient()

const { data } = useQuery<IncomeType[], Error>({
  queryKey: ['income-types'],
  queryFn: getIncomeTypes,
})

const { mutate } = useMutation({
  mutationFn: (income: CreateIncomePayload) => createIncome(income),
  onSuccess: () => {
    incomeModal.value = false

    queryClient.invalidateQueries({ queryKey: ['incomes-table'] })
    queryClient.invalidateQueries({ queryKey: ['get-total-incomes'] })

    Notify.create({
      message: 'Receita registrada com sucesso!',
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
    v-model="incomeModal"
    type="income"
    title="Receita"
    :select-data="data ?? []"
    @handle-create="mutate($event)"
  />
</template>
