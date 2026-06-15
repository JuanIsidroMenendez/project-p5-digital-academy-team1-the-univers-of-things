<!-- Vista dashboard usuario: perfil + favoritos -->
<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
</script>

<template>
    <DashboardLayout>
        <section class="dashboard-view">
            <h1 class="dashboard-view__title">Mi Dashboard</h1>
            <!-- TODO: Sprint 2 — añadir DashboardSidebar y contenido de favoritos/perfil -->
        </section>
    </DashboardLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.dashboard-view {
    &__title {
        font-family: $font-display;
        font-weight: 800;
        font-size: 1.8rem;
        color: var(--color-text);
        margin-bottom: 1.5rem;

        @media (min-width: $bp-tablet) {
            font-size: 2rem;
        }

        @media (min-width: $bp-desktop) {
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }
    }
}
</style>