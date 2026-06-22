<!-- Sidebar de navegacion del dashboard: avatar, nombre, rol y enlaces -->
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
    <aside class="dashboard-sidebar" aria-label="Navegacion del dashboard de usuario">

        <div class="dashboard-sidebar__profile">
            <div class="dashboard-sidebar__avatar" aria-hidden="true">
                {{ auth.profile?.avatar || '🎮' }}
            </div>
            <p class="dashboard-sidebar__username">
                {{ auth.profile?.username || auth.user?.email }}
            </p>
            <span class="dashboard-sidebar__badge">Cliente</span>
        </div>

        <nav aria-label="Secciones del dashboard">
            <ul class="dashboard-sidebar__nav" role="list">
                <li>
                    <RouterLink to="/dashboard/profile" class="dashboard-sidebar__link" aria-label="Ir a mi perfil">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        </svg>
                        Perfil
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/dashboard/favorites" class="dashboard-sidebar__link"
                        aria-label="Ir a mis favoritos">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        </svg>
                        Mis Favoritos
                    </RouterLink>
                </li>
                <li>
                    <button class="dashboard-sidebar__link dashboard-sidebar__link--danger" aria-label="Cerrar sesion"
                        @click="handleLogout">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path
                                d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>
                        Cerrar sesión
                    </button>
                </li>
            </ul>
        </nav>

    </aside>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.dashboard-sidebar {
    width: 220px;
    flex-shrink: 0;
    background: rgba(8, 8, 18, 0.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
    position: relative;
    z-index: 10;
    min-height: 100%;

    &__profile {
        padding: 0 1.5rem 1.2rem;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: 1rem;
        text-align: center;
    }

    &__avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin: 0 auto 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        background: linear-gradient(135deg, #7c3aed, #22d3ee);
        border: 2px solid var(--color-border-purple);
    }

    &__username {
        font-family: $font-display;
        font-size: 13px;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 6px;
    }

    &__badge {
        font-family: $font-mono;
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-secondary);
        background: var(--color-secondary-dim);
        border: 1px solid var(--color-border-cyan);
        padding: 2px 10px;
        border-radius: 4px;
    }

    &__nav {
        list-style: none;
        padding: 0 0.8rem;
        flex: 1;

        li {
            margin-bottom: 4px;
        }
    }

    &__link {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
        font-family: $font-mono;
        font-size: 11px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        padding: 10px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all var(--transition);
        text-decoration: none;
        border: none;
        border-left: 2px solid transparent;
        background: transparent;

        &:hover {
            background: var(--color-primary-dim);
            color: var(--color-text);
        }

        &.router-link-active {
            background: var(--color-primary-dim);
            color: var(--color-primary);
            border-left-color: var(--color-primary);
        }

        &--danger {
            color: var(--color-text-dim);

            &:hover {
                background: rgba(239, 68, 68, 0.1);
                color: #f87171;
            }
        }
    }
}
</style>