<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
</script>
<template>
    <MainLayout></MainLayout>
    
    </template>





<style scoped lang="scss">

@use '@/assets/styles/base/variables' as *;
.page-hero-title {
  font-family: $font-display;
  font-weight: 800;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -2px;
  background: linear-gradient(135deg, #e2d9f3 0%, #a855f7 50%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
