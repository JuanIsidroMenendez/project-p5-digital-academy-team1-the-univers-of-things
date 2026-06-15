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

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;
@use '@/assets/styles/base/mixins' as *;

.register-view {
  min-height: 80vh;
  @include flex-center;
  padding: var(--space-6);

  &__card {
    width: min(100%, 480px);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-8);
  }

  &__header {
    margin-bottom: var(--space-8);
    text-align: center;
  }

  &__title {
    color: var(--color-text);
    font-size: 1.8rem;
    margin-bottom: var(--space-2);
  }

  &__subtitle {
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }

  &__footer {
    margin-top: var(--space-6);
    text-align: center;
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }

  &__link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>