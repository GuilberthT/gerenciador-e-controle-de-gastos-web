<script setup lang="ts">
import { ref, watch } from 'vue'
import { Notify } from 'quasar'
import InputDate from './InputDate.vue'

interface SelectOption {
  _id: string
  description: string
}

// Dados para preencher o formulário quando o modal abre em modo de edição
interface InitialData {
  description: string
  value: number
  typeId: string | null
  date: string // "DD/MM/AAAA"
}

const props = defineProps<{
  selectData: SelectOption[]
  title: string
  type: 'income' | 'expense'
  initialData?: InitialData | null
}>()

const emit = defineEmits<{
  (e: 'handleCreate', value: any): void
}>()

const openDialog = defineModel<boolean>()

const description = ref('')
const value = ref<number | null>(null)
const expenseDate = ref()
const selectedType = ref<string | null>(null)

// Toda vez que o modal abre: em edição, preenche os campos; senão, limpa
watch(openDialog, (isOpen) => {
  if (!isOpen) {
    return
  }

  if (props.initialData) {
    description.value = props.initialData.description
    value.value = props.initialData.value
    selectedType.value = props.initialData.typeId
    expenseDate.value = props.initialData.date
  }
  else {
    resetFields()
  }
})

// O calendário devolve "DD/MM/AAAA", mas a API espera "AAAA-MM-DD"
function toApiDate(date: string): string {
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}`
}

async function handleCreateExpense() {
  if (!description.value || !value.value || !selectedType.value || !expenseDate.value) {
    Notify.create({
      message: 'Preencha todos os campos',
      color: 'negative',
      textColor: 'white',
    })
    return
  }

  const registerType = props.type === 'income' ? 'incomeType' : 'expenseType'

  const createData = {
    description: description.value,
    value: value.value,
    [registerType]: selectedType.value,
    date: toApiDate(expenseDate.value),
  }

  emit('handleCreate', createData)
  resetFields()
}

function resetFields() {
  description.value = ''
  value.value = null
  expenseDate.value = ''
  selectedType.value = null
}

function closeDialog() {
  openDialog.value = false
  resetFields()
}
</script>

<template>
  <QDialog v-model="openDialog" persistent>
    <QCard style="min-width: 350px">
      <QCardSection>
        <div class="text-h6">
          {{ initialData ? 'Editar' : 'Lançar' }} {{ title }}
        </div>
      </QCardSection>

      <QCardSection class="q-pt-none">
        <div class="q-gutter-md" style="max-width: 300px">
          <QInput v-model="description" label="Descrição" />
        </div>

        <div class="q-gutter-md" style="max-width: 300px">
          <QInput v-model.number="value" label="Valor" type="number" />
        </div>

        <div class="q-gutter-md" style="max-width: 300px">
          <QSelect
            v-model="selectedType" :options="selectData" label="Categoria" option-label="description"
            option-value="_id" emit-value map-options
          />
        </div>

        <div>
          <InputDate v-model="expenseDate" />
        </div>
      </QCardSection>

      <QCardActions align="right" class="text-primary">
        <QBtn flat label="Cancelar" @click="closeDialog" />
        <QBtn flat :label="initialData ? 'Salvar' : 'Lançar'" @click="handleCreateExpense" />
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
