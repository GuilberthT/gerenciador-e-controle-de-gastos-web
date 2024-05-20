<script setup>
import { login } from '@/api/AuthService';
import { Notify, QForm, QInput, QBtn } from 'quasar';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

async function handleLogin() {
  try {
    const dataLogin = {
      email: email.value,
      password: password.value
    };

    const token = await login(dataLogin);

    Notify.create({
      message: `${email.value} Logado com sucesso!`,
      color: "positive",
      textColor: "white"
    });

    localStorage.setItem('token', token);
  } catch (error) {
    errorMessage.value = error.response.data.msg;
    Notify.create({
      message: error.response.data.msg,
      color: "negative",
      textColor: "white"
    });
  }
}
</script>

<template>
  <div id="q-app">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="flex flex-center bg-grey-2">
          <q-card class="q-pa-md shadow-2 my_card" bordered>
            <q-card-section class="text-center">
              <div class="text-grey-9 text-h5 text-weight-bold">Faça Login</div>
              <div class="text-grey-8">Faça login abaixo para acessar sua conta</div>
            </q-card-section>
            <q-card-section>
              <QForm @submit.prevent="handleLogin">
                <QInput dense outlined v-model="email" type="email" label="Email" required></QInput>
                <QInput dense outlined class="q-mt-md" v-model="password" type="password" label="Senha" required>
                </QInput>
                <QBtn style="border-radius: 8px;" color="primary" rounded size="md" label="Entrar" no-caps
                  class="full-width q-mt-md" type="submit"></QBtn>
              </QForm>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">Não tem uma conta ainda?
                <a href="register" class="text-dark text-weight-bold" style="text-decoration: none">Cadastre-se.</a>
              </div>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped>
.full-width {
  width: 100%;
}

.error-message {
  color: red;
}
</style>
