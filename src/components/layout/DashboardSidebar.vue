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
                        <span aria-hidden="true">👤</span>
                        Perfil
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/dashboard/favorites" class="dashboard-sidebar__link"
                        aria-label="Ir a mis favoritos">
                        <span aria-hidden="true">🎮</span>
                        Mis Favoritos
                    </RouterLink>
                </li>
                <li>
                    <button class="dashboard-sidebar__link dashboard-sidebar__link--danger" aria-label="Cerrar sesion"
                        @click="handleLogout">
                        <span aria-hidden="true">↩</span>
                        Cerrar sesión
                    </button>
                </li>
            </ul>
        </nav>

    </aside>
</template>

<style lang="scss" scoped></style>