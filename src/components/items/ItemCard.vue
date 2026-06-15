<template>
  <article class="card" :aria-label="game.title">

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