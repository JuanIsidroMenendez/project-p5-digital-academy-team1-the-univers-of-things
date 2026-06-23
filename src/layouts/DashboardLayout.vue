<!-- Layout privado: sidebar + header dashboard + slot + footer privado -->
<script setup>
import DashboardHeader from '@/components/layout/DashboardHeader.vue'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppAurora from '@/components/layout/AppAurora.vue'
</script>

<template>
    <div class="dashboard-layout">
        <AppAurora />
        <DashboardHeader />
        <div class="dashboard-layout__body">
            <DashboardSidebar />
            <main class="dashboard-layout__content">
                <slot />
            </main>
        </div>
        <AppFooter />
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.dashboard-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    &__body {
        display: flex;
        flex: 1;
        align-items: flex-start;
        min-height: 0;
        overflow: hidden;
    }

    &__content {
        flex: 1;
        min-width: 0;
        overflow-y: auto;
        height: calc(100vh - 56px);
        padding: 2rem 1rem;

        @media (min-width: $bp-tablet) {
            height: calc(100vh - 64px);
            padding: 2.5rem 2rem;
        }

        @media (min-width: $bp-desktop) {
            height: calc(100vh - 72px);
            padding: 3rem 4rem;
        }
    }
}
</style>