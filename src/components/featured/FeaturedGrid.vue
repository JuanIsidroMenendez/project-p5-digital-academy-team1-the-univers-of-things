<script setup>
import ItemCard from "@/components/items/ItemCard.vue";
import { getGames } from '@/services/games-api.js'
import { ref, onMounted} from 'vue'

const games = ref([]);

onMounted(async () => {
    try {
        games.value = (await getGames()).slice(0, 6)
    } catch (e) {
        console.error(e)
    }
})
</script>

<template>
  <div class="featured-grid">
    <ItemCard
      v-for="game in games"
      :key="game.id"
      :game="game"
      :featured="game.featured"
    />
  </div>
</template>
