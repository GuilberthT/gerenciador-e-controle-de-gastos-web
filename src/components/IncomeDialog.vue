<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Notify, QDialog, QCard, QCardSection, QInput, QCardActions, QBtn, QPopupProxy, QDate, QBadge, QSelect } from 'quasar'

// Model para abrir e fechar o dialog
const incomeModal = ref(false)

// Variáveis para os campos do formulário
const description = ref('')
const value = ref(0)
const receiptDate = ref('')
const selectedCategory = ref(null)
const categories = ref([])

// Controle do date picker
const proxyDate = ref('')

// Roteador para navegação
const router = useRouter()

// Função para carregar as categorias
async function loadCategories() {
  try {
    const response = await axios.get('/api/income-types', {
      headers: { 'Authorization': `Bearer ${Cookies.get('token')}` }
    })
    categories.value = response.data
  } catch (error) {
    console.error('Failed to load categories', error)
  }
}

// Função para lançar uma nova receita
async function launchIncome() {
  try {
    await axios.post('/api/incomes', {
      description: description.value,
      value: value.value,
      receiptDate: receiptDate.value,
      incomeType: selectedCategory.value,
    }, {
      headers: { 'Authorization': `Bearer ${Cookies.get('token')}` }
    })
    incomeModal.value = false
    Notify.create({
      message: 'Receita lançada com sucesso!',
      type: 'positive',
      position: 'top'
    })
    router.push('/')
  } catch (error) {
    console.error('Failed to launch income', error)
    if (error.response && error.response.status === 401) {
      router.push('/login')
    } else {
      Notify.create({
        message: 'Erro ao lançar receita',
        type: 'negative',
        position: 'top'
      })
    }
  }
}

// Função para resetar os campos do formulário
function resetFields() {
  description.value = ''
  value.value = 0
  receiptDate.value = ''
  selectedCategory.value = null
}

// Função para fechar o dialog e resetar os campos
function closeDialog() {
  incomeModal.value = false
  resetFields()
  router.push('/')
}

// Monitorar a abertura do dialog para resetar os campos
watch(incomeModal, (newValue) => {
  if (!newValue) {
    resetFields()
  }
})

// Carregar as categorias ao montar o componente
onMounted(() => {
  loadCategories()
})

// Atualizar o proxy da data
function updateProxy() {
  proxyDate.value = receiptDate.value
}

// Salvar a data selecionada
function save() {
  receiptDate.value = proxyDate.value
}

</script>

<template>
  <QDialog v-model="incomeModal" persistent>
    <QCard style="min-width: 350px">
      <QCardSection>
        <div class="text-h6">Lançar receita</div>
      </QCardSection>

      <QCardSection class="q-pt-none">
        <div class="q-gutter-md" style="max-width: 300px">
          <QInput v-model="description" label="Descrição" />
        </div>

        <div class="q-gutter-md" style="max-width: 300px">
          <QInput v-model.number="value" label="Valor" type="number" />
        </div>

        <div class="q-gutter-md" style="max-width: 300px">
          <QSelect v-model="selectedCategory" :options="categories" label="Categoria" />
        </div>

        <div class="q-pa-md">
          <div class="q-mb-sm">
            <QBadge color="teal">
              Data: {{ receiptDate }}
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
        <QBtn flat label="Lançar" @click="launchIncome" />
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
