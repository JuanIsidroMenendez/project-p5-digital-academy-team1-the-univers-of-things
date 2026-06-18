<script setup>
import { useFeaturedStore } from '@/stores/featured-store.js'
import { computed } from 'vue'


const featuredStore = useFeaturedStore()

const gameMonth = computed(() => featuredStore.gameOfTheMonth)

</script>




<template>
  <div class="featured-monthly" v-if="gameMonth">
    <span class="featured-monthly__tag">• DESTACADO DEL MES</span>
    <h1 class="featured-monthly__title">{{ gameMonth.title }}</h1>
    <p class="featured-monthly__descripcion">{{ gameMonth.short_description }}</p>
    <img :src="gameMonth.thumbnail" />
  </div>
</template>
