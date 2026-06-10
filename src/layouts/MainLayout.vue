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

<style lang="scss" scoped>
@use '../assets/styles/base/variables' as *;

/* Layout publico: ocupa toda la altura, contenido flexible */

.main-layout {
    position: relative;
    min-height: calc(100vh - 64px - 56px);
    z-index: 1;
    flex: 1;
}
</style>