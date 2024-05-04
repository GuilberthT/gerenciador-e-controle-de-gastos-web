        <script setup>
        import { getUsers } from '@/api/users/users.js';
        import { onMounted, ref } from 'vue';
        
        const users = ref()
        
        onMounted(async () => {
          users.value = await getUsers()
        })
        
        function formatAge(age) {
          return `${age} anos`;
        }
        
        function translateGender(gender) {
          return gender === 'male' ? 'Masculino' : 'Feminino';
        }
        
        function translateEyeColor(color) {
          switch(color) {
            case 'blue':
              return 'Azul';
            case 'brown':
              return 'Castanho';
            case 'green':
              return 'Verde';
            case 'gray':
              return 'Cinza';
            default:
              return 'Outra cor';
          }
        }
        </script>
<template>
  <main>
    <table class="user-table">
      <tr>
        <th>Nome Completo</th>
        <th>Idade</th>
        <th>Email</th>
        <th>Sexo</th>
        <th>Cor do Olho</th>
        <th>Empresa</th>
        <th>Imagem</th>
      </tr>
      <tr v-for="user in users" :key="user.id" class="user-row">
        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>{{ formatAge(user.age) }}</td>
        <td>{{ user.email }}</td>
        <td>{{ translateGender(user.gender) }}</td>
        <td>{{ translateEyeColor(user.eyeColor) }}</td>
        <td>{{ user.company.name }}</td>
        <td><img :src="user.image" class="user-image" /></td>
      </tr>
    </table>
  </main>
</template>


<style>
.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th, .user-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-row:hover {
  background-color: #f5f5f5;
}

.user-image {
  width: 100px;
  height: auto;
  border-radius: 50%;
}
</style>
