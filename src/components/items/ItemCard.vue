<template>
  <article
    class="card"
    :aria-label="game.title"
    @click="goToDetail(game.id)"
  >
    <!-- ↓↓↓ NIEVES: añadido @click para navegar al detalle del juego ↓↓↓ -->

    <div class="card__thumb">
      <img
        :src="game.thumbnail"
        :alt="game.title"
        class="card__thumb-bg"
      />
    </div>

    <div class="card__body">

      <div class="card__header">
        <h2 class="card__title">{{ game.title }}</h2>
      </div>

      <p class="card__description">{{ game.short_description }}</p>

      <div class="card__meta">
        <span class="badge badge--action">{{ game.genre }}</span>
        <span class="badge badge--platform">{{ game.platform }}</span>
        <span class="badge badge--free">FREE</span>
      </div>

    </div>

    <!-- ↑↑↑ NIEVES: fin de cambios ↑↑↑ -->
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  game: {
    type: Object,
    required: true
  }
})

// NIEVES: añadido useRouter para navegar al detalle al hacer clic en la tarjeta
const router = useRouter()

function goToDetail(id) {
  router.push({ name: 'game-detail', params: { id } })
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>