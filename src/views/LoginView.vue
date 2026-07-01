<!-- Vista login: formulario de acceso con email, contraseña y acceso admin -->
<template>
  <MainLayout>

    <div class="login-view">

      <div class="login-view__card">

        <!-- Logo -->
        <div class="login-view__logo">
          <div class="login-view__logo-icon">FPS</div>
          <span class="login-view__logo-text">FPS</span>
          <span class="login-view__subtitle">Accede a tu cuenta</span>
        </div>

        <LoginForm />
       

        <!-- Enlace a registro -->
        <div class="login-view__register">
          ¿No tienes cuenta?
          <RouterLink to="/register">Regístrate</RouterLink>
        </div>
      </div>
    </div>

  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<style scoped>
</style>
