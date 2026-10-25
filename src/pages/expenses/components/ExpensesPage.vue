<script setup lang="ts">
import { computed, ref } from 'vue'
import type { QTableColumn } from 'quasar'
import { useQuery } from '@tanstack/vue-query'
import ExpenseDialog from '@/components/ExpenseDialog.vue'
import { getExpenses } from '@/api/expenses'
import type { Expense } from '@/api/expenses'
import { formatCurrency, formatDate, parseApiDate } from '@/utils/format'

const expenseModal = ref(false)

const columns: QTableColumn<Expense>[] = [
  {
    name: 'date',
    label: 'Data',
    field: 'date',
    align: 'left',
    sortable: true,
    format: (val: string) => formatDate(val),
    sort: (a: string, b: string) => (parseApiDate(a)?.getTime() ?? 0) - (parseApiDate(b)?.getTime() ?? 0),
  },
  { name: 'description', label: 'Descrição', field: 'description', align: 'left', sortable: true },
  {
    name: 'category',
    label: 'Categoria',
    field: row => row.expenseType?.description ?? 'Sem categoria',
    align: 'left',
  },
  {
    name: 'value',
    label: 'Valor',
    field: 'value',
    align: 'right',
    sortable: true,
    format: (val: number) => formatCurrency(val),
  },
]
const pagination = ref({ sortBy: 'date', descending: true, rowsPerPage: 10 })

const { data, isPending, isError, refetch } = useQuery({
  queryKey: ['expenses-table'],
  queryFn: getExpenses,
})

const rows = computed(() => data.value ?? [])
const total = computed(() => rows.value.reduce((sum, expense) => sum + expense.value, 0))
</script>

<template>
  <QPage class="q-pa-md">
    <QCard flat bordered style="max-width: 1000px; margin: auto">
      <QCardSection class="row items-center">
        <div class="text-h6 col">
          Despesas
        </div>
        <QBtn
          color="red"
          icon="remove_circle"
          label="Nova despesa"
          no-caps
          @click="expenseModal = true"
        />
      </QCardSection>

      <QCardSection v-if="isError" class="text-negative">
        Não foi possível carregar as despesas.
        <QBtn flat dense color="primary" label="Tentar de novo" @click="refetch()" />
      </QCardSection>

      <QCardSection v-else>
        <QTable
          v-model:pagination="pagination"
          :rows="rows"
          :columns="columns"
          row-key="_id"
          :loading="isPending"
          no-data-label="Nenhuma despesa cadastrada ainda."
          flat
          bordered
        />

        <div class="text-right text-subtitle1 q-mt-md">
          Total: <span class="text-red text-weight-bold">{{ formatCurrency(total) }}</span>
        </div>
      </QCardSection>
    </QCard>

    <ExpenseDialog v-model="expenseModal" />
  </QPage>
</template>
