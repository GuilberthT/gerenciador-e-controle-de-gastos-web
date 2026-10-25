<script setup lang="ts">
import { computed, ref } from 'vue'
import { Notify, useQuasar } from 'quasar'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { QTableColumn } from 'quasar'
import { deleteExpense, getExpenses } from '@/api/expenses'
import ExpenseDialog from '@/components/ExpenseDialog.vue'
import type { Expense } from '@/api/expenses'
import { formatCurrency, formatDate, parseApiDate } from '@/utils/format'

const $q = useQuasar()
const queryClient = useQueryClient()
const expenseModal = ref(false)
const selectedExpense = ref<Expense | null>(null)

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
  { name: 'actions', label: 'Ações', field: '_id', align: 'center' },
]
const pagination = ref({ sortBy: 'date', descending: true, rowsPerPage: 10 })

const { data, isPending, isError, refetch } = useQuery({
  queryKey: ['expenses-table'],
  queryFn: getExpenses,
})

const rows = computed(() => data.value ?? [])
const total = computed(() => rows.value.reduce((sum, expense) => sum + expense.value, 0))

const { mutate: removeExpense } = useMutation({
  mutationFn: (id: string) => deleteExpense(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['expenses-table'] })
    queryClient.invalidateQueries({ queryKey: ['get-total-expenses'] })

    Notify.create({ message: 'Despesa excluída.', color: 'positive', textColor: 'white' })
  },
  onError: (error) => {
    Notify.create({ message: `Erro: ${error}`, color: 'negative', textColor: 'white' })
  },
})

function openNewExpense() {
  selectedExpense.value = null
  expenseModal.value = true
}

function openEditExpense(expense: Expense) {
  selectedExpense.value = expense
  expenseModal.value = true
}

function confirmDelete(expense: Expense) {
  $q.dialog({
    title: 'Excluir despesa',
    message: `Tem certeza que deseja excluir "${expense.description}"?`,
    cancel: { label: 'Cancelar', flat: true },
    ok: { label: 'Excluir', color: 'negative', flat: true },
    persistent: true,
  }).onOk(() => removeExpense(expense._id))
}
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
          @click="openNewExpense"
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
        >
          <template #body-cell-actions="props">
            <QTd :props="props">
              <QBtn flat round dense icon="edit" color="primary" @click="openEditExpense(props.row)">
                <QTooltip>Editar</QTooltip>
              </QBtn>
              <QBtn flat round dense icon="delete" color="negative" @click="confirmDelete(props.row)">
                <QTooltip>Excluir</QTooltip>
              </QBtn>
            </QTd>
          </template>
        </QTable>

        <div class="text-right text-subtitle1 q-mt-md">
          Total: <span class="text-red text-weight-bold">{{ formatCurrency(total) }}</span>
        </div>
      </QCardSection>
    </QCard>

    <ExpenseDialog v-model="expenseModal" :expense="selectedExpense" />
  </QPage>
</template>
