import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/AdminLayout.vue', () => ({ default: { template: '<slot />' } }))
vi.mock('@/api/user.service.js', () => ({ uploadAvatarToStorage: vi.fn() }))
vi.mock('@/stores/auth.js', () => ({ useAuthStore: vi.fn() }))

import { useAuthStore } from '@/stores/auth.js'
import AdminProfileView from '../AdminProfileView.vue'

describe('AdminProfileView', () => {
  let authStoreMock

  beforeEach(() => {
    authStoreMock = {
      profile: { username: 'AdminRoot', profileImg: null, profileBg: null },
      user: { email: 'admin@admin.com' },
      updateAvatar: vi.fn(() => Promise.resolve()),
      updateBg: vi.fn(() => Promise.resolve()),
      changePassword: vi.fn(() => Promise.resolve()),
    }
    useAuthStore.mockReturnValue(authStoreMock)
  })

  it('selecciona un avatar y lo guarda llamando a updateAvatar', async () => {
    const wrapper = mount(AdminProfileView)

    await wrapper.find('.admin-profile__avatar-option').trigger('click')
    await wrapper.find('.admin-profile__btn-sm').trigger('click')

    expect(authStoreMock.updateAvatar).toHaveBeenCalledTimes(1)
  })

  it('selecciona un fondo y lo guarda llamando a updateBg', async () => {
    const wrapper = mount(AdminProfileView)

    await wrapper.find('.admin-profile__bg-option').trigger('click')
    await wrapper.findAll('.admin-profile__btn-sm')[1].trigger('click')

    expect(authStoreMock.updateBg).toHaveBeenCalledTimes(1)
  })
})
