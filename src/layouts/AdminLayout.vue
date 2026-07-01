<!-- Layout privado admin: sidebar + header + slot -->
<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AppAurora from '@/components/layout/AppAurora.vue'
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore()
const router = useRouter()

const isMobileNavOpen = ref(false)
function toggleMobileNav() {
  isMobileNavOpen.value = !isMobileNavOpen.value
}

async function handleLogout() {
  await auth.logout()
  router.push('/')
}
</script>

<template>
  <AppAurora />
  <div class="dashboard-layout">
    <aside class="dashboard-sidebar">
      <div class="dashboard-sidebar__logo">
        <RouterLink to="/">
          <img src="@/assets/imgs/fps-logo.svg" alt="FPS" class="dashboard-sidebar__logo-img" />
        </RouterLink>

        <button
          type="button"
          class="dashboard-sidebar__toggle"
          :aria-expanded="isMobileNavOpen"
          aria-controls="admin-sidebar-nav"
          :aria-label="isMobileNavOpen ? 'Cerrar menu del dashboard' : 'Abrir menu del dashboard'"
          @click="toggleMobileNav"
        >
          <span class="dashboard-sidebar__toggle-line"></span>
          <span class="dashboard-sidebar__toggle-line"></span>
          <span class="dashboard-sidebar__toggle-line"></span>
        </button>
      </div>

      <div class="dashboard-sidebar__profile">
        <div class="dashboard-sidebar__avatar" :style="{ background: auth.profile?.profileBg }">
          <img v-if="auth.profile?.profileImg" :src="auth.profile.profileImg" alt="Avatar" />
        </div>
        <p class="dashboard-sidebar__name">{{ auth.user?.email }}</p>
        <span class="dashboard-sidebar__badge">ADMIN</span>
      </div>

      <nav
        id="admin-sidebar-nav"
        class="dashboard-sidebar__nav"
        :class="{ 'dashboard-sidebar__nav--open': isMobileNavOpen }"
      >
        <RouterLink to="/admin/users" class="dashboard-sidebar__link" @click="isMobileNavOpen = false">
          <span>Gestión de usuarios</span>
        </RouterLink>
        <RouterLink to="/admin/profile" class="dashboard-sidebar__link" @click="isMobileNavOpen = false">
          <span>Perfil</span>
        </RouterLink>
        <RouterLink to="/admin/featured" class="dashboard-sidebar__link" @click="isMobileNavOpen = false">
          <span>Destacados</span>
        </RouterLink>
        <a href="#" class="dashboard-sidebar__link dashboard-sidebar__link--logout" @click.prevent="handleLogout">
          <span>Cerrar sesión</span>
        </a>
      </nav>
    </aside>

    <main class="dashboard-main">
      <header class="dashboard-header">
        <div class="dashboard-header__breadcrumb">
          <RouterLink to="/" class="dashboard-header__brand">
            <img src="@/assets/imgs/fps-logo.svg" alt="FPS" class="dashboard-header__logo" />
            <span>FPS</span>
          </RouterLink>
          <span class="dashboard-header__sep">/</span>
          <span class="dashboard-header__page">Dashboard Admin</span>
        </div>
        <div class="dashboard-header__user">
          <span class="dashboard-header__name">{{ auth.user?.email }}</span>
          <span class="dashboard-header__badge">ADMIN</span>
        </div>
      </header>
      <Transition name="page" mode="out-in">
        <slot />
      </Transition>
    </main>
  </div>
</template>
