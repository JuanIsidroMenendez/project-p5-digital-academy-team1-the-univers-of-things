<!-- Header privado del dashboard: logo, seccion actual, usuario y cerrar sesion -->
<script setup>
// TODO: conectar useAuthStore cuando el .env de Firebase este disponible
// import { useAuthStore } from '@/stores/auth.js'
// const auth = useAuthStore()
// async function handleLogout() { await auth.logout() }
</script>

<template>
    <header class="dashboard-header">
        <nav class="dashboard-header__nav" aria-label="Navegacion del dashboard">

            <RouterLink to="/" class="dashboard-header__logo" aria-label="FPS — Ir a inicio">
                <img src="/src/assets/imgs/fps-logo.svg" alt="FPS logo" width="32" height="32" />
                <span class="dashboard-header__logo-text">FPS</span>
                <span class="dashboard-header__logo-sep" aria-hidden="true">/</span>
                <!-- TODO: mostrar "Dashboard Admin" si auth.user.role === 'admin' -->
                <span class="dashboard-header__logo-section">Dashboard</span>
            </RouterLink>

            <div class="dashboard-header__user">
                <!-- TODO: mostrar auth.user.displayName o auth.user.email -->
                <span class="dashboard-header__username">Usuario</span>
                <!-- TODO: mostrar badge ADMIN si auth.user.role === 'admin' -->
                <span class="dashboard-header__badge dashboard-header__badge--customer">CLIENTE</span>
                <button class="dashboard-header__logout" aria-label="Cerrar sesion">
                    <!-- TODO: @click="handleLogout" cuando Firebase este listo -->
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path
                            d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    Cerrar sesión
                </button>
            </div>

        </nav>
    </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;
</style>