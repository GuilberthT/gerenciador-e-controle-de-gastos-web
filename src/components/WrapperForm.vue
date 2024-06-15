<script setup>
</script>

<template>
  <div class="container">
    <slot />
  </div>
  <div class="login-image-container">
    <slot name="image" />
    <!-- <img src="@/assets/images/signUp.svg" alt="Sign Up Image" class="login-image"> -->
  </div>
</template>

<style scoped>
.container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
}

.login-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
