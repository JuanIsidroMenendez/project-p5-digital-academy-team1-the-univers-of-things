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

  it('muestra "sin resultados" cuando no hay juegos', () => {
    gamesStoreMock.games = []
    const wrapper = mount(CatalogView)

    expect(wrapper.text()).toContain('No se han encontrado resultados')
  })

  it('muestra las tarjetas de los juegos cargados', () => {
    const wrapper = mount(CatalogView)

    expect(wrapper.findAll('.item-card-stub')).toHaveLength(3)
    expect(wrapper.text()).toContain('Game 1')
  })

  it('llama a fetchGames en onMounted', () => {
    mount(CatalogView)

    expect(gamesStoreMock.fetchGames).toHaveBeenCalledTimes(1)
  })

  it('filtra los juegos por el texto de búsqueda', async () => {
    const wrapper = mount(CatalogView)

    await wrapper.find('#game-search').setValue('Game 2')

    expect(wrapper.findAll('.item-card-stub')).toHaveLength(1)
    expect(wrapper.text()).toContain('Game 2')
    expect(wrapper.text()).not.toContain('Game 1')
  })

  it('cambia de página al pulsar "siguiente" en la paginación', async () => {
    gamesStoreMock.games = makeGames(35)
    const wrapper = mount(CatalogView)

    expect(wrapper.text()).toContain('Game 1')
    expect(wrapper.text()).not.toContain('Game 31')

    await wrapper.find('[aria-label="Pagina siguiente"]').trigger('click')

    expect(wrapper.text()).not.toContain('Game 1')
    expect(wrapper.text()).toContain('Game 31')
  })
})
