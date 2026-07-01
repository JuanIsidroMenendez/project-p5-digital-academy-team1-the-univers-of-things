<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFavoritesStore } from '@/stores/favorites-store'

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isFavorite = computed(() => favoritesStore.isFavorite(props.game.id))

const showSuccessMessage = ref(false)

// 🔵 REFACTOR: extraída la lógica del mensaje temporal en una función
// reutilizable, en vez de repetir el patrón ref + setTimeout inline
const SUCCESS_MESSAGE_DURATION_MS = 2500

function showTemporarySuccessMessage() {
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, SUCCESS_MESSAGE_DURATION_MS)
}

function handleClick() {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  if (!isFavorite.value) {
    favoritesStore.addToFavorites(props.game)
    showTemporarySuccessMessage()
  }
}
</script>

<template>
  <div class="add-to-favorites">

    <!-- Botón activo: usuario con sesión -->
    <button
      v-if="isAuthenticated"
      class="add-to-favorites__btn"
      :class="{ 'add-to-favorites__btn--saved': isFavorite }"
      type="button"
      :aria-label="
        isFavorite
          ? `Quitar ${game.title} de favoritos`
          : `Añadir ${game.title} a favoritos`
      "
      @click="handleClick"
    >
      <span aria-hidden="true">{{ isFavorite ? '❤️' : '🤍' }}</span>
      {{ isFavorite ? 'Guardado en favoritos' : 'Añadir a favoritos' }}
    </button>

    <!-- Botón bloqueado: usuario sin sesión -->
    <button
      v-else
      class="add-to-favorites__btn add-to-favorites__btn--locked"
      type="button"
      aria-label="Inicia sesión para guardar este juego en favoritos"
      @click="handleClick"
    >
      <span aria-hidden="true">🔒</span>
      Inicia sesión para guardar
    </button>

    <!-- Mensaje temporal de confirmación de éxito -->
    <p
      v-if="showSuccessMessage"
      class="add-to-favorites__success"
      role="status"
      aria-live="polite"
    >
      ✓ ¡Añadido a favoritos!
    </p>

  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.add-to-favorites {
  margin-top: var(--space-6);

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-8);
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-primary);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background var(--transition), color var(--transition);

    &:hover {
      background: var(--color-primary);
      color: #fff;
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &--saved {
      background: var(--color-primary);
      color: #fff;
    }

    &--locked {
      border-color: var(--color-border);
      color: var(--color-text-muted);
      opacity: 0.8;

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--color-text);
        border-color: var(--color-border-purple);
      }
    }
  }

  &__success {
    margin-top: var(--space-2);
    color: #4ade80;
    font-size: 0.85rem;
    font-weight: 600;
    animation: fade-in 0.2s ease;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>