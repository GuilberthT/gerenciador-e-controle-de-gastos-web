<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import dayjs from 'dayjs'
import { getExpenses } from '@/api/expenses.js'
import { getIncomes } from '@/api/income.js'
import ExpenseDailog from '@/components/ExpenseDialog.vue'
import IncomeDialog from '@/components/IncomeDialog.vue'

const expenses = ref([])
const incomes = ref([])
const router = useRouter()
const greeting = ref('')
const expenseModal = ref(false)
const incomeModal = ref(false)

const totalExpenses = ref(0)
const totalBalance = ref(0)
const monthlyIncome = ref(0)
const monthlyExpense = ref(0)

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

async function loadExpenses() {
  try {
    expenses.value = await getExpenses()
    calculateTotals()
  }
  catch (error) {
    Notify.create({
      message: error,
      color: 'negative',
      textColor: 'white',
    })
    router.push('/login')
  }
}

async function loadIncomes() {
  try {
    incomes.value = await getIncomes()
    calculateTotals()
  }
  catch (error) {
    Notify.create({
      message: error,
      color: 'negative',
      textColor: 'white',
    })
    router.push('/login')
  }
}

function calculateTotals() {
  const month = dayjs().month() + 1
  const year = dayjs().year()

  let totalExp = 0
  let totalInc = 0
  let monthlyExp = 0
  let monthlyInc = 0

  expenses.value.forEach((expense) => {
    if (typeof expense.amount === 'number' && dayjs(expense.paymentDate).isValid()) {
      totalExp += expense.amount
      const expenseDate = dayjs(expense.paymentDate)
      if (expenseDate.month() + 1 === month && expenseDate.year() === year) {
        monthlyExp += expense.amount
      }
    }
  })

  incomes.value.forEach((income) => {
    if (typeof income.amount === 'number' && dayjs(income.paymentDate).isValid()) {
      totalInc += income.amount
      const incomeDate = dayjs(income.paymentDate)
      if (incomeDate.month() + 1 === month && incomeDate.year() === year) {
        monthlyInc += income.amount
      }
    }
  })

  totalExpenses.value = totalExp
  totalBalance.value = totalInc - totalExp
  monthlyIncome.value = monthlyInc
  monthlyExpense.value = monthlyExp
}

onMounted(() => {
  setGreeting()
  loadExpenses()
  loadIncomes()
})
</script>

<template>
  <ExpenseDailog v-model="expenseModal" />
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
            <QCard flat bordered class="q-pa-md text-center">
              <div class="text-caption">
                Receita mensal
              </div>
              <div class="text-subtitle1 text-green">
                R$ {{ monthlyIncome.toFixed(2) }}
              </div>
            </QCard>
          </div>
          <div class="col">
            <QCard flat bordered class="q-pa-md text-center">
              <div class="text-caption">
                Despesa mensal
              </div>
              <div class="text-subtitle1 text-red">
                R$ {{ monthlyExpense.toFixed(2) }}
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
                <div class="text-h5 text-green">
                  R$ {{ totalExpenses.toFixed(2) }}
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
                <div class="text-h5 text-green">
                  R$ {{ totalBalance.toFixed(2) }}
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
