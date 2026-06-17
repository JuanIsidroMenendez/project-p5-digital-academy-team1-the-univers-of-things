<!-- Vista admin: gestión de usuarios -->

<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { useAdminStore } from "@/stores/admin-store";
import { onMounted } from "vue";
const adminStore = useAdminStore();
onMounted(async () => {
  await adminStore.fetchAllUsers();
});
</script>

<template>
  <AdminLayout>
    <section class="user-management">
      <h1 class="user-management__title">Gestión de Usuarios</h1>
      <table class="user-management__table">
        <thead>
          <tr>
            <th scope="col">Avatar</th>
            <th scope="col">Usuario</th>
            <th scope="col">Correo</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in adminStore.usersList" :key="user.id">
            <td>img</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span
                class="user-management__badge user-management__badge--active"
                >PERMITIDO</span
              >
            </td>
            <td><button class="user-management__btn">RESTRINGIR</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  </AdminLayout>
</template>
