<script setup>
import { ref } from 'vue'

const props = defineProps({
  rating: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['rating-change'])

// Estrella sobre la que está el ratón en este momento (null si no hay hover)
const hoverRating = ref(null)

function selectRating(value) {
  emit('rating-change', value)
}

// Determina si una estrella concreta debe verse llena:
// prioriza el hover si existe, si no usa la valoración guardada
function isFilled(starIndex) {
  const activeRating = hoverRating.value ?? props.rating
  return starIndex <= activeRating
}

// 🔵 REFACTOR: extrae la lógica de pluralización del aria-label,
// que antes estaba mezclada directamente en el template
function getStarLabel(starIndex) {
  const word = starIndex === 1 ? 'estrella' : 'estrellas'
  return `Valorar con ${starIndex} ${word}`
}
</script>

<template>
  <div class="star-rating" role="radiogroup" aria-label="Valoración del juego">
    <button
      v-for="(star, index) in 5"
      :key="index"
      type="button"
      class="star-rating__star"
      :class="{ 'star-rating__star--filled': isFilled(index + 1) }"
      :aria-label="getStarLabel(index + 1)"
      role="radio"
      :aria-checked="props.rating === index + 1"
      @click="selectRating(index + 1)"
      @mouseenter="hoverRating = index + 1"
      @mouseleave="hoverRating = null"
    >
      ★
    </button>
  </div>
</template>