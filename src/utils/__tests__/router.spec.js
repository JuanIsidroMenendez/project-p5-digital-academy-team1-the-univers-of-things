import { describe, test, expect, vi, beforeEach } from 'vitest'

vi.mock('@/api/firebase', () => ({ auth: {} }))
vi.mock('@/stores/auth', () => ({ useAuthStore: vi.fn() }))

import { useAuthStore } from '@/stores/auth'
import router from '@/router/index.js'
import { createPinia, setActivePinia } from 'pinia'

describe('Router Guards', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('redirige a /login si la ruta requiere auth y no hay sesión', async () => {
        useAuthStore.mockReturnValue({
            user: null,
            isAdmin: false,
            isCustomer: false,
            loading: false
        })
        await router.push('/dashboard')
        expect(router.currentRoute.value.path).toBe('/login')
    })

    test('redirige a /dashboard si la ruta requiere admin y no hay rol admin', async () => {
        useAuthStore.mockReturnValue({
            user: { uid: '123' },
            isAdmin: false,
            isCustomer: true,
            loading: false
        })
        await router.push('/admin')
        expect(router.currentRoute.value.path).toBe('/dashboard/profile')
        })

    test('no redirige en rutas públicas sin meta', async () => {
        useAuthStore.mockReturnValue({
            user: null,
            isAdmin: false,
            isCustomer: false,
            loading: false
        })
        await router.push('/catalog')
        expect(router.currentRoute.value.path).toBe('/catalog')
    })

    test('permite navegar a ruta protegida si hay sesión', async () => {
        useAuthStore.mockReturnValue({
            user: { uid: '123' },
            isAdmin: false,
            isCustomer: true,
            loading: false
        })
        await router.push('/dashboard/favorites')
        expect(router.currentRoute.value.path).toBe('/dashboard/favorites')
    })

    test('permite navegar a ruta admin si isAdmin es true', async () => {
        useAuthStore.mockReturnValue({
            user: { uid: '123' },
            isAdmin: true,
            isCustomer: false,
            loading: false
        })
        await router.push('/admin/users')
        expect(router.currentRoute.value.path).toBe('/admin/users')
    })
    })