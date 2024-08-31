<script setup>
import { onMounted, ref } from 'vue'
import { QBtn, QCard, QCardSection, QPage, QTable } from 'quasar'
import ExpenseDialog from '@/components/ExpenseDialog.vue'
import { getExpenses } from '@/api/expenses.js'

const expenses = ref([])
const expenseModal = ref(false)
const selectedExpense = ref(null)

const columns = [
  { name: 'description', label: 'Descrição', field: 'description', align: 'left' },
  { name: 'amount', label: 'Valor', field: 'amount', align: 'right', format: val => `R$ ${val}` },
  { name: 'date', label: 'Data', field: 'date', align: 'left', format: val => new Date(val).toLocaleDateString() },
]

function fetchExpenses() {
  getExpenses().then((response) => {
    expenses.value = response.data
  })
}

function editExpense(expense) {
  selectedExpense.value = expense
  expenseModal.value = true
}

onMounted(() => {
  fetchExpenses()
})
</script>

<template>
  <QPage class="bg-light">
    <QCard class="q-ma-md" flat bordered style="max-width: 1000px; margin: auto;">
      <QCardSection>
        <div class="text-h6 q-mb-md">
          Gerenciamento de Despesas
        </div>
        <QTable
          :rows="expenses"
          :columns="columns"
          row-key="id"
          class="shadow-1 rounded-borders"
        >
          <template #body-cell-action="props">
            <q-td :props="props">
              <QBtn icon="edit" color="primary" @click="editExpense(props.row)" />
            </q-td>
          </template>
        </QTable>
      </QCardSection>
    </QCard>

    <ExpenseDialog v-model="expenseModal" :expense="selectedExpense" />
  </QPage>
</template>
