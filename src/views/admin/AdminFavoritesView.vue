<!-- Vista favoritos de usuarios -->
<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'

const favorites = [
  { id: 1, user: 'NeonExplorer_01', game: 'Quantum Strike', genre: 'SHOOTER', description: 'Mi shooter favorito. Los gráficos son brutales.', rating: 4, date: '2026-06-01' },
  { id: 2, user: 'PixelRaider', game: 'Neon Odyssey', genre: 'RPG', description: 'La narrativa cyberpunk es increíble, horas de juego.', rating: 5, date: '2026-06-02' },
  { id: 3, user: 'CyberWitch_99', game: 'Void Protocol', genre: 'ESTRATEGIA', description: 'El mejor juego de estrategia espacial gratis.', rating: 4, date: '2026-06-03' },
  { id: 4, user: 'VoidHunter_X', game: 'Inferno Rush', genre: 'SHOOTER', description: 'Roguelite adictivo, siempre una partida más.', rating: 5, date: '2026-06-03' },
]
</script>

<template>
  <AdminLayout>
    <section class="admin-favorites">
      <h1 class="admin-favorites__title">Favoritos de usuarios</h1>

      <div class="admin-favorites__table-wrapper">
        <div class="admin-favorites__toolbar">
          <span class="section-label">Todos los favoritos</span>
          
          <label for="favorites-search" class="visually-hidden">Buscar por usuario o juego</label>
          <input
           id="favorites-search"
           type="search" 
           placeholder="Buscar por usuario o juego..." 
           class="admin-favorites__search" />
        </div>

        <table class="admin-favorites__table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Juego</th>
              <th>Género</th>
              <th>Descripción</th>
              <th>Valoración</th>
              <th>Fecha</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fav in favorites" :key="fav.id">
              <td><div class="admin-favorites__avatar"></div> {{ fav.user }}</td>
              <td>{{ fav.game }}</td>
              <td><span class="badge badge--action">{{ fav.genre }}</span></td>
              <td>{{ fav.description }}</td>
              <td>{{ '★'.repeat(fav.rating) }}{{ '☆'.repeat(5 - fav.rating) }}</td>
              <td>{{ fav.date }}</td>
              <td><button class="admin-favorites__remove">ELIMINAR</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </AdminLayout>
</template>