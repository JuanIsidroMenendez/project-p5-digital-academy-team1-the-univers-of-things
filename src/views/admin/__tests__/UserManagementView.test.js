import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/AdminLayout.vue', () => ({ default: { template: '<slot />' } }))
vi.mock('@/stores/admin-store.js', () => ({ useAdminStore: vi.fn() }))

import { useAdminStore } from '@/stores/admin-store.js'
import UserManagementView from '../UserManagementView.vue'

describe('UserManagementView', () => {
  let adminStoreMock

  beforeEach(() => {
    adminStoreMock = {
      usersList: [
        { uid: 'user-1', username: 'Alice', email: 'alice@test.com', status: 'active' },
        { uid: 'user-2', username: 'Bob', email: 'bob@test.com', status: 'restricted' },
      ],
      fetchAllUsers: vi.fn(() => Promise.resolve()),
      toggleUserAccess: vi.fn(),
    }
    useAdminStore.mockReturnValue(adminStoreMock)
  })

  it('carga los usuarios en onMounted', () => {
    mount(UserManagementView)

    expect(adminStoreMock.fetchAllUsers).toHaveBeenCalledTimes(1)
  })

  it('filtra usuarios por texto de búsqueda', async () => {
    const wrapper = mount(UserManagementView)

    await wrapper.find('#user-search').setValue('alice')

    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).not.toContain('Bob')
  })

  it('llama a toggleUserAccess al pulsar RESTRINGIR', async () => {
    const wrapper = mount(UserManagementView)

    await wrapper.find('.user-management__btn').trigger('click')

    expect(adminStoreMock.toggleUserAccess).toHaveBeenCalledWith('user-1', 'active')
  })

  it('muestra mensaje de "sin resultados" si la búsqueda no coincide', async () => {
    const wrapper = mount(UserManagementView)

    await wrapper.find('#user-search').setValue('nadie')

    expect(wrapper.text()).toContain('No se encontraron resultados')
  })
})
