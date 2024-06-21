<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getExpenses } from '@/api/expenses.js'

const expenses = ref([])
const router = useRouter()
const greeting = ref('')

function setGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) {
    greeting.value = 'Bom Dia 🌞'
  } else {
    greeting.value = 'Boa Noite 🌛'
  }
}

async function loadExpenses() {
  try {
    expenses.value = await getExpenses()
  } catch (error) {
    router.push('/login')
  }
}

onMounted(() => {
  setGreeting()
  loadExpenses()
})
</script>

<template>
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
              <div class="text-caption">receita mensal</div>
              <div class="text-subtitle1 text-green">R$ 0,00</div>
            </QCard>
          </div>
          <div class="col">
            <QCard flat bordered class="q-pa-md text-center">
              <div class="text-caption">despesa mensal</div>
              <div class="text-subtitle1 text-red">R$ 0,00</div>
            </QCard>
          </div>
          <div class="col">
            <QBtn flat label="ver relatórios" class="q-mt-md full-width" icon="trending_up" />
          </div>
        </div>
      </QCardSection>
      <QSeparator />
      <QCardSection>
        <div class="text-h6 q-mb-md">Acesso rápido</div>
        <div class="row justify-around">
          <QBtn round color="red" icon="remove_circle" label="DESPESA" />
          <QBtn round color="green" icon="add_circle" label="RECEITA" />
          <QBtn round color="grey" icon="sync_alt" label="TRANSF." />
          <QBtn round color="blue" icon="link" label="IMPORTAR" />
        </div>
      </QCardSection>
      <QSeparator />
      <QCardSection>
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <QCard flat bordered>
              <QCardSection>
                <div class="text-subtitle1">Despesas gerais</div>
                <div class="text-h5 text-green">R$ 0,00</div>
              </QCardSection>
              <QCardSection>
                <QBtn flat label="Gerenciar despesas" class="q-mt-md full-width" />
              </QCardSection>
            </QCard>
          </div>
          <div class="col-6">
            <QCard flat bordered>
              <QCardSection>
                <div class="text-subtitle1">Saldo Total</div>
                <div class="text-h5 text-green">R$ 0,00</div>
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
.bg-light {
  background-color: #f9f9f9;
}
.q-page {
  padding: 16px;
}
.text-bold {
  font-weight: bold;
}
</style>