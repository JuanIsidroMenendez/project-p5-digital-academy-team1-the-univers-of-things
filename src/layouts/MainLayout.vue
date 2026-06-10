<!-- Layout publico: AppAurora + TheHeader + slot + TheFooter -->
<script setup>
import AppAurora from '@/components/common/AppAurora.vue'
import TheHeader from '@/components/common/TheHeader.vue'
import TheFooter from '@/components/common/TheFooter.vue'
</script>

<template>
    <div class="main-layout">
        <AppAurora />
        <TheHeader />
        <main class="main-layout__content">
            <slot />
        </main>
        <TheFooter />
    </div>
</template>