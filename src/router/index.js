import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue')
    },
    {
      path: '/featured',
      name: 'featured',
      component: () => import('@/views/FeaturedView.vue')
    },
    {
      path: '/catalog/:id',
      name: 'game-detail',
      component: () => import('@/views/GameDetailView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue')
    },
    {
      path: '/dashboard/favorites',
      name: 'favorites',
      component: () => import('@/views/dashboard/FavoritesView.vue')
    },
    {
      path: '/dashboard/profile',
      name: 'profile',
      component: () => import('@/views/dashboard/ProfileView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminView.vue')
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('@/views/admin/UserManagementView.vue')
    },
    {
      path: '/admin/featured',
      name: 'admin-featured',
      component: () => import('@/views/admin/AdminFeaturedView.vue')
    },
    {
      path: '/admin/profile',
      name: 'admin-profile',
      component: () => import('@/views/admin/AdminProfileView.vue')
    }
  ]
})

export default router