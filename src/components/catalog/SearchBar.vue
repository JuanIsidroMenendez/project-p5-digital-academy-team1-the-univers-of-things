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
 <!-- AÑADIDO PARA ARREGLAR LA UBICACIÓN DE LOS FILTROS POR CATEGORÍA QUE PASAN AQUÍ, A BARRA BÚSQUEDA -->
    <div class="search-bar__filters">

      <div class="search-bar__divider"></div>

      <label for="genre-filter" class="visually-hidden">Filtrar por género</label>
      <select
        id="genre-filter"
        class="search-bar__select"
        :value="selectedGenre"
        @change="$emit('update:selectedGenre', $event.target.value)"
      >
        <option value="">Género: Todos</option>
        <option v-for="genre in genres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>

      <label for="platform-filter" class="visually-hidden">Filtrar por plataforma</label>
      <select
        id="platform-filter"
        class="search-bar__select"
        :value="selectedPlatform"
        @change="$emit('update:selectedPlatform', $event.target.value)"
      >
        <option value="">Plataforma: Todas</option>
        <option v-for="platform in platforms" :key="platform" :value="platform">
          {{ platform }}
        </option>
      </select>

    </div>
   
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
   genres: {
    type: Array,
    default: () => []
  },
  platforms: {
    type: Array,
    default: () => []
  },
  selectedGenre: {
    type: String,
    default: ''
  },
  selectedPlatform: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue', 
'update:selectedGenre',
'update:selectedPlatform'])

</script>

<style scoped>
</style>