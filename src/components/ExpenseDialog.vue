<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Notify, QDialog, QCard, QCardSection, QInput, QCardActions, QBtn, QPopupProxy, QDate, QBadge } from 'quasar'

const expenseModal = ref(false)

const description = ref('')
const value = ref(0)
const paymentDate = ref('')
const selectedCategory = ref(null)
const categories = ref([])

const proxyDate = ref('')

const router = useRouter()

async function loadCategories() {
  try {
    const response = await axios.get('/api/expense-types', {
      headers: { 'Authorization': `Bearer ${Cookies.get('token')}` }
    })
    categories.value = response.data
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}

async function launchExpense() {
  try {
    await axios.post('/api/expenses', {
      description: description.value,
      value: value.value,
      paymentDate: paymentDate.value,
      expenseType: selectedCategory.value,
    }, {
      headers: { 'Authorization': `Bearer ${Cookies.get('token')}` }
    })
    expenseModal.value = false
    Notify.create({
      message: 'Despesa lançada com sucesso!',
      type: 'positive',
      position: 'top'
    })
    router.push('/')
  } catch (error) {
    console.error('Failed to launch expense', error)
    if (error.response && error.response.status === 401) {
      router.push('/login')
    } else {
      Notify.create({
        message: 'Erro ao lançar despesa',
        type: 'negative',
        position: 'top'
      })
    }
  }
}

function resetFields() {
  description.value = ''
  value.value = 0
  paymentDate.value = ''
  selectedCategory.value = null
}

function closeDialog() {
  expenseModal.value = false
  resetFields()
  router.push('/')
}

watch(expenseModal, (newValue) => {
  if (!newValue) {
    resetFields()
  }
})

onMounted(() => {
  loadCategories()
})

function updateProxy() {
  proxyDate.value = paymentDate.value
}

function save() {
  paymentDate.value = proxyDate.value
}

</script>

<template>
  <QDialog v-model="expenseModal" persistent>
    <QCard style="min-width: 350px">
      <QCardSection>
        <div class="text-h6">Lançar despesa</div>
      </QCardSection>

      <QCardSection class="q-pt-none">
        <div class="q-gutter-md" style="max-width: 300px">
          <QInput v-model="description" label="Descrição" />
        </div>

        <div class="q-gutter-md" style="max-width: 300px">
          <QInput v-model.number="value" label="Valor" type="number" />
        </div>

        <div class="q-gutter-md" style="max-width: 300px">
          <QInput v-model="selectedCategory" label="Categoria" />
        </div>

        <div class="q-pa-md">
          <div class="q-mb-sm">
            <QBadge color="teal">
              Data: {{ paymentDate }}
            </QBadge>
          </div>

          <QBtn icon="event" round color="primary" size="sm" @click="updateProxy">
            <QPopupProxy v-model="showDatePicker" cover transition-show="scale" transition-hide="scale">
              <QDate v-model="proxyDate" mask="##/##/####" format="DD/MM/YYYY">
                <div class="row items-center justify-end q-gutter-sm">
                  <QBtn label="Cancelar" color="primary" flat v-close-popup />
                  <QBtn label="OK" color="primary" flat @click="save" v-close-popup />
                </div>
              </QDate>
            </QPopupProxy>
          </QBtn>
        </div>
      </QCardSection>

      <QCardActions align="right" class="text-primary">
        <QBtn flat label="Cancelar" @click="closeDialog" />
        <QBtn flat label="Lançar" @click="launchExpense" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<style scoped>
.q-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.q-input,
.q-select {
  margin-bottom: 10px;
}

.q-date__calendar {
  width: 100%;
}
</style>








<!-- <script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Notify } from 'quasar'

const expenseModal = ref(false)
const description = ref('')
const value = ref(0)
const paymentDate = ref('')
const selectedCategory = ref(null)
const categories = ref([])
const showDatePicker = ref(false)

const router = useRouter()

async function loadCategories() {
  try {
    const response = await axios.get('/api/expense-types', {
      headers: { 'Authorization': `Bearer ${Cookies.get('token')}` }
    })
    categories.value = response.data
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}

async function launchExpense() {
  try {
    await axios.post('/api/expenses', {
      description: description.value,
      value: value.value,
      paymentDate: paymentDate.value,
      expenseType: selectedCategory.value,
    }, {
      headers: { 'Authorization': `Bearer ${Cookies.get('token')}` }
    })
    expenseModal.value = false
    Notify.create({
      message: 'Despesa lançada com sucesso!',
      type: 'positive',
      position: 'top'
    })
    router.push('/')
  } catch (error) {
    console.error('Failed to launch expense', error)
    if (error.response && error.response.status === 401) {
      router.push('/login')
    } else {
      Notify.create({
        message: 'Erro ao lançar despesa',
        type: 'negative',
        position: 'top'
      })
    }
  }
}

function resetFields() {
  description.value = ''
  value.value = 0
  paymentDate.value = ''
  selectedCategory.value = null
}

function closeDialog() {
  expenseModal.value = false
  resetFields()
  router.push('/')
}

watch(expenseModal, (newValue) => {
  if (!newValue) {
    resetFields()
  }
})

onMounted(() => {
  loadCategories()
})

</script>

<template>
  <QDialog v-model="expenseModal" persistent @hide="resetFields">
    <QCard class="q-pa-md" style="min-width: 400px">
      <QCardSection class="text-h6 q-pb-md">Nova despesa</QCardSection>

      <QCardSection class="q-pt-none q-gutter-md">
        <QInput v-model="description" label="Descrição" dense autofocus />

        <QInput v-model.number="value" label="Valor" dense type="number" />

        <QInput
          v-model="paymentDate"
          label="Data"
          mask="##/##/####"
          dense
          readonly
          @click="showDatePicker = true"
        />
        <QPopupProxy v-model="showDatePicker">
          <QDate v-model="paymentDate" mask="##/##/####" format="DD/MM/YYYY" @input="showDatePicker = false" />
        </QPopupProxy>

        <QSelect v-model="selectedCategory" :options="categories" option-label="description" option-value="_id" label="Categoria" dense />

        <QCardActions align="right" class="text-primary q-pt-none">
          <QBtn flat label="Cancelar" @click="closeDialog" color="negative" />
          <QBtn flat label="Lançar" @click="launchExpense" color="positive" />
        </QCardActions>
      </QCardSection>
    </QCard>
  </QDialog>
</template>

<style scoped>
.q-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.q-input,
.q-select {
  margin-bottom: 10px;
}

.q-date__calendar {
  width: 100%;
}
</style> -->
