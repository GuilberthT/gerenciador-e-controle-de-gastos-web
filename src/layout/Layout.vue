<script setup>
</script>

<template>
  <QLayout view="lHh Lpr lFf">
    <QPageContainer>
      <!-- aqui vem o conteudo que nao "some" da tela -->
      <QPage>
        <slot />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>
