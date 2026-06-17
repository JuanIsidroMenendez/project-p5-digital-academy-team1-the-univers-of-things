<!-- Barra de búsqueda: filtra juegos por nombre en tiempo real -->
<template>
  <div class="search-bar">

    <div class="search-bar__input-wrap">
      <svg
        class="search-bar__icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>

      <label for="game-search" class="visually-hidden">
        Buscar juego por nombre
      </label>

      <input
        id="game-search"
        type="search"
        class="search-bar__input"
        placeholder="Buscar juego..."
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>

  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>