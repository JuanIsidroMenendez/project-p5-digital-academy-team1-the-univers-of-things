<!-- Vista dashboard admin: gestión de usuarios -->
<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
</script>

<template>
  <AdminLayout>
    <div class="admin-users">
      <h1 class="admin-users__title">Gestión de Usuarios</h1>
      <p class="admin-users__subtitle">Administra los usuarios registrados en la plataforma.</p>

      <div class="admin-users__table-wrapper">
        <table class="admin-users__table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AdminRoot</td>
              <td>admin@admin.com</td>
              <td><span class="admin-users__badge admin-users__badge--admin">ADMIN</span></td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>