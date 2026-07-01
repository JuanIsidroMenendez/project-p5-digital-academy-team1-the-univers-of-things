import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DashboardHeader from '../DashboardHeader.vue'

// Mock del router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  }),
  RouterLink: {
    name: 'RouterLink',
    template: '<a><slot /></a>',
    props: ['to']
  }
}))

// Mock del store de auth
const mockLogout = vi.fn()

vi.mock('@/stores/auth.js', () => ({
  useAuthStore: () => ({
    logout: mockLogout,
    isAdmin: false,
    profile: { username: 'TestUser' },
    user: { email: 'test@fps.io' }
  })
}))

describe('DashboardHeader', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('muestra el nombre de usuario del perfil', () => {
    const wrapper = mount(DashboardHeader)
    expect(wrapper.find('.dashboard-header__username').text()).toBe('TestUser')
  })

  it('muestra el badge CLIENTE para usuario customer', () => {
    const wrapper = mount(DashboardHeader)
    const badge = wrapper.find('.dashboard-header__badge')
    expect(badge.text()).toBe('CLIENTE')
    expect(badge.classes()).toContain('dashboard-header__badge--customer')
  })

  it('muestra "Dashboard" en el logo para usuario customer', () => {
    const wrapper = mount(DashboardHeader)
    expect(wrapper.find('.dashboard-header__logo-section').text()).toBe('Dashboard')
  })

  it('llama a auth.logout y redirige a / al hacer clic en cerrar sesión', async () => {
    const mockPush = vi.fn()
    vi.mocked(vi.importMock('vue-router'))
    
    const wrapper = mount(DashboardHeader)
    await wrapper.find('.dashboard-header__logout').trigger('click')
    
    expect(mockLogout).toHaveBeenCalled()
  })
})