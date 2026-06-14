<!-- Vista catalogo completo: busqueda, filtros y paginacion -->
<template>
  <main class="catalog-view">

    <section class="catalog-view__hero">
      <h1 class="catalog-view__title">El Catálogo</h1>
      <p class="catalog-view__subtitle">
        Explora nuestra colección completa de juegos gratuitos.
      </p>
    </section>

    <section class="catalog-view__content">
      <!-- BARRA DE BÚSQUEDA DESPUÉS DE LOGIN -->

      <div class="catalog-view__grid">  
        <ItemCard
            v-for="(game, index) in games"
            :key="game.id ?? index"
            :game="game"
            />
      </div>

      <!-- PAGINACIÓN PENDIENTE -->
    </section>

  </main>
  <AppFooter />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ItemCard from '@/components/items/ItemCard.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { getGames } from '@/services/games-api.js';

const games = ref([])

onMounted(async () => {
  games.value = await getGames()
})
</script>

<style scoped>
</style>