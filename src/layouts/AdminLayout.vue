<!-- Layout privado admin: sidebar + header + slot -->
<script setup>
import { RouterLink } from 'vue-router'
import AppAurora from '@/components/layout/AppAurora.vue'
</script>

<template>
  <AppAurora />
  <div class="dashboard-layout">
    <aside class="dashboard-sidebar">
      <div class="dashboard-sidebar__logo">
        <RouterLink to="/">
          <img src="@/assets/imgs/fps-logo.svg" alt="FPS" class="dashboard-sidebar__logo-img" />
        </RouterLink>
      </div>

      <div class="dashboard-sidebar__profile">
        <div class="dashboard-sidebar__avatar"></div>
        <p class="dashboard-sidebar__name">AdminRoot</p>
        <span class="dashboard-sidebar__badge">ADMIN</span>
      </div>

      <nav class="dashboard-sidebar__nav">
        <RouterLink to="/admin/users" class="dashboard-sidebar__link">
          <span>Gestión de usuarios</span>
        </RouterLink>
        <RouterLink to="/admin/favorites" class="dashboard-sidebar__link">
          <span>Favoritos</span>
        </RouterLink>
        <RouterLink to="/admin/profile" class="dashboard-sidebar__link">
          <span>Perfil</span>
        </RouterLink>
        <RouterLink to="/admin/featured" class="dashboard-sidebar__link">
          <span>Destacados</span>
        </RouterLink>
        <a href="#" class="dashboard-sidebar__link dashboard-sidebar__link--logout">
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
          <span class="dashboard-header__name">AdminRoot</span>
          <span class="dashboard-header__badge">ADMIN</span>
        </div>
      </header>
      <Transition name="page" mode="out-in">
        <slot />
      </Transition>
    </main>
  </div>
</template>
