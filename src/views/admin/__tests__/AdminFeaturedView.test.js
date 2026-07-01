import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/AdminLayout.vue', () => ({ default: { template: '<slot />' } }))
vi.mock('@/stores/featured-store.js', () => ({ useFeaturedStore: vi.fn() }))

import { useFeaturedStore } from '@/stores/featured-store.js'
import AdminFeaturedView from '../AdminFeaturedView.vue'

describe('AdminFeaturedView', () => {
  let featuredStoreMock

  beforeEach(() => {
    featuredStoreMock = {
      catalog: [
        { id: 'a', title: 'Quantum Strike', thumbnail: 'a.jpg' },
        { id: 'b', title: 'Neon Odyssey', thumbnail: 'b.jpg' },
      ],
      featuredList: [],
      gameOfTheMonth: null,
      fetchAll: vi.fn(() => Promise.resolve()),
      addFeatured: vi.fn(() => Promise.resolve()),
      removeFeatured: vi.fn(() => Promise.resolve()),
      selectMonthly: vi.fn(() => Promise.resolve()),
    }
    useFeaturedStore.mockReturnValue(featuredStoreMock)
  })

  it('filtra sugerencias de juegos activos por texto de búsqueda', async () => {
    const wrapper = mount(AdminFeaturedView)

    const input = wrapper.find('#active-search')
    await input.trigger('focus')
    await input.setValue('quantum')

    expect(wrapper.text()).toContain('Quantum Strike')
    expect(wrapper.text()).not.toContain('Neon Odyssey')
  })

  it('selecciona un juego del mes al hacer click en una sugerencia', async () => {
    const wrapper = mount(AdminFeaturedView)

    const input = wrapper.find('#monthly-search')
    await input.trigger('focus')
    await input.setValue('quantum')
    await wrapper.find('.admin-featured__suggestion').trigger('click')

    expect(featuredStoreMock.selectMonthly).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'a', title: 'Quantum Strike' })
    )
  })

  it('muestra la tarjeta del juego del mes y permite quitarlo', async () => {
    featuredStoreMock.gameOfTheMonth = { id: 'a', title: 'Quantum Strike', thumbnail: 'a.jpg' }
    const wrapper = mount(AdminFeaturedView)

    expect(wrapper.text()).toContain('Quantum Strike')

    await wrapper.find('.admin-featured__active-card .admin-featured__remove').trigger('click')

    expect(featuredStoreMock.selectMonthly).toHaveBeenCalledWith(null)
  })

  it('añade un juego activo al hacer click en una sugerencia', async () => {
    const wrapper = mount(AdminFeaturedView)

    const input = wrapper.find('#active-search')
    await input.trigger('focus')
    await input.setValue('quantum')
    await wrapper.find('.admin-featured__suggestion').trigger('click')

    expect(featuredStoreMock.addFeatured).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'a', title: 'Quantum Strike' })
    )
  })

  it('quita un juego activo destacado al pulsar QUITAR', async () => {
    featuredStoreMock.featuredList = [{ id: 'a', title: 'Quantum Strike', thumbnail: 'a.jpg' }]
    const wrapper = mount(AdminFeaturedView)

    await wrapper.find('.admin-featured__active-card .admin-featured__remove').trigger('click')

    expect(featuredStoreMock.removeFeatured).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'a' })
    )
  })

  it('deshabilita el buscador y avisa cuando hay 6 juegos destacados', () => {
    featuredStoreMock.featuredList = Array.from({ length: 6 }, (_, i) => ({
      id: `g${i}`, title: `Game ${i}`, thumbnail: `${i}.jpg`,
    }))
    const wrapper = mount(AdminFeaturedView)

    expect(wrapper.find('#active-search').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Máx. 6 juegos destacados')
  })
})
