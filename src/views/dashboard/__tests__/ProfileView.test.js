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

  it('rechaza el cambio de contraseña si la confirmación no coincide', async () => {
    const wrapper = mount(ProfileView)

    await wrapper.find('#current-password').setValue('actual123')
    await wrapper.find('#new-password').setValue('nueva1234')
    await wrapper.find('#confirm-password').setValue('otraCosa123')
    await wrapper.find('.profile-view__submit').trigger('click')

    expect(wrapper.text()).toContain('Las contraseñas no coinciden')
    expect(authStoreMock.changePassword).not.toHaveBeenCalled()
  })

  it('rechaza el cambio de contraseña si la nueva no cumple el formato mínimo', async () => {
    const wrapper = mount(ProfileView)

    await wrapper.find('#current-password').setValue('actual123')
    await wrapper.find('#new-password').setValue('corta')
    await wrapper.find('#confirm-password').setValue('corta')
    await wrapper.find('.profile-view__submit').trigger('click')

    expect(wrapper.text()).toContain('al menos 8 caracteres y un número')
    expect(authStoreMock.changePassword).not.toHaveBeenCalled()
  })

  it('cambia la contraseña con éxito y limpia los campos', async () => {
    const wrapper = mount(ProfileView)

    await wrapper.find('#current-password').setValue('actual123')
    await wrapper.find('#new-password').setValue('nueva1234')
    await wrapper.find('#confirm-password').setValue('nueva1234')
    await wrapper.find('.profile-view__submit').trigger('click')
    await Promise.resolve()

    expect(authStoreMock.changePassword).toHaveBeenCalledWith('actual123', 'nueva1234')
    expect(wrapper.text()).toContain('Contraseña actualizada correctamente')
    expect(wrapper.find('#current-password').element.value).toBe('')
  })
})
