import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/stores/featured-store.js', () => ({ useFeaturedStore: vi.fn() }))
vi.mock('@/api/firebase', () => ({ db: {}, auth: {} }))

import { useFeaturedStore } from '@/stores/featured-store.js'
import FeaturedGrid from '../FeaturedGrid.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/game/:id', name: 'game-detail', component: { template: '<div />' } }
  ]
})

const mockGames = [
  { id: 1, title: 'Game One', thumbnail: '', genre: 'Action', platform: 'PC', short_description: '' },
  { id: 2, title: 'Game Two', thumbnail: '', genre: 'RPG', platform: 'PC', short_description: '' },
  { id: 3, title: 'Game Three', thumbnail: '', genre: 'FPS', platform: 'PC', short_description: '' },
]

describe('FeaturedGrid', () => {
  beforeEach(() => { setActivePinia(createPinia()) })

  it('renderiza una tarjeta por cada juego del store', () => {
    useFeaturedStore.mockReturnValue({ featuredList: mockGames })
    const wrapper = mount(FeaturedGrid, { global: { plugins: [router] } })
    expect(wrapper.findAll('article.card')).toHaveLength(3)
  })

  it('no renderiza tarjetas si la lista esta vacia', () => {
    useFeaturedStore.mockReturnValue({ featuredList: [] })
    const wrapper = mount(FeaturedGrid, { global: { plugins: [router] } })
    expect(wrapper.findAll('article.card')).toHaveLength(0)
  })

  it('muestra el titulo de cada juego', () => {
    useFeaturedStore.mockReturnValue({ featuredList: mockGames })
    const wrapper = mount(FeaturedGrid, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('Game One')
    expect(wrapper.text()).toContain('Game Two')
    expect(wrapper.text()).toContain('Game Three')
  })
})