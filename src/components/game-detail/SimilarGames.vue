<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

// COORDINACIÓN CON JUAN: importar cuando use-games.js esté disponible
// import { useGames } from '@/composables/use-games'

const props = defineProps({
  genre: {
    type: String,
    required: true
  },
  currentGameId: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const similarGames = ref([])
const isLoading = ref(false)

async function fetchSimilar() {
  isLoading.value = true
  try {
    // CUANDO use-games.js esté listo, sustituir por:
    // const { getGames } = useGames()
    // const allGames = await getGames()
    // similarGames.value = allGames
    //   .filter(g => g.genre === props.genre && g.id !== props.currentGameId)
    //   .slice(0, 4)

    // Mock temporal: array vacío hasta que la API esté disponible
    similarGames.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchSimilar)

// Re-carga cuando el usuario navega a otro juego
watch(() => props.currentGameId, fetchSimilar)

function goToDetail(gameId) {
  router.push({ name: 'game-detail', params: { id: gameId } })
}
</script>

<template>
  <section
    v-if="similarGames.length"
    class="similar-games"
    aria-labelledby="similar-heading"
  >
    <h2 id="similar-heading" class="similar-games__title">
      Juegos similares
    </h2>

    <ul class="similar-games__grid">
      <li
        v-for="game in similarGames"
        :key="game.id"
        class="similar-games__item"
      >
        <button
          class="similar-games__card"
          type="button"
          :aria-label="`Ver detalle de ${game.title}`"
          @click="goToDetail(game.id)"
        >
          <img
            :src="game.thumbnail"
            :alt="game.title"
            class="similar-games__img"
            loading="lazy"
          />
          <p class="similar-games__name">{{ game.title }}</p>
        </button>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;
@use '@/assets/styles/base/mixins' as *;

.similar-games {
  margin-bottom: var(--space-8);

  &__title {
    color: var(--color-secondary);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-4);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
    list-style: none;
    padding: 0;
    margin: 0;

    @include respond-to(tablet) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__card {
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    border-radius: var(--radius-sm);
    overflow: hidden;
    transition: transform var(--transition);

    &:hover {
      transform: translateY(-3px);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &__img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: var(--radius-sm);
    display: block;
  }

  &__name {
    color: var(--color-text);
    font-size: 0.85rem;
    margin: var(--space-1) 0 0;
    padding: 0 var(--space-1);
  }
}
</style>