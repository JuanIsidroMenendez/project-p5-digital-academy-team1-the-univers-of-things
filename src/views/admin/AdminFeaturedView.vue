<!-- Vista gestion de destacados: juego del mes y lista de destacados -->
<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const games = [
  { id: 1, title: 'Neon Odyssey', genre: 'RPG', active: true },
  { id: 2, title: 'Quantum Strike', genre: 'SHOOTER', active: false },
  { id: 3, title: 'Inferno Rush', genre: 'SHOOTER', active: false },
  { id: 4, title: 'Data Breach', genre: 'RPG', active: false },
]

const featured = [
  { id: 1, title: 'Neon Odyssey', genre: 'RPG' },
  { id: 2, title: 'Chrome Rebellion', genre: 'ACCIÓN' },
]
</script>

<template>
  <DashboardLayout>
    <section class="admin-featured">
      <h1 class="admin-featured__title">Gestión de destacados</h1>

      <div class="admin-featured__section">
        <span class="section-label">Juego del mes</span>
        <p class="admin-featured__hint">El juego del mes aparece destacado en el hero de la homepage. Selecciona cuál mostrar:</p>
        <div class="admin-featured__grid">
          <div v-for="game in games" :key="game.id" class="admin-featured__card" :class="{ 'admin-featured__card--active': game.active }">
            <span v-if="game.active" class="admin-featured__active-badge">ACTIVO</span>
            <div class="admin-featured__thumb"></div>
            <p class="admin-featured__card-title">{{ game.title }}</p>
          </div>
        </div>
      </div>

      <div class="admin-featured__section">
        <span class="section-label">Activos ahora</span>
        <div class="admin-featured__active-list">
          <div v-for="game in featured" :key="game.id" class="admin-featured__active-card">
            <div class="admin-featured__active-thumb"></div>
            <p class="admin-featured__active-title">{{ game.title }}</p>
            <span class="badge badge--action">{{ game.genre }}</span>
            <button class="admin-featured__remove">QUITAR</button>
          </div>
        </div>
      </div>
    </section>
  </DashboardLayout>
</template>