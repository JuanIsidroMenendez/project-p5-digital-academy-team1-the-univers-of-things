<!-- Vista detalle de juego: banner, stats, capturas y juegos similares -->

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getGameById } from '@/services/games-api'

import GameScreenshots from '@/components/game-detail/GameScreenshots.vue'
import SimilarGames from '@/components/game-detail/SimilarGames.vue'
import AddToFavoritesButton from '@/components/game-detail/AddToFavoritesButton.vue'

const route = useRoute()
const router = useRouter()

const game = ref(null)
const isLoading = ref(false)
const hasError = ref(false)

async function fetchGame(id) {
  isLoading.value = true
  hasError.value = false
  game.value = null

  try {
    game.value = await getGameById(id)
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => fetchGame(route.params.id))

// Re-carga cuando el usuario navega entre detalles
watch(() => route.params.id, (newId) => {
  if (newId) fetchGame(newId)
})
</script>

<template>
  <main class="game-detail">

    <!-- Estado de carga -->
    <div v-if="isLoading" class="game-detail__skeleton">
      <p role="status" class="visually-hidden">Cargando información del juego...</p>
      <div class="game-detail__skeleton-banner" aria-hidden="true"></div>
      <div class="game-detail__skeleton-body" aria-hidden="true"></div>
    </div>

    <!-- Estado de error -->
    <div v-else-if="hasError" class="game-detail__error" role="alert">
      <p>No se ha podido cargar el juego. Inténtalo de nuevo.</p>
      <button
        class="game-detail__retry"
        type="button"
        @click="fetchGame(route.params.id)"
      >
        Reintentar
      </button>
    </div>

    <!-- Contenido del juego -->
    <template v-else-if="game">

      <!-- Breadcrumb -->
      <nav class="game-detail__breadcrumb" aria-label="Ruta de navegación">
        <ol class="game-detail__breadcrumb-list">
          <li class="game-detail__breadcrumb-item">
            <RouterLink to="/" class="game-detail__breadcrumb-link">INICIO</RouterLink>
          </li>
          <li class="game-detail__breadcrumb-item">
            <RouterLink to="/catalog" class="game-detail__breadcrumb-link">CATÁLOGO</RouterLink>
          </li>
          <li class="game-detail__breadcrumb-item">
            <span class="game-detail__breadcrumb-current" aria-current="page">
              {{ game.title.toUpperCase() }}
            </span>
          </li>
        </ol>
      </nav>

      <!-- Banner -->
      <div class="game-detail__banner">
        <img
          :src="game.thumbnail"
          :alt="`Imagen principal de ${game.title}`"
          class="game-detail__banner-img"
        />
      </div>

      <article class="game-detail__content">

        <header class="game-detail__header">
          <h1 class="game-detail__title">{{ game.title }}</h1>
          <div class="game-detail__tags" aria-label="Género y plataforma">
            <span class="game-detail__badge">{{ game.genre }}</span>
            <span class="game-detail__badge game-detail__badge--platform">
              {{ game.platform }}
            </span>
          </div>
        </header>

        <div class="game-detail__grid">

          <section class="game-detail__description" aria-labelledby="description-heading">
            <h2 id="description-heading" class="game-detail__section-title">
              Descripción
            </h2>
            <p class="game-detail__description-text">{{ game.description }}</p>
            <AddToFavoritesButton :game="game" />
          </section>

          <aside class="game-detail__stats" aria-labelledby="info-heading">
            <h2 id="info-heading" class="game-detail__section-title">Información</h2>
            <dl class="game-detail__info-list">
              <div class="game-detail__info-item">
                <dt class="game-detail__info-label">Desarrollador</dt>
                <dd class="game-detail__info-value">{{ game.developer }}</dd>
              </div>
              <div class="game-detail__info-item">
                <dt class="game-detail__info-label">Editor</dt>
                <dd class="game-detail__info-value">{{ game.publisher }}</dd>
              </div>
              <div class="game-detail__info-item">
                <dt class="game-detail__info-label">Fecha de lanzamiento</dt>
                <dd class="game-detail__info-value">{{ game.release_date }}</dd>
              </div>
              <div class="game-detail__info-item">
                <dt class="game-detail__info-label">Plataforma</dt>
                <dd class="game-detail__info-value">{{ game.platform }}</dd>
              </div>
            </dl>
          </aside>

        </div>

        <GameScreenshots
          v-if="game.screenshots && game.screenshots.length"
          :screenshots="game.screenshots"
          :game-title="game.title"
        />

        <SimilarGames
          :genre="game.genre"
          :current-game-id="game.id"
        />

      </article>
    </template>
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;
@use '@/assets/styles/base/mixins' as *;

.game-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6);

  &__skeleton {
    &-banner {
      width: 100%;
      aspect-ratio: 16 / 5;
      background: rgba(255, 255, 255, 0.06);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-6);
      animation: skeleton-pulse 1.5s ease-in-out infinite;
    }

    &-body {
      height: 300px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: var(--radius-md);
      animation: skeleton-pulse 1.5s ease-in-out infinite 0.2s;
    }
  }

  &__error {
    text-align: center;
    padding: var(--space-12);
    color: var(--color-text-muted);
  }

  &__retry {
    margin-top: var(--space-4);
    padding: var(--space-3) var(--space-6);
    background: var(--color-primary);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &__breadcrumb {
    margin-bottom: var(--space-6);
  }

  &__breadcrumb-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__breadcrumb-item {
    display: flex;
    align-items: center;

    &:not(:first-child)::before {
      content: '/';
      color: var(--color-text-muted);
      font-size: 0.8rem;
      margin: 0 var(--space-2);
    }
  }

  &__breadcrumb-link {
    color: var(--color-text-muted);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;

    &:hover {
      color: var(--color-primary);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  &__breadcrumb-current {
    color: var(--color-text);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  &__banner {
    width: 100%;
    aspect-ratio: 16 / 5;
    overflow: hidden;
    border-radius: var(--radius-md);
    margin-bottom: var(--space-8);
  }

  &__banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__header {
    margin-bottom: var(--space-8);
  }

  &__title {
    color: var(--color-text);
    font-size: 2rem;
    margin-bottom: var(--space-4);
  }

  &__tags {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  &__badge {
    display: inline-block;
    padding: 0.2rem var(--space-3);
    background: var(--color-primary);
    color: #fff;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;

    &--platform {
      background: var(--color-secondary);
      color: #030308;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
    margin-bottom: var(--space-8);

    @include respond-to(desktop) {
      grid-template-columns: 2fr 1fr;
    }
  }

  &__section-title {
    color: var(--color-secondary);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-4);
  }

  &__description-text {
    color: var(--color-text);
    line-height: 1.7;
    margin: 0 0 var(--space-6);
  }

  &__info-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__info-item {
    border-bottom: 1px solid var(--color-border);
    padding-bottom: var(--space-3);

    &:last-child {
      border-bottom: none;
    }
  }

  &__info-label {
    color: var(--color-text-muted);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__info-value {
    color: var(--color-text);
    margin: var(--space-1) 0 0;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>