import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/stores/featured-store.js', () => ({ useFeaturedStore: vi.fn() }))
vi.mock('@/api/firebase', () => ({ db: {}, auth: {} }))

import { useFeaturedStore } from '@/stores/featured-store.js'
import FeaturedMonthly from '../FeaturedMonthly.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/game/:id', name: 'game-detail', component: { template: '<div />' } }
  ]
})

const mockGame = {
  id: 1,
  title: 'Game of the Month',
  thumbnail: 'https://example.com/thumb.jpg',
  short_description: 'La mejor aventura del mes'
}

describe('FeaturedMonthly', () => {
  beforeEach(() => { setActivePinia(createPinia()) })

  it('muestra el titulo del juego del mes', () => {
    useFeaturedStore.mockReturnValue({ gameOfTheMonth: mockGame })
    const wrapper = mount(FeaturedMonthly, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('Game of the Month')
  })

  it('muestra la descripcion del juego del mes', () => {
    useFeaturedStore.mockReturnValue({ gameOfTheMonth: mockGame })
    const wrapper = mount(FeaturedMonthly, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('La mejor aventura del mes')
  })

  it('no renderiza el enlace si gameOfTheMonth es null', () => {
    useFeaturedStore.mockReturnValue({ gameOfTheMonth: null })
    const wrapper = mount(FeaturedMonthly, { global: { plugins: [router] } })
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('la imagen usa el thumbnail del juego', () => {
    useFeaturedStore.mockReturnValue({ gameOfTheMonth: mockGame })
    const wrapper = mount(FeaturedMonthly, { global: { plugins: [router] } })
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/thumb.jpg')
  })
})