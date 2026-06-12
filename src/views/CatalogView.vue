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
      <!-- Aquí irá la barra de búsqueda (ST10) -->

      <div class="catalog-view__grid">  
        <ItemCard
            v-for="(game, index) in games"
            :key="game.id ?? index"
            :game="game"
            />
      </div>



      <!-- Aquí irá la paginación -->
    </section>

  </main>
</template>

<script setup>

import ItemCard from '@/components/items/ItemCard.vue';

const games= []

</script>

<style scoped>
</style>