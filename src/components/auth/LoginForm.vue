<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { isValidEmail, isNotEmpty } from '@/utils/form-validators'
import { loginUser } from '@/services/auth-service'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const isLoading = ref(false)

function validateEmail() {
  if (!isNotEmpty(form.email)) {
    errors.email = 'El correo electrónico es obligatorio'
    return false
  }
  if (!isValidEmail(form.email)) {
    errors.email = 'Introduce un correo electrónico válido'
    return false
  }
  errors.email = ''
  return true
}

function validatePassword() {
  if (!isNotEmpty(form.password)) {
    errors.password = 'La contraseña es obligatoria'
    return false
  }
  errors.password = ''
  return true
}

function validateForm() {
  const results = [
    validateEmail(),
    validatePassword()
  ]
  return results.every(Boolean)
}

async function handleSubmit() {
  errors.general = ''
  if (!validateForm()) return

  isLoading.value = true

  try {
    console.log('Login pendiente de auth-service:', form.email)
    await router.push('/dashboard')
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      errors.general = 'Correo o contraseña incorrectos'
    } else if (error.code === 'auth/access-restricted') {
      errors.general = 'Tu acceso ha sido restringido. Contacta con el administrador.'
    } else {
      errors.general = 'Ha ocurrido un error. Inténtalo de nuevo.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="login-form" novalidate @submit.prevent="handleSubmit">

    <p v-if="errors.general" class="login-form__error-general" role="alert">
      {{ errors.general }}
    </p>

    <div class="login-form__field">
      <label for="email" class="login-form__label">
        Correo electrónico
      </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="login-form__input"
        :class="{ 'login-form__input--error': errors.email }"
        autocomplete="email"
        placeholder="tu@email.com"
        @blur="validateEmail"
      />
      <span v-if="errors.email" class="login-form__field-error" role="alert">
        {{ errors.email }}
      </span>
    </div>

    <div class="login-form__field">
      <label for="password" class="login-form__label">
        Contraseña
      </label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        class="login-form__input"
        :class="{ 'login-form__input--error': errors.password }"
        autocomplete="current-password"
        placeholder="••••••••••"
        @blur="validatePassword"
      />
      <span v-if="errors.password" class="login-form__field-error" role="alert">
        {{ errors.password }}
      </span>
    </div>

    <button type="submit" class="login-form__submit" :disabled="isLoading">
      {{ isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
    </button>

  </form>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  &__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  &__label {
    color: var(--color-text);
    font-size: 0.9rem;
    font-weight: 600;
  }

  &__input {
    padding: var(--space-3) var(--space-4);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    font-size: 0.9rem;
    transition: border-color var(--transition);

    &::placeholder {
      color: var(--color-text-muted);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &--error {
      border-color: var(--color-danger);
    }
  }

  &__field-error {
    color: var(--color-danger);
    font-size: 0.8rem;
  }

  &__error-general {
    color: var(--color-danger);
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid var(--color-danger);
    border-radius: var(--radius-sm);
    padding: var(--space-3) var(--space-4);
    font-size: 0.9rem;
  }

  &__submit {
    margin-top: var(--space-2);
    padding: var(--space-3) var(--space-6);
    background: var(--color-primary);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity var(--transition);

    &:hover:not(:disabled) {
      opacity: 0.85;
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>