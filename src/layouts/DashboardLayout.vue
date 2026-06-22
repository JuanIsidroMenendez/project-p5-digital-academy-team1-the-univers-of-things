<!-- Layout privado: sidebar + header dashboard + slot + footer privado -->

<script setup>
import DashboardHeader from '@/components/layout/DashboardHeader.vue'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
</script>

<template>
    <div class="dashboard-layout">
        <DashboardHeader />
        <div class="dashboard-layout__body">
            <DashboardSidebar />
            <main class="dashboard-layout__content">
                <slot />
            </main>
        </div>
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
    }

    &__content {
        flex: 1;
        padding: 2rem 1rem;

        @media (min-width: $bp-tablet) {
            padding: 2.5rem 2rem;
        }

        @media (min-width: $bp-desktop) {
            padding: 3rem 4rem;
        }
    }
}
</style>