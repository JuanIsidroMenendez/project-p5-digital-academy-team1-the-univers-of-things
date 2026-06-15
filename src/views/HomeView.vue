<!-- Vista principal: hero, bento destacados, catalogo con paginacion -->
<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import HomeFeaturedSection from '@/components/home/HomeFeaturedSection.vue'
import HomeCatalogSection from '@/components/home/HomeCatalogSection.vue'
</script>

<template>
    <MainLayout>
        <HeroSection />
        <HomeFeaturedSection />
        <HomeCatalogSection />
    </MainLayout>
</template>