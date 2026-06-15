<!-- Vista perfil de admin: cambio de avatar y contraseña -->
<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const avatars = [1, 2, 3, 4, 5, 6, 7, 8]
</script>

<template>
  <DashboardLayout>
    <section class="admin-profile">
      <h1 class="admin-profile__title">Mi Perfil</h1>

      <div class="admin-profile__content">
        <div class="admin-profile__left">
          <div class="admin-profile__avatar"></div>
          <p class="admin-profile__name">AdminRoot</p>
          <p class="admin-profile__email">admin@fps.io</p>

          <span class="section-label">Elige tu avatar</span>
          <div class="admin-profile__avatars">
            <div v-for="n in avatars" :key="n" class="admin-profile__avatar-option"></div>
          </div>

          <button class="btn btn--cta">Subir desde Firebase Storage</button>
        </div>

        <div class="admin-profile__right">
          <span class="section-label">Cambiar contraseña</span>

          <label class="admin-profile__label">Contraseña actual</label>
          <input type="password" class="admin-profile__input" value="*********" />

          <label class="admin-profile__label">Nueva contraseña</label>
          <input type="password" class="admin-profile__input" value="*********" />

          <label class="admin-profile__label">Confirmar nueva contraseña</label>
          <input type="password" class="admin-profile__input" value="*********" />

          <button class="btn btn--cta">Actualizar contraseña</button>
        </div>
      </div>
    </section>
  </DashboardLayout>
</template>