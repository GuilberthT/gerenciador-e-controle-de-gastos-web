<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify, QForm, QInput, QBtn } from 'quasar';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const router = useRouter();

async function handleRegister() {
    try {
        const registerData = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirmpassword: confirmPassword.value
        };

        const response = await axios.post('/api/register', registerData);

        Notify.create({
            message: response.data.msg,
            color: 'positive',
            textColor: 'white'
        });

        router.push('/login');
    } catch (error) {
        errorMessage.value = error.response?.data?.msg || 'Erro ao registrar o usuário';
        Notify.create({
            message: errorMessage.value,
            color: 'negative',
            textColor: 'white'
        });
    }
}
</script>

<template>
    <div id="q-app">
        <q-layout view="lHh Lpr lFf">
            <q-page-container>
                <q-page class="flex bg-grey-2 page-container">
                    <div class="form-container">
                        <q-card class="q-pa-md shadow-2 my_card" bordered>
                            <q-card-section class="text-center">
                                <div class="text-grey-9 text-h5 text-weight-bold">Registrar</div>
                                <div class="text-grey-8">Preencha os campos abaixo para criar sua conta</div>
                            </q-card-section>
                            <q-card-section>
                                <QForm @submit.prevent="handleRegister">
                                    <QInput dense outlined v-model="name" label="Nome" required></QInput>
                                    <QInput dense outlined v-model="email" type="email" label="Email" required></QInput>
                                    <QInput dense outlined v-model="password" type="password" label="Senha" required>
                                    </QInput>
                                    <QInput dense outlined v-model="confirmPassword" type="password"
                                        label="Confirmar Senha" required></QInput>
                                    <QBtn style="border-radius: 8px;" color="primary" rounded size="md"
                                        label="Registrar" no-caps class="full-width q-mt-md" type="submit"></QBtn>
                                </QForm>
                            </q-card-section>
                            <q-card-section class="text-center q-pt-none">
                                <div class="text-grey-8">Já tem uma conta?
                                    <a href="/login" class="text-dark text-weight-bold"
                                        style="text-decoration: none">Faça login.</a>
                                </div>
                            </q-card-section>
                            <q-card-section class="text-center q-pt-none">
                                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="image-container">
                        <img src="@/assets/images/signUp.svg" alt="Sign Up Image" class="sign-up-image" />
                    </div>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<style scoped>
.page-container {
    display: flex;
    width: 100%;
    height: 100vh;
}

.form-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 50%;
    height: 100%;
    padding: 20px;
}

.image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 50%;
    height: 100%;
    background-color: #f5f5f5;
}

.sign-up-image {
    max-width: 100%;
    height: auto;
}

.full-width {
    width: 100%;
}

.error-message {
    color: red;
}
</style>
