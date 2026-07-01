import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import AddFavoriteFromList from '../AddFavoriteFromList.vue'

// Mock de la API de juegos para no hacer peticiones reales en los tests
vi.mock('@/services/games-api', () => ({
  getGames: vi.fn(() =>
    Promise.resolve([
      { id: 1, title: 'Lost Ark', thumbnail: 'lostark.jpg' },
      { id: 2, title: 'World of Tanks', thumbnail: 'wot.jpg' },
      { id: 3, title: 'Throne and Liberty', thumbnail: 'tal.jpg' }
    ])
  )
}))

describe('AddFavoriteFromList', () => {
  it('carga y muestra todos los juegos al montar', async () => {
    const wrapper = mount(AddFavoriteFromList)
    await flushPromises()

    const items = wrapper.findAll('.add-favorite-from-list__item')
    expect(items).toHaveLength(3)
  })

  it('filtra los resultados según el texto de búsqueda', async () => {
    const wrapper = mount(AddFavoriteFromList)
    await flushPromises()

    const input = wrapper.find('.add-favorite-from-list__search')
    await input.setValue('tanks')

    const items = wrapper.findAll('.add-favorite-from-list__item')
    expect(items).toHaveLength(1)
    expect(items[0].text()).toContain('World of Tanks')
  })

  it('emite select con el juego correcto al hacer clic en un resultado', async () => {
    const wrapper = mount(AddFavoriteFromList)
    await flushPromises()

    const firstButton = wrapper.find('.add-favorite-from-list__item-btn')
    await firstButton.trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')[0][0].title).toBe('Lost Ark')
  })

  it('emite close al hacer clic en el botón de cerrar', async () => {
    const wrapper = mount(AddFavoriteFromList)
    await flushPromises()

    const closeButton = wrapper.find('.add-favorite-from-list__close-btn')
    await closeButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })
})