<!-- Vista favoritos: CRUD de favoritos, valoracion por estrellas y añadir nuevo -->
<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
</script>

<template>
    <DashboardLayout>
        <section class="favorites-view">
            <h1 class="favorites-view__title">Mis Favoritos</h1>
            <!-- TODO: Sprint 2 — añadir FavoriteCard, StarRating y AddFavoriteFromList -->
        </section>
    </DashboardLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.favorites-view {
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