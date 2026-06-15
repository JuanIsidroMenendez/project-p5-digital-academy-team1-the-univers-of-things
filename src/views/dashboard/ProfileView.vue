<!-- Vista perfil de usuario: cambio de avatar y contraseña -->
<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
</script>

<template>
    <DashboardLayout>
        <section class="profile-view">
            <h1 class="profile-view__title">Mi Perfil</h1>
            <!-- TODO: Sprint 2 — añadir AvatarGallery, AvatarUploader y ChangePasswordForm -->
        </section>
    </DashboardLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.profile-view {
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