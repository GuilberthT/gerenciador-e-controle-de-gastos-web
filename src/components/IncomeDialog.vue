<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Notify } from 'quasar'
import { ref } from 'vue'
import ExpenseIncomeDialog from '@/components/ExpenseIncomeDialog.vue'
import { getIncomeTypes } from '@/api/incomeTypes'
import type { CreateIncomePayload } from '@/api/income'
import { createIncome } from '@/api/income'

interface IncomeType {
  id: number
  name: string
}

const expenseModal = ref<boolean>(false)

const queryClient = useQueryClient()

const { data } = useQuery<IncomeType[], Error>({
  queryKey: ['income-types'],
  queryFn: getIncomeTypes,
})

const { mutate } = useMutation({
  mutationFn: (data: CreateIncomePayload) => createIncome(data),
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
