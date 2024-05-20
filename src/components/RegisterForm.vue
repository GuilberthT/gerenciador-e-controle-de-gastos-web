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
                <q-page class="flex flex-center bg-grey-2">
                    <q-card class="q-pa-md shadow-2 my_card" bordered>
                        <q-card-section class="text-center">
                            <div class="text-grey-9 text-h5 text-weight-bold">Registrar</div>
                            <div class="text-grey-8">Preencha os campos abaixo para criar sua conta</div>
                        </q-card-section>
                        <q-card-section>
                            <QForm @submit.prevent="handleRegister">
                                <QInput dense outlined v-model="name" label="Nome" ></QInput>
                                <QInput dense outlined v-model="email" type="email" label="Email" ></QInput>
                                <QInput dense outlined v-model="password" type="password" label="Senha" >
                                </QInput>
                                <QInput dense outlined v-model="confirmPassword" type="password" label="Confirmar Senha"
                                    required></QInput>
                                <QBtn style="border-radius: 8px;" color="primary" rounded size="md" label="Registrar"
                                    no-caps class="full-width q-mt-md" type="submit"></QBtn>
                            </QForm>
                        </q-card-section>
                        <q-card-section class="text-center q-pt-none">
                            <div class="text-grey-8">Já tem uma conta?
                                <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Faça
                                    login.</a>
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
