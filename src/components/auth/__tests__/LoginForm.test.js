import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import LoginForm from '../LoginForm.vue'

// Mock del servicio de login para no hacer peticiones reales a Firebase
vi.mock('@/services/auth-service', () => ({
  loginUser: vi.fn()
}))

// Mock del store de auth para no depender de Firebase
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    setUser: vi.fn()
  })
}))

// Mock del router para verificar redirecciones sin navegar realmente
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

import { loginUser } from '@/services/auth-service'

describe('LoginForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  // Tests de validación de email
  it('muestra error cuando el email está vacío al perder el foco', async () => {
    const wrapper = mount(LoginForm)
    const emailInput = wrapper.find('#email')
    await emailInput.trigger('blur')
    expect(wrapper.find('#email-error').text()).toBe('El correo electrónico es obligatorio')
  })

  it('muestra error cuando el email tiene formato inválido', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.find('#email').setValue('correo-invalido')
    await wrapper.find('#email').trigger('blur')
    expect(wrapper.find('#email-error').text()).toBe('Introduce un correo electrónico válido')
  })

  it('no muestra error cuando el email tiene formato válido', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.find('#email').setValue('test@fps.io')
    await wrapper.find('#email').trigger('blur')
    expect(wrapper.find('#email-error').exists()).toBe(false)
  })

  // Tests de validación de contraseña
  it('muestra error cuando la contraseña está vacía al perder el foco', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.find('#password').trigger('blur')
    expect(wrapper.find('#password-error').text()).toBe('La contraseña es obligatoria')
  })

  it('no muestra error cuando la contraseña tiene contenido', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('#password').trigger('blur')
    expect(wrapper.find('#password-error').exists()).toBe(false)
  })

  // Tests del envío del formulario
  it('no envía el formulario si hay errores de validación', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.find('form').trigger('submit')
    expect(loginUser).not.toHaveBeenCalled()
  })

  it('muestra error general con credenciales incorrectas', async () => {
    loginUser.mockRejectedValue({ code: 'auth/invalid-credential' })

    const wrapper = mount(LoginForm)
    await wrapper.find('#email').setValue('test@fps.io')
    await wrapper.find('#password').setValue('wrongpassword')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('.login-form__error-general').text()).toBe('Correo o contraseña incorrectos')
  })

  it('muestra error cuando el acceso está restringido', async () => {
    loginUser.mockRejectedValue({ code: 'auth/access-restricted' })

    const wrapper = mount(LoginForm)
    await wrapper.find('#email').setValue('test@fps.io')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('.login-form__error-general').text()).toContain('restringido')
  })

  it('el botón muestra "Iniciando sesión..." mientras carga', async () => {
    loginUser.mockReturnValue(new Promise(() => {})) // promesa que nunca resuelve

    const wrapper = mount(LoginForm)
    await wrapper.find('#email').setValue('test@fps.io')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.find('button[type="submit"]').text()).toBe('Iniciando sesión...')
  })
})