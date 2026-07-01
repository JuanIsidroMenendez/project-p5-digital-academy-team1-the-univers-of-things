<script setup>
import { onMounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import FeaturedHero from '@/components/featured/FeaturedHero.vue'
import FeaturedGrid from '@/components/featured/FeaturedGrid.vue'
import FeaturedMonthly from '@/components/featured/FeaturedMonthly.vue'
import { useFeaturedStore } from '@/stores/featured-store.js'

const featuredStore = useFeaturedStore()

onMounted(async () => {
  try {
    await featuredStore.fetchAll()
  } catch {
    console.warn('No se pudieron cargar los juegos destacados')
  }
})
</script>
<template>
    <MainLayout>
        <FeaturedHero></FeaturedHero>
        <FeaturedMonthly></FeaturedMonthly>
        <h3 class="section-label">Todos los destacados</h3>
        <FeaturedGrid></FeaturedGrid>

    </MainLayout>
    </template>
<style lang="scss">

</style>




