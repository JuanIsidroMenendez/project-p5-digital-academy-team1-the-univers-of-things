<script setup>
import ItemCard from "@/components/items/ItemCard.vue";
import { computed } from 'vue'
import { useFeaturedStore } from '@/stores/featured-store.js'

const featuredStore = useFeaturedStore()

const featuredList = computed(() => featuredStore.featuredList)


</script>

<template>
  <div class="featured-grid">
    <ItemCard
      v-for="game in featuredList"
      :key="game.id"
      :game="game"
      :featured="game.featured"
    />
  </div>
</template>

<style lang="scss" scoped>

.featured-grid{
  margin-top: 5rem;
}

</style>