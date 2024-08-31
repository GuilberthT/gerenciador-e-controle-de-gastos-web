<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getTotalIncomes } from '@/api/income.js'
import ExpenseDialog from '@/components/ExpenseDialog.vue'
import IncomeDialog from '@/components/IncomeDialog.vue'
import { getTotalExpenses } from '@/api/report.js'
import { months } from '@/constants/months'

interface IncomeData {
  total: number
}

interface ExpenseData {
  total: number
}

const greeting = ref<string>('')
const expenseModal = ref<boolean>(false)
const incomeModal = ref<boolean> (false)
const selectedMonth = ref<number>(new Date().getMonth() + 1)

function setGreeting(): void {
  const hour = new Date().getHours()

  if (hour < 12) {
    greeting.value = 'Bom dia'
  }
  else if (hour >= 12 && hour < 18) {
    greeting.value = 'Boa tarde 🌞'
  }
  else {
    greeting.value = 'Boa Noite 🌛'
  }
}

const { data: dataTotalExpenses, isPending: isLoadingTotalExpenses } = useQuery<ExpenseData>({
  queryKey: ['get-total-expenses', selectedMonth],
  queryFn: () => getTotalExpenses(selectedMonth.value),
})

const { data: dataTotalIncomes, isPending: isLoadingTotalIncomes } = useQuery<IncomeData>({
  queryKey: ['get-total-incomes', selectedMonth],
  queryFn: () => getTotalIncomes(selectedMonth.value),
})

const differenceIncomesByExpenses = computed<number>(() => {
  if (isLoadingTotalExpenses.value || isLoadingTotalIncomes.value || !dataTotalIncomes.value || !dataTotalExpenses.value) {
    return 0
  }

  return dataTotalIncomes.value.total - dataTotalExpenses.value.total
})

// Função para formatação monetária
function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

onMounted((): void => {
  setGreeting()
})
</script>

<template>
  <ExpenseDialog v-model="expenseModal" />
  <IncomeDialog v-model="incomeModal" />
  <QPage class="bg-light">
    <QCard class="q-ma-md" flat bordered style="max-width: 1000px; margin: auto;">
      <QCardSection class="text-h6">
        <div class="row items-center">
          <div class="col">
            {{ greeting }}
          </div>
        </div>
      </QCardSection>
      <QCardSection>
        <div class="row">
          <div class="col">
            <QSelect v-model="selectedMonth" :options="months" outlined dense label="Selecione o mês" emit-value map-options class="custom-select" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <QCard flat bordered class="q-pa-md text-center">
              <div class="text-caption">
                Receita mensal
              </div>
              <div v-show="!isLoadingTotalIncomes" class="text-subtitle1 text-green">
                {{ formatCurrency(dataTotalIncomes?.total || 0) }}
              </div>
            </QCard>
          </div>
          <div class="col">
            <QCard flat bordered class="q-pa-md text-center">
              <div class="text-caption">
                Despesa mensal
              </div>
              <div v-if="!isLoadingTotalExpenses" class="text-subtitle1 text-red">
                {{ formatCurrency(dataTotalExpenses?.total || 0) }}
              </div>
            </QCard>
          </div>
        </div>
      </QCardSection>
      <QSeparator />
      <QCardSection>
        <div class="text-h6 q-mb-md">
          Acesso rápido
        </div>
        <div class="row justify-around">
          <QBtn color="red" icon="remove_circle" label="DESPESA" @click="expenseModal = true" />
          <QBtn color="green" icon="add_circle" label="RECEITA" @click="incomeModal = true" />
          <QBtn color="grey" icon="sync_alt" label="TRANSF." />
          <QBtn color="blue" icon="link" label="IMPORTAR" />
        </div>
      </QCardSection>
      <QSeparator />
      <QCardSection>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <QCard flat bordered>
              <QCardSection>
                <div class="text-subtitle1">
                  Despesas gerais
                </div>
                <div v-if="!isLoadingTotalExpenses" class="text-h5 text-green">
                  {{ formatCurrency(dataTotalExpenses?.total || 0) }}
                </div>
              </QCardSection>
              <QCardSection>
                <QBtn flat label="Gerenciar despesas" class="q-mt-md full-width" />
              </QCardSection>
            </QCard>
          </div>
          <div class="col-6">
            <QCard flat bordered>
              <QCardSection>
                <div class="text-subtitle1">
                  Saldo Total
                </div>
                <div
                  v-if="!isLoadingTotalIncomes || !isLoadingTotalExpenses"
                  :class="`text-h5 ${differenceIncomesByExpenses >= 0 ? 'text-green' : 'text-red'}`"
                >
                  {{ formatCurrency(differenceIncomesByExpenses) }}
                </div>
              </QCardSection>
              <QCardSection>
                <QBtn flat label="Gerenciar rendas" class="q-mt-md full-width" />
              </QCardSection>
            </QCard>
          </div>
        </div>
      </QCardSection>
    </QCard>
  </QPage>
</template>

<style scoped>
.bg-green-7 {
  background-color: #00C853;
}

.text-white {
  color: white;
}

.custom-select {
  color: #000;
  background-color: #fff;
  border: 1px solid #4CAF50;
  border-radius: 8px;
}

.custom-select .q-field__native {
  color: #000;
}

.custom-select .q-field__label {
  color: #4CAF50;
}

.custom-select .q-field--focused .q-field__control {
  border-color: #4CAF50;
}

.custom-select .q-item__label {
  color: #000;
}

.custom-select .q-item__active {
  background-color: #4CAF50;
  color: #fff;
}
</style>
