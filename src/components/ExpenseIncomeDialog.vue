<script setup>
import InputDate from './InputDate.vue'

const props = defineProps({
  selectData: Array,
  title: String,
  type: String,
})

const emit = defineEmits(['handleCreate'])

const expenseModal = defineModel({ type: Boolean })

const description = ref('')
const value = ref(0)
const expenseDate = ref('')
const selectedType = ref(null)

async function handleCreateExpense() {
  const registerType = props.type === 'income' ? 'incomeType' : 'expenseType'

  const createData = {
    description: description.value,
    value: value.value,
    [registerType]: selectedType.value,
    date: expenseDate.value,
  }

  emit('handleCreate', createData)
}

function resetFields() {
  description.value = ''
  value.value = 0
  expenseDate.value = ''
  selectedType.value = null
}

function closeDialog() {
  expenseModal.value = false
  resetFields()
}
</script>

<template>
  <QDialog v-model="expenseModal" persistent>
    <QCard style="min-width: 350px">
      <QCardSection>
        <div class="text-h6">
          Lançar {{ title }}
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
        <QBtn flat label="Lançar" @click="handleCreateExpense" />
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
