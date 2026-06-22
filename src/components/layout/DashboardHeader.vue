<!-- Header privado del dashboard: logo, seccion actual, usuario y cerrar sesion -->
<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
    await auth.logout()
    router.push('/')
}
</script>

<template>
    <header class="dashboard-header">
        <nav class="dashboard-header__nav" aria-label="Navegacion del dashboard">

            <RouterLink to="/" class="dashboard-header__logo" aria-label="FPS — Ir a inicio">
                <img src="/src/assets/imgs/fps-logo.svg" alt="FPS logo" width="32" height="32" />
                <span class="dashboard-header__logo-text">FPS</span>
                <span class="dashboard-header__logo-sep" aria-hidden="true">/</span>
                <span class="dashboard-header__logo-section">{{ auth.isAdmin ? 'Dashboard Admin' : 'Dashboard' }}</span>
            </RouterLink>

            <ul class="dashboard-header__links" role="list">
                <li>
                    <RouterLink to="/" class="dashboard-header__link">Inicio</RouterLink>
                </li>
                <li>
                    <RouterLink to="/catalog" class="dashboard-header__link">Catálogo</RouterLink>
                </li>
                <li>
                    <RouterLink to="/featured" class="dashboard-header__link">Destacados</RouterLink>
                </li>
            </ul>

            <div class="dashboard-header__user">
                <span class="dashboard-header__username">{{ auth.profile?.username || auth.user?.email }}</span>
                <span class="dashboard-header__badge"
                    :class="auth.isAdmin ? 'dashboard-header__badge--admin' : 'dashboard-header__badge--customer'">
                    {{ auth.isAdmin ? 'ADMIN' : 'CLIENTE' }}
                </span>
                <button class="dashboard-header__logout" aria-label="Cerrar sesion" @click="handleLogout">
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

.dashboard-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(3, 3, 8, 0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--color-border-purple);
    width: 100%;

    &__nav {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        padding: 0 1rem;

        @media (min-width: $bp-tablet) {
            height: 64px;
            padding: 0 2.5rem;
        }

        @media (min-width: $bp-desktop) {
            height: 72px;
            padding: 0 4rem;
        }
    }

    &__logo {
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
    }

    &__logo-text {
        font-family: $font-display;
        font-weight: 800;
        font-size: 17px;
        color: var(--color-text);
    }

    &__logo-sep {
        color: var(--color-text-dim);
        font-size: 14px;
    }

    &__logo-section {
        font-family: $font-mono;
        font-size: 11px;
        color: var(--color-primary);
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    &__user {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__username {
        font-family: $font-mono;
        font-size: 11px;
        color: var(--color-text-muted);
        letter-spacing: 0.06em;
        display: none;

        @media (min-width: $bp-tablet) {
            display: block;
        }
    }

    &__badge {
        font-family: $font-mono;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 3px 8px;
        border-radius: var(--radius-full);
        display: none;

        @media (min-width: $bp-tablet) {
            display: block;
        }

        &--customer {
            background: rgba(34, 211, 238, 0.15);
            color: var(--color-secondary);
            border: 1px solid var(--color-border-cyan);
        }

        &--admin {
            background: rgba(168, 85, 247, 0.15);
            color: var(--color-primary);
            border: 1px solid var(--color-border-purple);
        }
    }

    &__logout {
        display: flex;
        align-items: center;
        gap: 6px;
        background: transparent;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        color: var(--color-text-muted);
        font-family: $font-mono;
        font-size: 10px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 6px 12px;
        cursor: pointer;
        transition: all var(--transition);

        &:hover {
            border-color: var(--color-primary);
            color: var(--color-text);
        }

        &:focus-visible {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
    }
}
</style>