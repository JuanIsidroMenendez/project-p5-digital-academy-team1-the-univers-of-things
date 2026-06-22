import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { watch } from 'vue'
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
      component: () => import('@/views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/favorites',
      name: 'favorites',
      component: () => import('@/views/dashboard/FavoritesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/profile',
      name: 'profile',
      component: () => import('@/views/dashboard/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('@/views/admin/UserManagementView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/featured',
      name: 'admin-featured',
      component: () => import('@/views/admin/AdminFeaturedView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/profile',
      name: 'admin-profile',
      component: () => import('@/views/admin/AdminProfileView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
  ]
})
router.beforeEach(async (to, from) => {
  const auth = useAuthStore()

  if (auth.loading) {
    await new Promise(resolve => {
      const unwatch = watch(() => auth.loading, (loading) => {
        if (!loading) {
          unwatch()
          resolve()
        }
      })
    })
  }

  if (to.meta.requiresAuth && !auth.user) {
    return '/login'
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return '/dashboard'
  }
})
export default router