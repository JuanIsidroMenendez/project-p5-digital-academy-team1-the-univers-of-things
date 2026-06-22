<!-- Vista perfil de admin: cambio de avatar y contraseña -->
<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { ref } from 'vue'

const selectedAvatar = ref(null)
const newPassword = ref('')
const confirmPassword = ref('')

const avatarOptions = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }))
</script>

<template>
  <AdminLayout>
    <section class="admin-profile">
      <h1 class="admin-profile__title">Perfil de Admin</h1>

      <div class="admin-profile__content">
        <!-- Columna izquierda: avatar -->
        <div class="admin-profile__left">
          <div class="admin-profile__avatar"></div>
          <p class="admin-profile__name">AdminRoot</p>
          <p class="admin-profile__email">admin@admin.com</p>

          <div class="admin-profile__avatars">
            <div
              v-for="av in avatarOptions"
              :key="av.id"
              class="admin-profile__avatar-option"
              :class="{ 'admin-profile__avatar-option--active': selectedAvatar === av.id }"
              @click="selectedAvatar = av.id"
            ></div>
          </div>

          <button class="btn btn--primary admin-profile__btn-sm">Subir avatar</button>
        </div>

        <!-- Columna derecha: contraseña -->
        <div class="admin-profile__right">
          <span class="admin-profile__label">Cambiar contraseña</span>
          <label for="new-password" class="visually-hidden">Nueva contraseña</label>
          <input
            id="new-password"
            v-model="newPassword"
            type="password"
            placeholder="Nueva contraseña"
            class="admin-profile__input"
            aria-describedby="new-password-hint"
          />
          <span id="new-password-hint" class="visually-hidden">Introduce tu nueva contraseña</span>

          <label for="confirm-password" class="visually-hidden">Confirmar contraseña</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            class="admin-profile__input"
            aria-describedby="confirm-password-hint"
          />
          <span id="confirm-password-hint" class="visually-hidden">Repite tu nueva contraseña para confirmarla</span>
          <button class="admin-profile__btn-update">Actualizar contraseña</button>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>