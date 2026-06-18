import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '../favorites-store'

// Mock del servicio de Firestore para no hacer peticiones reales en los tests
vi.mock('@/api/user.service', () => ({
  updateUserFavorites: vi.fn(() => Promise.resolve())
}))

// Mock del store de auth: evita que onAuthStateChanged real interfiera en los tests
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    user: { uid: 'test-uid-123' }
  })
}))

const mockGame = {
  id: 1,
  title: 'Test Game',
  thumbnail: 'https://example.com/img.jpg',
  genre: 'Action',
  platform: 'PC'
}

describe('favoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicia con la lista de favoritos vacía', () => {
    const store = useFavoritesStore()
    expect(store.favoritesList).toHaveLength(0)
  })

  // 🔴 RED → 🟢 GREEN: ST06 y ST07
  it('addToFavorites añade el juego al array del store', async () => {
    const store = useFavoritesStore()
    await store.addToFavorites(mockGame)

    expect(store.favoritesList).toHaveLength(1)
    expect(store.favoritesList[0].title).toBe('Test Game')
  })

  // 🔴 RED → 🟢 GREEN
  it('addToFavorites no añade un juego duplicado', async () => {
    const store = useFavoritesStore()
    await store.addToFavorites(mockGame)
    await store.addToFavorites(mockGame)

    expect(store.favoritesList).toHaveLength(1)
  })

  it('isFavorite devuelve true si el juego está guardado', async () => {
    const store = useFavoritesStore()
    await store.addToFavorites(mockGame)

    expect(store.isFavorite(1)).toBe(true)
  })

  it('isFavorite devuelve false si el juego no está guardado', () => {
    const store = useFavoritesStore()
    expect(store.isFavorite(99)).toBe(false)
  })

  it('loadFavorites carga la lista recibida correctamente', () => {
    const store = useFavoritesStore()
    store.loadFavorites([mockGame])

    expect(store.favoritesList).toHaveLength(1)
  })

  it('loadFavorites con undefined deja la lista vacía', () => {
    const store = useFavoritesStore()
    store.loadFavorites(undefined)

    expect(store.favoritesList).toHaveLength(0)
  })

  // 🔴 RED → 🟢 GREEN
  it('removeFromFavorites elimina el juego correcto del store', async () => {
    const store = useFavoritesStore()
    await store.addToFavorites(mockGame)
    await store.removeFromFavorites(mockGame.id)

    expect(store.favoritesList).toHaveLength(0)
  })

  it('removeFromFavorites no afecta a otros juegos guardados', async () => {
    const store = useFavoritesStore()
    const otherGame = { ...mockGame, id: 2, title: 'Other Game' }

    await store.addToFavorites(mockGame)
    await store.addToFavorites(otherGame)
    await store.removeFromFavorites(mockGame.id)

    expect(store.favoritesList).toHaveLength(1)
    expect(store.favoritesList[0].id).toBe(2)
  })
})