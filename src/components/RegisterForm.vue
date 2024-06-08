<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify, QBtn, QForm, QInput } from 'quasar'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const router = useRouter()

async function handleRegister() {
  try {
    const registerData = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmpassword: confirmPassword.value,
    }

    const response = await axios.post('/api/register', registerData)

    Notify.create({
      message: response.data.msg,
      color: 'positive',
      textColor: 'white',
    })

    router.push('/login')
  }
  catch (error) {
    errorMessage.value = error.response?.data?.msg || 'Erro ao registrar o usuário'
    Notify.create({
      message: errorMessage.value,
      color: 'negative',
      textColor: 'white',
    })
  }
}
</script>

<template>
  <div id="q-app" class="flex bg-gray">
    <div class="login-form-container">
      <q-card class="q-pa-md shadow-2 my_card" bordered>
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h5 text-weight-bold">
            Registrar
          </div>
          <div class="text-grey-8">
            Preencha os campos abaixo para criar sua conta
          </div>
        </q-card-section>
        <q-card-section>
          <QForm @submit.prevent="handleRegister">
            <QInput v-model="name" dense outlined label="Nome" required />
            <QInput v-model="email" dense outlined type="email" label="Email" required />
            <QInput v-model="password" dense outlined type="password" label="Senha" required />
            <QInput v-model="confirmPassword" dense outlined type="password" label="Confirmar Senha" required />
            <QBtn style="border-radius: 8px;" color="primary" rounded size="md" label="Registrar" no-caps
              class="full-width q-mt-md" type="submit" />
          </QForm>
        </q-card-section>
        <q-card-section class="text-center q-pt-none">
          <div class="text-grey-8">
            Já tem uma conta?
            <a href="/login" class="text-dark text-weight-bold" style="text-decoration: none">Faça login.</a>
          </div>
        </q-card-section>
        <q-card-section class="text-center q-pt-none">
          <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>
        </q-card-section>
      </q-card>
    </div>
    <div class="login-image-container">
      <img src="@/assets/images/signUp.svg" alt="Sign Up Image" class="login-image">
    </div>
  </div>
</template>

<style scoped>
#q-app {
  height: 100vh;
}

.login-form-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.full-width {
  width: 100%;
}

.error-message {
  color: red;
}
</style>
