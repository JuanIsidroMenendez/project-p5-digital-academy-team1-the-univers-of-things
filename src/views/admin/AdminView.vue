<!-- Vista dashboard admin: gestion usuarios + destacados -->
<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const users = [
  { id: 1, name: 'NeonExplorer_01', email: 'explorer@fps.io', status: 'permitido' },
  { id: 2, name: 'VoidHunter_X', email: 'void@fps.io', status: 'restringido' },
  { id: 3, name: 'PixelRaider', email: 'pixel@fps.io', status: 'permitido' },
  { id: 4, name: 'CyberWitch_99', email: 'witch@fps.io', status: 'permitido' },
]
</script>

<template>
  <DashboardLayout>
    <section class="admin-users">
      <h1 class="admin-users__title">Gestión de usuarios</h1>

      <div class="admin-users__table-wrapper">
        <div class="admin-users__toolbar">
          <span class="section-label">Todos los usuarios</span>
          <input type="search" placeholder="Buscar usuario..." class="admin-users__search" />
        </div>

        <table class="admin-users__table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td><div class="admin-users__avatar"></div></td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="['admin-users__status', `admin-users__status--${user.status}`]">
                  {{ user.status }}
                </span>
              </td>
              <td>
                <button class="admin-users__action">
                  {{ user.status === 'permitido' ? 'Restringir' : 'Permitir' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </DashboardLayout>
</template>