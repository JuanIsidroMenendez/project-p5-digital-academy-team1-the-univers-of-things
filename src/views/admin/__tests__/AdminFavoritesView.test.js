import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/AdminLayout.vue', () => ({ default: { template: '<slot />' } }))

import AdminFavoritesView from '../AdminFavoritesView.vue'

describe('AdminFavoritesView', () => {
  it('monta sin errores y lista todos los favoritos', () => {
    const wrapper = mount(AdminFavoritesView)

    expect(wrapper.find('h1').text()).toBe('Favoritos de usuarios')
    expect(wrapper.findAll('tbody tr')).toHaveLength(4)
    expect(wrapper.text()).toContain('Quantum Strike')
  })
})
