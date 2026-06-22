<!-- Vista admin: gestión de usuarios -->
<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { useAdminStore } from "@/stores/admin-store";
import { filterUsers } from "@/utils/user-filters";
import { onMounted, ref, computed } from "vue";

const adminStore = useAdminStore();
onMounted(async () => {
  await adminStore.fetchAllUsers();
});

const searchQuery = ref("");

const filteredUsers = computed(() =>
  filterUsers(adminStore.usersList, searchQuery.value),
);
</script>

<template>
  <AdminLayout>
    <section class="user-management">
      <h1 class="user-management__title">Gestión de Usuarios</h1>
      <label for="user-search" class="visually-hidden">Buscar usuario o email</label>
      <input
        id="user-search"
        v-model="searchQuery"
        placeholder="Introduce usuario o email"
        class="user-management__search"
      />
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
        <TransitionGroup name="list" tag="tbody">
          <tr v-for="user in filteredUsers" :key="user.uid">
            <td>img</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span
                v-if="user.status !== 'restricted'"
                class="user-management__badge user-management__badge--active"
                >PERMITIDO</span
              >
              <span
                v-else
                class="user-management__badge user-management__badge--restricted"
                >RESTRINGIDO</span
              >
            </td>

            <td>
              <button
                v-if="user.status !== 'restricted'"
                class="user-management__btn"
                @click="adminStore.toggleUserAccess(user.uid, user.status)"
              >
                RESTRINGIR
              </button>
              <button
                v-else
                class="user-management__btn user-management__btn--allow"
                @click="adminStore.toggleUserAccess(user.uid, user.status)"
              >
                PERMITIR
              </button>
            </td>
          </tr>
        </TransitionGroup>
      </table>
      <p v-if="filteredUsers.length === 0">No se encontraron resultados</p>
    </section>
  </AdminLayout>
</template>
