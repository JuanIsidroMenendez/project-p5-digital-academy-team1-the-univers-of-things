import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/stores/featured-store.js', () => ({ useFeaturedStore: vi.fn() }))
vi.mock('@/api/firebase', () => ({ db: {}, auth: {} }))
vi.mock('@/components/featured/FeaturedHero.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/featured/FeaturedGrid.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/featured/FeaturedMonthly.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/layouts/MainLayout.vue', () => ({ default: { template: '<slot />' } }))

import { useFeaturedStore } from '@/stores/featured-store.js'
import FeaturedView from '../FeaturedView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }]
})

describe('FeaturedView', () => {
  beforeEach(() => { setActivePinia(createPinia()) })

  it('no lanza error si fetchAll falla en onMounted', async () => {
    useFeaturedStore.mockReturnValue({
      fetchAll: vi.fn(() => Promise.reject(new Error("Network error"))),
      featuredList: [],
      gameOfTheMonth: null
    })

    expect(() => mount(FeaturedView, { global: { plugins: [router] } })).not.toThrow()
    await flushPromises()
  })
})