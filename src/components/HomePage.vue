<script setup>
import { useQuery } from '@tanstack/vue-query'
import { QBtn, QCard, QCardSection, QPage, QSelect, QSeparator } from 'quasar'
import { getTotalIncomes } from '@/api/income.js'
import ExpenseDialog from '@/components/ExpenseDialog.vue'
import IncomeDialog from '@/components/IncomeDialog.vue'
import { getTotalExpenses } from '@/api/report.js'
import { months } from '@/constants/months'

const greeting = ref('')
const expenseModal = ref(false)
const incomeModal = ref(false)
const selectedMonth = ref(new Date().getMonth() + 1)

function setGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) {
    greeting.value = 'Bom Dia 🌞'
  }
  else if (hour > 13 && hour < 18) {
    greeting.value = 'Boa tarde 🌞'
  }
  else {
    greeting.value = 'Boa Noite 🌛'
  }
}

const { data: dataTotalExpenses, isPending: isLoadingTotalExpenses } = useQuery({
  queryKey: ['get-total-expenses', selectedMonth],
  queryFn: () => getTotalExpenses(selectedMonth.value),
})

const { data: dataTotalIncomes, isPending: isLoadingTotalIncomes } = useQuery({
  queryKey: ['get-total-incomes', selectedMonth],
  queryFn: () => getTotalIncomes(selectedMonth.value),
})

const differenceIncomesByExpenses = computed(() => {
  if (isLoadingTotalExpenses.value || isLoadingTotalIncomes.value) {
    return 0
  }

  return dataTotalIncomes.value.total - dataTotalExpenses.value.total
})

onMounted(() => {
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
            <QSelect v-model="selectedMonth" :options="months" label="Selecione o mês" emit-value map-options />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <QCard flat bordered class="q-pa-md text-center">
              <div class="text-caption">
                Receita mensal
              </div>
              <div v-show="!isLoadingTotalIncomes" class="text-subtitle1 text-green">
                R$ {{ dataTotalIncomes?.total }}
              </div>
            </QCard>
          </div>
          <div class="col">
            <QCard flat bordered class="q-pa-md text-center">
              <div class="text-caption">
                Despesa mensal
              </div>
              <div v-if="!isLoadingTotalExpenses" class="text-subtitle1 text-red">
                R$ {{ dataTotalExpenses.total }}
              </div>
            </QCard>
          </div>
          <div class="col">
            <QBtn flat label="ver relatórios" class="q-mt-md full-width" icon="trending_up" />
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
                  R$ {{ dataTotalExpenses.total }}
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
                  R$ {{ differenceIncomesByExpenses }}
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
</style>
