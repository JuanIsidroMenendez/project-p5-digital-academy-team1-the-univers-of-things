<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFavoritesStore } from '@/stores/favorites-store'

// defineProps debe ir ANTES de usar "props" en cualquier computed o función
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

function handleClick() {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  if (!isFavorite.value) {
    favoritesStore.addToFavorites(props.game)
  }
  // La eliminación se añadirá en US23
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
}
</style>