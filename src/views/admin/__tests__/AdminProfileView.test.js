import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/AdminLayout.vue', () => ({ default: { template: '<slot />' } }))
vi.mock('@/api/user.service.js', () => ({ uploadAvatarToStorage: vi.fn() }))
vi.mock('@/stores/auth.js', () => ({ useAuthStore: vi.fn() }))

import { useAuthStore } from '@/stores/auth.js'
import { uploadAvatarToStorage } from '@/api/user.service.js'
import AdminProfileView from '../AdminProfileView.vue'

describe('AdminProfileView', () => {
  let authStoreMock

  beforeEach(() => {
    authStoreMock = {
      profile: { username: 'AdminRoot', profileImg: null, profileBg: null },
      user: { uid: 'admin-1', email: 'admin@admin.com' },
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

  it('rechaza el cambio de contraseña si la nueva es igual a la actual', async () => {
    const wrapper = mount(AdminProfileView)

    await wrapper.find('.admin-profile__input').setValue('actual123')
    await wrapper.find('#new-password').setValue('actual123')
    await wrapper.find('#confirm-password').setValue('actual123')
    await wrapper.find('.admin-profile__btn-update').trigger('click')

    expect(wrapper.text()).toContain('La nueva contraseña no puede ser igual a la actual')
    expect(authStoreMock.changePassword).not.toHaveBeenCalled()
  })

  it('rechaza el cambio de contraseña si la confirmación no coincide', async () => {
    const wrapper = mount(AdminProfileView)

    await wrapper.find('.admin-profile__input').setValue('actual123')
    await wrapper.find('#new-password').setValue('nueva1234')
    await wrapper.find('#confirm-password').setValue('otraCosa123')
    await wrapper.find('.admin-profile__btn-update').trigger('click')

    expect(wrapper.text()).toContain('Las contraseñas no coinciden')
    expect(authStoreMock.changePassword).not.toHaveBeenCalled()
  })

  it('rechaza el cambio de contraseña si la nueva no cumple el formato mínimo', async () => {
    const wrapper = mount(AdminProfileView)

    await wrapper.find('.admin-profile__input').setValue('actual123')
    await wrapper.find('#new-password').setValue('corta')
    await wrapper.find('#confirm-password').setValue('corta')
    await wrapper.find('.admin-profile__btn-update').trigger('click')

    expect(wrapper.text()).toContain('al menos 8 caracteres y un número')
    expect(authStoreMock.changePassword).not.toHaveBeenCalled()
  })

  it('cambia la contraseña con éxito y limpia los campos', async () => {
    const wrapper = mount(AdminProfileView)

    await wrapper.find('.admin-profile__input').setValue('actual123')
    await wrapper.find('#new-password').setValue('nueva1234')
    await wrapper.find('#confirm-password').setValue('nueva1234')
    await wrapper.find('.admin-profile__btn-update').trigger('click')
    await Promise.resolve()

    expect(authStoreMock.changePassword).toHaveBeenCalledWith('actual123', 'nueva1234')
    expect(wrapper.text()).toContain('Contraseña actualizada correctamente')
    expect(wrapper.find('.admin-profile__input').element.value).toBe('')
  })

  it('muestra error si el store rechaza el cambio de contraseña', async () => {
    authStoreMock.changePassword.mockRejectedValue(new Error('auth/wrong-password'))
    const wrapper = mount(AdminProfileView)

    await wrapper.find('.admin-profile__input').setValue('malaClave1')
    await wrapper.find('#new-password').setValue('nueva1234')
    await wrapper.find('#confirm-password').setValue('nueva1234')
    await wrapper.find('.admin-profile__btn-update').trigger('click')
    await Promise.resolve()
    await Promise.resolve()

    expect(wrapper.text()).toContain('Contraseña actual incorrecta')
  })

  it('muestra error si updateAvatar falla', async () => {
    authStoreMock.updateAvatar.mockRejectedValue(new Error('storage/error'))
    const wrapper = mount(AdminProfileView)

    await wrapper.find('.admin-profile__avatar-option').trigger('click')
    await wrapper.find('.admin-profile__btn-sm').trigger('click')
    await Promise.resolve()

    expect(wrapper.text()).toContain('Error al guardar el avatar')
  })

  it('muestra error si updateBg falla', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    authStoreMock.updateBg.mockRejectedValue(new Error('storage/error'))
    const wrapper = mount(AdminProfileView)

    await wrapper.find('.admin-profile__bg-option').trigger('click')
    await wrapper.findAll('.admin-profile__btn-sm')[1].trigger('click')
    await Promise.resolve()

    expect(wrapper.text()).toContain('Error al guardar el fondo')
  })

  it('rechaza la subida de un archivo que no es imagen', async () => {
    const wrapper = mount(AdminProfileView)
    const input = wrapper.find('.admin-profile__file-input')
    const file = new File(['contenido'], 'documento.pdf', { type: 'application/pdf' })
    Object.defineProperty(input.element, 'files', { value: [file] })

    await input.trigger('change')

    expect(wrapper.text()).toContain('Solo se permiten imágenes')
    expect(uploadAvatarToStorage).not.toHaveBeenCalled()
  })

  it('sube una imagen válida y actualiza el avatar', async () => {
    uploadAvatarToStorage.mockResolvedValue('https://storage.test/avatar.png')
    const wrapper = mount(AdminProfileView)
    const input = wrapper.find('.admin-profile__file-input')
    const file = new File(['contenido'], 'foto.png', { type: 'image/png' })
    Object.defineProperty(input.element, 'files', { value: [file] })

    await input.trigger('change')
    await Promise.resolve()
    await Promise.resolve()

    expect(uploadAvatarToStorage).toHaveBeenCalledWith('admin-1', file)
    expect(authStoreMock.updateAvatar).toHaveBeenCalledWith('https://storage.test/avatar.png')
    expect(wrapper.text()).toContain('✓ Avatar guardado')
  })
})
