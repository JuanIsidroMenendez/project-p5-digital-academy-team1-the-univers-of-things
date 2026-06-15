<!-- Layout privado: sidebar + header dashboard + slot + footer privado -->
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="dashboard-layout">
    <aside class="dashboard-sidebar">
      <div class="dashboard-sidebar__logo">
        <RouterLink to="/">
          <img src="@/assets/img/fps-logo.svg" alt="FPS" class="dashboard-sidebar__logo-img" />
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
      <slot />
    </main>
  </div>
</template>