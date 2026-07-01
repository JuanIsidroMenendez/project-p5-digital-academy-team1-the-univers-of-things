import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/MainLayout.vue', () => ({ default: { template: '<slot />' } }))
vi.mock('@/components/items/ItemCard.vue', () => ({
  default: {
    props: ['game'],
    template: '<div class="item-card-stub">{{ game.title }}</div>',
  },
}))
vi.mock('@/stores/games-store', () => ({ useGamesStore: vi.fn() }))

import { useGamesStore } from '@/stores/games-store'
import CatalogView from '../CatalogView.vue'

const makeGames = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Game ${i + 1}`,
    genre: i % 2 === 0 ? 'Shooter' : 'RPG',
    platform: 'PC',
    thumbnail: `${i}.jpg`,
  }))

describe('CatalogView', () => {
  let gamesStoreMock

  beforeEach(() => {
    gamesStoreMock = {
      games: makeGames(3),
      isLoading: false,
      error: null,
      fetchGames: vi.fn(() => Promise.resolve()),
    }
    useGamesStore.mockReturnValue(gamesStoreMock)
  })

  it('muestra el estado de carga cuando isLoading es true', () => {
    gamesStoreMock.isLoading = true
    const wrapper = mount(CatalogView)

    expect(wrapper.text()).toContain('Cargando juegos...')
    expect(wrapper.find('.item-card-stub').exists()).toBe(false)
  })

  it('muestra el mensaje de error cuando gamesStore.error tiene texto', () => {
    gamesStoreMock.error = 'Error al cargar los juegos. Inténtalo de nuevo más tarde.'
    const wrapper = mount(CatalogView)

    expect(wrapper.text()).toContain('Error al cargar los juegos')
    expect(wrapper.find('.item-card-stub').exists()).toBe(false)
  })
})
