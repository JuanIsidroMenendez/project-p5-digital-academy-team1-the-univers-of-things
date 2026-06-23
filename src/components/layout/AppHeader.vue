<!-- Navegacion publica: logo FPS + links + botones login/register o usuario logueado -->
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
    <header class="header">
        <nav class="header__nav" aria-label="Navegacion principal">

            <RouterLink to="/" class="header__logo" aria-label="FPS — Ir a inicio">
                <img src="/src/assets/imgs/fps-logo.svg" alt="FPS logo" width="36" height="36"
                    class="header__logo-icon" />
                <span class="header__logo-text">FPS</span>
            </RouterLink>

            <ul class="header__links" role="list">
                <li>
                    <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li>
                    <RouterLink to="/catalog">Catálogo</RouterLink>
                </li>
                <li>
                    <RouterLink to="/featured">Destacados</RouterLink>
                </li>
            </ul>

            <ul class="header__actions" role="list">
                <template v-if="auth.user">
                    <li>
                        <RouterLink :to="auth.profile?.role === 'role:customer' ? '/dashboard' : '/admin/users'" class="btn btn--ghost">
                            {{ auth.profile?.username || auth.user.email }}
                        </RouterLink>
                    </li>
                    <li>
                        <button class="btn btn--primary" @click="handleLogout">
                            Cerrar sesión
                        </button>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <RouterLink to="/login" class="btn btn--ghost">
                            Iniciar sesión
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/register" class="btn btn--primary">
                            Registrarse
                        </RouterLink>
                    </li>
                </template>
            </ul>

        </nav>
    </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(3, 3, 8, 0.82);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--color-border);

    &__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        padding: 0 1rem;
        max-width: $bp-wide;
        margin: 0 auto;

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
        gap: 10px;
        text-decoration: none;
        flex-shrink: 0;
    }

    &__logo-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        flex-shrink: 0;

        @media (min-width: $bp-tablet) {
            width: 36px;
            height: 36px;
        }
    }

    &__logo-text {
        font-family: $font-display;
        font-weight: 800;
        font-size: 17px;
        color: var(--color-text);

        @media (min-width: $bp-tablet) {
            font-size: 19px;
        }

        @media (min-width: $bp-desktop) {
            font-size: 21px;
        }
    }

    &__links {
        display: none;

        @media (min-width: $bp-tablet) {
            display: flex;
            align-items: center;
            gap: 2.2rem;
        }

        @media (min-width: $bp-desktop) {
            gap: 3rem;
        }

        a {
            font-family: $font-mono;
            font-size: 11px;
            color: var(--color-text-muted);
            letter-spacing: 0.08em;
            text-transform: uppercase;
            transition: color var(--transition);

            &:hover,
            &.router-link-active {
                color: var(--color-secondary);
            }

            &:focus-visible {
                outline: 2px solid var(--color-secondary);
                outline-offset: 4px;
                border-radius: 2px;
            }
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        gap: var(--space-2);

        @media (min-width: $bp-tablet) {
            gap: 10px;
        }

        @media (min-width: $bp-desktop) {
            gap: 14px;
        }

        .btn {
            font-size: 10px;
            padding: 6px 10px;

            @media (min-width: $bp-tablet) {
                font-size: 11px;
                padding: 8px 18px;
            }

            @media (min-width: $bp-desktop) {
                font-size: 12px;
                padding: 10px 22px;
            }
        }
    }
}
</style>