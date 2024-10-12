<script setup>
import { ref } from 'vue'
import { QBtn, QCard, QCardSection, QPage, QTable } from 'quasar'
import { useQuery } from '@tanstack/vue-query'
import ExpenseDialog from '@/components/ExpenseDialog.vue'
import { getExpenses } from '@/api/expenses'

const expenseModal = ref(false)

const columns = [
  { name: 'description', label: 'Descrição', field: 'description', align: 'left' },
  { name: 'amount', label: 'Valor', field: 'value', align: 'right', format: val => `R$ ${val}` },
  { name: 'date', label: 'Data', field: 'date', align: 'left' },
  { name: 'action', label: 'Ações', align: 'left' },
]

const {
  data,
  isPending: expensesLoading,
} = useQuery({
  queryKey: ['expenses-table'],
  queryFn: getExpenses,
})

function editExpense() {
  expenseModal.value = true
}
</script>

<template>
  <QPage class="bg-light">
    <QCard class="q-ma-md" flat bordered style="max-width: 1000px; margin: auto;">
      <QCardSection v-if="!expensesLoading">
        <div class="text-h6 q-mb-md">
          Gerenciamento de Despesas
        </div>
        <QTable
          :rows="data"
          :columns="columns"
          row-key="id"
          class="shadow-1 rounded-borders"
        >
          <template #body-cell-action="props">
            <QTd :props="props">
              <QBtn icon="edit" flat @click="editExpense(props.row)" />
            </QTd>
          </template>
        </QTable>
      </QCardSection>
    </QCard>

    <ExpenseDialog v-model="expenseModal" />
  </QPage>
</template>
