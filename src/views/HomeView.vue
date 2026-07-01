<!-- Vista principal: hero, bento destacados, catalogo con paginacion -->
<script setup>
import { onMounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import HomeFeaturedSection from '@/components/home/HomeFeaturedSection.vue'
import HomeCatalogSection from '@/components/home/HomeCatalogSection.vue'
import { useFeaturedStore } from '@/stores/featured-store'

const featuredStore = useFeaturedStore()

onMounted(() => {
    featuredStore.fetchAll()
})
</script>

<template>
    <MainLayout>
        <HeroSection />
        <HomeFeaturedSection />
        <HomeCatalogSection />
    </MainLayout>
</template>