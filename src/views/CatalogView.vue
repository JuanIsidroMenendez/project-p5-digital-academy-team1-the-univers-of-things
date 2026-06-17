<!-- Vista catalogo completo: busqueda, filtros y paginacion -->
<template>

  <MainLayout>
  
    <section class="catalog-view__hero">
      <h1 class="catalog-view__title">El Catálogo</h1>
      <p class="catalog-view__subtitle">
        Explora nuestra colección completa de juegos gratuitos.
      </p>
    </section>

    <section class="catalog-view__content">

      <SearchBar v-model="searchText"/>

      <div v-if="isLoading" class="catalog-view__loading">
        Cargando juegos...
      </div>

      <div v-else-if="error" class="catalog-view__error">
        {{ error }}
      </div>
      
      <div v-else-if="filteredGames.length === 0" class="catalog-view__empty">
        No se han encontrado resultados
      </div>

      <div v-else class="catalog-view__grid">
        <ItemCard
            v-for="(game, index) in filteredGames"
            :key="game.id ?? index"
            :game="game"
            />
      </div>

      <!-- Aquí irá la paginación -->
    </section>

   </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ItemCard from '@/components/items/ItemCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { getGames } from '@/services/games-api.js';
import SearchBar from '@/components/catalog/SearchBar.vue';

const games = ref([])
const isLoading = ref(false)
const error = ref(null)
const searchText = ref('')

const filteredGames = computed(() => {
  if (!searchText.value) return games.value
  return games.value.filter(game =>
    game.title.toLowerCase().includes(searchText.value.toLowerCase())
  )
  const genres = computed(() => {
  const allGenres = games.value.map(game => game.genre)
  return [...new Set(allGenres)].sort()
})

})

onMounted(async () => {
  isLoading.value = true
  try {
    games.value = await getGames()
  } catch (e) {
    error.value = 'Error al cargar los juegos. Inténtalo de nuevo más tarde.'
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
</style>