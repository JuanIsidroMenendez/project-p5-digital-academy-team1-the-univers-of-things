import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/api/firebase', () => ({ auth: {} }))
vi.mock('@/stores/auth', () => ({ useAuthStore: vi.fn() }))

import { useAuthStore } from '@/stores/auth'
import AppHeader from '../AppHeader.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: { template: '<div />' } },
        { path: '/login', component: { template: '<div />' } },
        { path: '/register', component: { template: '<div />' } },
        { path: '/dashboard', component: { template: '<div />' } },
        { path: '/admin', component: { template: '<div />' } }
    ]
})

describe('AppHeader', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('muestra botones de login y registro cuando no hay sesion', () => {
        useAuthStore.mockReturnValue({
            user: null,
            profile: null,
            logout: vi.fn()
        })

        const wrapper = mount(AppHeader, {
            global: { plugins: [router] }
        })

        expect(wrapper.text()).toContain('Iniciar sesión')
        expect(wrapper.text()).toContain('Registrarse')
        expect(wrapper.text()).not.toContain('Cerrar sesión')
    })

    test('muestra nombre de usuario y cerrar sesion cuando hay sesion', () => {
        useAuthStore.mockReturnValue({
            user: { email: 'iulian@test.com' },
            profile: { username: 'Iulian' },
            logout: vi.fn()
        })

        const wrapper = mount(AppHeader, {
            global: { plugins: [router] }
        })

        expect(wrapper.text()).toContain('Iulian')
        expect(wrapper.text()).toContain('Cerrar sesión')
        expect(wrapper.text()).not.toContain('Iniciar sesión')
    })

    test('usuario admin es redirigido a /admin', () => {
        useAuthStore.mockReturnValue({
            user: { email: 'admin@test.com' },
            profile: { username: 'Admin', role: 'role:admin' },
            logout: vi.fn()
        })

        const wrapper = mount(AppHeader, {
            global: { plugins: [router] }
        })

        const link = wrapper.find('a.btn--ghost')
        expect(link.attributes('href')).toBe('/admin/users')
    })

    test('usuario customer es redirigido a /dashboard', () => {
        useAuthStore.mockReturnValue({
            user: { email: 'iulian@test.com' },
            profile: { username: 'Iulian', role: 'role:customer' },
            logout: vi.fn()
        })

        const wrapper = mount(AppHeader, {
            global: { plugins: [router] }
        })

        const link = wrapper.find('a.btn--ghost')
        expect(link.attributes('href')).toBe('/dashboard')
    })
})