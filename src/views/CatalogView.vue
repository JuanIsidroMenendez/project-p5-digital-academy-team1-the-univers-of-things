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

      <SearchBar
       v-model="searchText"
       :genres="genres"
       :platforms="platforms"
       :selected-genre="selectedGenre"
       :selected-platform="selectedPlatform"
       @update:selectedGenre="selectedGenre = $event"
       @update:selectedPlatform="selectedPlatform = $event"
       />

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
          v-for="(game, index) in paginatedGames"
          :key="game.id ?? index"
          :game="game"
        />
      </div>
      <AppPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </section>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import ItemCard from "@/components/items/ItemCard.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import AppPagination from "@/components/layout/AppPagination.vue"; // Reutilizamos el mismo componente de la Home
//import { getGames } from "@/services/games-api.js"; //Al desactivar este import, el juego ya no se coge de la API.
import { useGamesStore } from '@/stores/games-store';

import {
  filterByText,
  filterByGenre,
  paginateGames,
} from "@/utils/catalog-utils";

//const games = ref([]);
//const isLoading = ref(false);
//const error = ref(null);

const gamesStore = useGamesStore()
const searchText = ref("");
const selectedGenre = ref("");
const selectedPlatform = ref("");
const currentPage = ref(1);
const gamesPerPage = 10; // Mismo tamaño de página que en la Home, para mantener consistencia

const filteredGames = computed(() => {
  //let result = filterByText(games.value, searchText.value);
  let result = filterByText(gamesStore.games, searchText.value)
  result = filterByGenre(result, selectedGenre.value);
  if (selectedPlatform.value) {
    result = result.filter((game) =>
      game.platform
        .toLowerCase()
        .includes(selectedPlatform.value.toLowerCase()),
    );
  }
  return result;
});

// Numero total de paginas en funcion de los resultados ya filtrados
const totalPages = computed(() =>
  Math.ceil(filteredGames.value.length / gamesPerPage),
);

// Recorte de la lista filtrada segun la pagina actual
const paginatedGames = computed(() =>
  paginateGames(filteredGames.value, currentPage.value, gamesPerPage),
);

const genres = computed(() => {
  //const allGenres = games.value.map((game) => game.genre);
  const allGenres = gamesStore.games.map(game => game.genre)
  return [...new Set(allGenres)].sort();
});

const platforms = computed(() => {
  //const allPlatforms = games.value.map((game) => game.platform);
  const allPlatforms = gamesStore.games.map(game => game.platform)
  return [...new Set(allPlatforms)].sort();
});

watch([searchText, selectedGenre, selectedPlatform], () => {
  currentPage.value = 1;
});

// Manejador del evento que emite AppPagination al cambiar de pagina
function handlePageChange(page) {
  currentPage.value = page;
}

onMounted(async () => {
  await gamesStore.fetchGames()
 // isLoading.value = true;
  //try {
    //games.value = await getGames();
  //} catch (e) {
  //  error.value = "Error al cargar los juegos. Inténtalo de nuevo más tarde.";
 // } finally {
    //isLoading.value = false;
 // }
});
</script>

<style scoped></style>
