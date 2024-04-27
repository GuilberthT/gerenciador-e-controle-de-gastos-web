<script setup>
import { getUsers } from '@/api/users/users.js';
import { onMounted, ref } from 'vue';

const users = ref()

onMounted(async () => {
  users.value = await getUsers()
})

</script>
<template>
  <main>
    <table>
      <tr>
        <th>Nome</th>
        <th>Idade</th>
        <th>Email</th>
        <th>Sexo</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.firstName }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.gender }}</td>
        <td><img :src="user.image" width="100" height="100" /></td>
      </tr>
    </table>
  </main>
</template>
