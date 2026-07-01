import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/DashboardLayout.vue', () => ({ default: { template: '<slot />' } }))
vi.mock('@/stores/favorites-store', () => ({ useFavoritesStore: vi.fn() }))

vi.mock('@/components/favorites/FavoriteCard.vue', () => ({
  default: {
    props: ['favorite'],
    emits: ['remove', 'edit', 'rate'],
    template: `<div class="favorite-card-stub">
      {{ favorite.title }}
      <button class="stub-remove" @click="$emit('remove', favorite.id)">remove</button>
      <button class="stub-edit" @click="$emit('edit', favorite)">edit</button>
      <button class="stub-rate" @click="$emit('rate', favorite.id, 5)">rate</button>
    </div>`,
  },
}))

vi.mock('@/components/dashboard/EditFavoriteForm.vue', () => ({
  default: {
    props: ['favorite'],
    emits: ['save', 'cancel'],
    template: `<div class="edit-form-stub">
      <button class="stub-save" @click="$emit('save', { title: 'Updated' })">save</button>
      <button class="stub-cancel" @click="$emit('cancel')">cancel</button>
    </div>`,
  },
}))

vi.mock('@/components/dashboard/AddFavoriteFromList.vue', () => ({
  default: {
    emits: ['select', 'close'],
    template: `<div class="add-panel-stub">
      <button class="stub-select" @click="$emit('select', { id: 'new-game', title: 'New Game' })">select</button>
      <button class="stub-close" @click="$emit('close')">close</button>
    </div>`,
  },
}))

import { useFavoritesStore } from '@/stores/favorites-store'
import FavoritesView from '../FavoritesView.vue'

describe('FavoritesView', () => {
  let favoritesStoreMock

  beforeEach(() => {
    favoritesStoreMock = {
      favoritesList: [],
      removeFromFavorites: vi.fn(),
      updateFavorite: vi.fn(),
      rateFavorite: vi.fn(),
      addToFavorites: vi.fn(),
    }
    useFavoritesStore.mockReturnValue(favoritesStoreMock)
  })

  it('muestra el estado vacío cuando no hay favoritos', () => {
    const wrapper = mount(FavoritesView)

    expect(wrapper.text()).toContain('Todavía no tienes favoritos')
    expect(wrapper.find('.favorite-card-stub').exists()).toBe(false)
  })

  it('muestra la lista de favoritos cuando hay alguno', () => {
    favoritesStoreMock.favoritesList = [
      { id: 'g1', title: 'Quantum Strike' },
      { id: 'g2', title: 'Neon Odyssey' },
    ]
    const wrapper = mount(FavoritesView)

    expect(wrapper.text()).not.toContain('Todavía no tienes favoritos')
    expect(wrapper.findAll('.favorite-card-stub')).toHaveLength(2)
    expect(wrapper.text()).toContain('Quantum Strike')
  })

  it('quita un favorito al emitir remove desde la tarjeta', async () => {
    favoritesStoreMock.favoritesList = [{ id: 'g1', title: 'Quantum Strike' }]
    const wrapper = mount(FavoritesView)

    await wrapper.find('.stub-remove').trigger('click')

    expect(favoritesStoreMock.removeFromFavorites).toHaveBeenCalledWith('g1')
  })

  it('entra en modo edición y muestra el formulario en vez de la tarjeta', async () => {
    favoritesStoreMock.favoritesList = [{ id: 'g1', title: 'Quantum Strike' }]
    const wrapper = mount(FavoritesView)

    await wrapper.find('.stub-edit').trigger('click')

    expect(wrapper.find('.edit-form-stub').exists()).toBe(true)
    expect(wrapper.find('.favorite-card-stub').exists()).toBe(false)
  })

  it('guarda la edición y vuelve a mostrar la tarjeta', async () => {
    favoritesStoreMock.favoritesList = [{ id: 'g1', title: 'Quantum Strike' }]
    const wrapper = mount(FavoritesView)

    await wrapper.find('.stub-edit').trigger('click')
    await wrapper.find('.stub-save').trigger('click')

    expect(favoritesStoreMock.updateFavorite).toHaveBeenCalledWith('g1', { title: 'Updated' })
    expect(wrapper.find('.edit-form-stub').exists()).toBe(false)
    expect(wrapper.find('.favorite-card-stub').exists()).toBe(true)
  })

  it('cancela la edición sin guardar cambios', async () => {
    favoritesStoreMock.favoritesList = [{ id: 'g1', title: 'Quantum Strike' }]
    const wrapper = mount(FavoritesView)

    await wrapper.find('.stub-edit').trigger('click')
    await wrapper.find('.stub-cancel').trigger('click')

    expect(favoritesStoreMock.updateFavorite).not.toHaveBeenCalled()
    expect(wrapper.find('.edit-form-stub').exists()).toBe(false)
    expect(wrapper.find('.favorite-card-stub').exists()).toBe(true)
  })

  it('valora un favorito al emitir rate desde la tarjeta', async () => {
    favoritesStoreMock.favoritesList = [{ id: 'g1', title: 'Quantum Strike' }]
    const wrapper = mount(FavoritesView)

    await wrapper.find('.stub-rate').trigger('click')

    expect(favoritesStoreMock.rateFavorite).toHaveBeenCalledWith('g1', 5)
  })

  it('abre el panel de añadir y añade el juego seleccionado', async () => {
    const wrapper = mount(FavoritesView)

    expect(wrapper.find('.add-panel-stub').exists()).toBe(false)

    await wrapper.find('.favorites-view__add-btn').trigger('click')
    expect(wrapper.find('.add-panel-stub').exists()).toBe(true)

    await wrapper.find('.stub-select').trigger('click')

    expect(favoritesStoreMock.addToFavorites).toHaveBeenCalledWith({ id: 'new-game', title: 'New Game' })
    expect(wrapper.find('.add-panel-stub').exists()).toBe(false)
  })

  it('cierra el panel de añadir sin seleccionar ningún juego', async () => {
    const wrapper = mount(FavoritesView)

    await wrapper.find('.favorites-view__add-btn').trigger('click')
    await wrapper.find('.stub-close').trigger('click')

    expect(favoritesStoreMock.addToFavorites).not.toHaveBeenCalled()
    expect(wrapper.find('.add-panel-stub').exists()).toBe(false)
  })
})
