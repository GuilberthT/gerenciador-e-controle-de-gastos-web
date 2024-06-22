<script setup>
const expenseModal = defineModel()
</script>

<template>
  <QDialog v-model="expenseModal" persistent>
    <QCard style="min-width: 350px">
      <QCardSection>
        <div class="text-h6">Lançar despesa</div>
      </QCardSection>

      <QCardSection class="q-pt-none">
        <QInput dense autofocus @keyup.enter="expenseModal = false" />
      </QCardSection>

      <QCardActions align="right" class="text-primary">
        <QBtn flat label="Cancel" @click="expenseModal = false" />
        <QBtn flat label="Lançar" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>