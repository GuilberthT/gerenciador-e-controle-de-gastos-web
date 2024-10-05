<script setup>
import { Cookies, Notify } from 'quasar'
import { useRouter } from 'vue-router'
import WrapperForm from '../../../components/WrapperForm.vue'
import { login } from '@/api/AuthService'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

async function handleLogin() {
  try {
    const dataLogin = {
      email: email.value,
      password: password.value,
    }

    const token = await login(dataLogin)

    Cookies.set('token', token)

    Notify.create({
      message: `${email.value} Logado com sucesso!`,
      color: 'positive',
      textColor: 'white',
    })

    router.push('/')
  }
  catch (error) {
    errorMessage.value = error?.response?.data?.msg
    Notify.create({
      message: error?.response?.data?.msg,
      color: 'negative',
      textColor: 'white',
    })
  }
}
</script>

<template>
  <div class="flex bg-gray">
    <WrapperForm>
      <template #default>
        <QCard class="q-pa-md shadow-2 my_card" bordered>
          <QCardSection class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">
              Faça Login
            </div>
            <div class="text-grey-8">
              Faça login abaixo para acessar sua conta
            </div>
          </QCardSection>
          <QCardSection>
            <QForm @submit.prevent="handleLogin">
              <QInput v-model="email" dense outlined type="email" label="Email" required />
              <QInput v-model="password" dense outlined class="q-mt-md" type="password" label="Senha" required />
              <QBtn
                style="border-radius: 8px;" color="primary" rounded size="md" label="Entrar" no-caps
                class="full-width q-mt-md" type="submit"
              />
            </QForm>
          </QCardSection>
          <QCardSection class="text-center q-pt-none">
            <div class="text-grey-8">
              Não tem uma conta ainda?
              <a href="/register" class="text-dark text-weight-bold" style="text-decoration: none">Cadastre-se.</a>
            </div>
          </QCardSection>
          <QCardSection class="text-center q-pt-none">
            <p v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </p>
          </QCardSection>
        </QCard>
      </template>
      <template #image>
        <img src="@/assets/images/login.svg" alt="Login Image" class="login-image">
      </template>
    </WrapperForm>
  </div>
</template>

<style scoped>
.login-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
