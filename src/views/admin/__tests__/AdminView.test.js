import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/AdminLayout.vue', () => ({ default: { template: '<slot />' } }))

import AdminView from '../AdminView.vue'

describe('AdminView', () => {
  it('monta sin errores y muestra la tabla de usuarios', () => {
    const wrapper = mount(AdminView)

    expect(wrapper.find('h1').text()).toBe('Gestión de Usuarios')
    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.text()).toContain('admin@admin.com')
  })
})
