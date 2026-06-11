import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/admindashboard',
      name: 'AdminDashboard',
      component: () => import('@/views/AdminDashboard.vue'),
      meta: { requiresAdmin: true }
    },
      {
      path: '/catalog',
      name: 'CatalogPage',
      component: () => import('@/views/CatalogPage.vue')
    },
      {
      path: '/destacados',
      name: 'DestacadosPage',
      component: () => import('@/views/DestacadosPage.vue')
    },
      {
      path: '/favorites',
      name: 'FavoritesPage',
      component: () => import('@/views/FavoritesPage.vue'),
      meta: { requiresAuth: true }
    },
      {
      path: '/detail/:id',
      name: 'GameDetailPage',
      component: () => import('@/views/GameDetailPage.vue')
    },
      {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/HomePage.vue')
    },
      {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/views/LoginPage.vue')
    },
      {
      path: '/register',
      name: 'RegisterPage',
      component: () => import('@/views/RegisterPage.vue')
    },
     {
      path: '/userdashboard',
      name: 'UserDashboard',
      component: () => import('@/views/UserDashboard.vue'),
      meta: { requiresAuth: true }
    },

  ],
})

export default router