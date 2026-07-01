<!-- Controles de filtrado: selector de género y plataforma -->
<template>
  <div class="filter-controls">

    <div class="filter-controls__select-wrap">
      <label for="genre-filter" class="visually-hidden">
        Filtrar por género
      </label>
      <select
        id="genre-filter"
        class="filter-controls__select"
        :value="selectedGenre"
        @change="$emit('update:selectedGenre', $event.target.value)"
      >
        <option value="">Género: Todos</option>
        <option
          v-for="genre in genres"
          :key="genre"
          :value="genre"
        >
          {{ genre }}
        </option>
      </select>
    </div>

    <div class="filter-controls__select-wrap">
      <label for="platform-filter" class="visually-hidden">
        Filtrar por plataforma
      </label>
      <select
        id="platform-filter"
        class="filter-controls__select"
        :value="selectedPlatform"
        @change="$emit('update:selectedPlatform', $event.target.value)"
      >
        <option value="">Plataforma: Todas</option>
        <option
          v-for="platform in platforms"
          :key="platform"
          :value="platform"
        >
          {{ platform }}
        </option>
      </select>
    </div>

  </div>
</template>

<script setup>
defineProps({
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

defineEmits(['update:selectedGenre', 'update:selectedPlatform'])
</script>

<style scoped>
</style>