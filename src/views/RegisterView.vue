<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<template>
  <MainLayout>
    <div class="register-view">
      <div class="register-view__card">
        <header class="register-view__header">
          <h1 class="register-view__title">Crear cuenta</h1>
          <p class="register-view__subtitle">
            Únete a FPS y guarda tus juegos favoritos
          </p>
        </header>

        <RegisterForm />

        <footer class="register-view__footer">
          <p>
            ¿Ya tienes cuenta?
            <RouterLink to="/login" class="register-view__link">
              Inicia sesión
            </RouterLink>
          </p>
        </footer>
      </div>
    </div>
  </MainLayout>
</template>

