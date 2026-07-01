import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/DashboardLayout.vue', () => ({ default: { template: '<slot />' } }))
vi.mock('@/api/user.service.js', () => ({ uploadAvatarToStorage: vi.fn() }))
vi.mock('@/stores/auth.js', () => ({ useAuthStore: vi.fn() }))

import { useAuthStore } from '@/stores/auth.js'
import { uploadAvatarToStorage } from '@/api/user.service.js'
import ProfileView from '../ProfileView.vue'

describe('ProfileView', () => {
  let authStoreMock

  beforeEach(() => {
    authStoreMock = {
      profile: { username: 'Alice', profileImg: null, profileBg: null },
      user: { uid: 'user-1', email: 'alice@test.com' },
      updateAvatar: vi.fn(() => Promise.resolve()),
      updateBg: vi.fn(() => Promise.resolve()),
      changePassword: vi.fn(() => Promise.resolve()),
    }
    useAuthStore.mockReturnValue(authStoreMock)
  })

  it('selecciona un avatar y lo guarda llamando a updateAvatar', async () => {
    const wrapper = mount(ProfileView)

    await wrapper.find('.profile-view__avatar-option').trigger('click')
    await wrapper.findAll('.profile-view__save-btn')[0].trigger('click')

    expect(authStoreMock.updateAvatar).toHaveBeenCalledTimes(1)
  })

  it('selecciona un fondo y lo guarda llamando a updateBg', async () => {
    const wrapper = mount(ProfileView)

    await wrapper.find('.profile-view__bg-option').trigger('click')
    await wrapper.findAll('.profile-view__save-btn')[1].trigger('click')

    expect(authStoreMock.updateBg).toHaveBeenCalledTimes(1)
  })
})
