<script setup>
import { ref, computed, onMounted } from 'vue'
import { getGames } from '@/services/games-api'
import { filterByText } from '@/utils/catalog-utils'

const emit = defineEmits(['select', 'close'])

const allGames = ref([])
const searchText = ref('')
const isLoading = ref(false)

const filteredResults = computed(() => filterByText(allGames.value, searchText.value))

onMounted(async () => {
  isLoading.value = true
  try {
    allGames.value = await getGames()
  } finally {
    isLoading.value = false
  }
})

function handleSelect(game) {
  emit('select', game)
}
</script>

<template>
  <div class="add-favorite-from-list" role="dialog" aria-label="Añadir juego a favoritos">
    <header class="add-favorite-from-list__header">
      <h2 class="add-favorite-from-list__title">Añadir juego a favoritos</h2>
      <button
        type="button"
        class="add-favorite-from-list__close-btn"
        aria-label="Cerrar buscador"
        @click="$emit('close')"
      >
        ✕
      </button>
    </header>

    <input
      v-model="searchText"
      type="text"
      class="add-favorite-from-list__search"
      placeholder="Buscar juego por nombre..."
      aria-label="Buscar juego"
    />

    <p v-if="isLoading" class="add-favorite-from-list__loading">Cargando juegos...</p>

    <ul v-else class="add-favorite-from-list__results">
      <li
        v-for="(game, index) in filteredResults"
        :key="game.id ?? index"
        class="add-favorite-from-list__item"
      >
        <button
          type="button"
          class="add-favorite-from-list__item-btn"
          @click="handleSelect(game)"
        >
          <img
            :src="game.thumbnail"
            :alt="game.title"
            class="add-favorite-from-list__item-thumb"
            loading="lazy"
          />
          <span class="add-favorite-from-list__item-title">{{ game.title }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>