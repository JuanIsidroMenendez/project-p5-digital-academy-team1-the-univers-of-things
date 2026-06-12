<template>
  <article class="game-card" :aria-label="game.title">

    <div class="game-card__thumb">
      <img
        :src="game.thumbnail"
        :alt="game.title"
        class="game-card__thumb-img"
      />
    </div>

    <div class="game-card__info">

      <div class="game-card__header">
        <h2 class="game-card__title">{{ game.title }}</h2>
        <span class="game-card__genre-badge">{{ game.genre }}</span>
      </div>

      <p class="game-card__desc">{{ game.short_description }}</p>

      <div class="game-card__meta">
        <span class="game-card__platform-tag">{{ game.platform }}</span>
        <span class="game-card__free-tag">FREE</span>
      </div>

    </div>

  </article>
</template>

<script setup>
defineProps({
  game: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
</style>
