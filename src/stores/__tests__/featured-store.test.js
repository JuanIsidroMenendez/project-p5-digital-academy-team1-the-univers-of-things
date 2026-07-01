import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFeaturedStore } from '../featured-store.js'

vi.mock('@/api/featured.service.js', () => ({
  getFeaturedConfig: vi.fn(() => Promise.resolve({ featuredGames: [1, 2], monthlyGame: 1 })),
  addFeaturedGame: vi.fn(() => Promise.resolve()),
  removeFeaturedGame: vi.fn(() => Promise.resolve()),
  setMonthlyGame: vi.fn(() => Promise.resolve()),
}))

vi.mock('@/services/games-api.js', () => ({
  getGames: vi.fn(() => Promise.resolve([
    { id: 1, title: 'Game One' },
    { id: 2, title: 'Game Two' },
    { id: 3, title: 'Game Three' },
  ])),
}))

const mockGame = { id: 3, title: 'Game Three' }

describe('featuredStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('inicia con listas vacías', () => {
    const store = useFeaturedStore()
    expect(store.catalog).toHaveLength(0)
    expect(store.featuredList).toHaveLength(0)
    expect(store.gameOfTheMonth).toBeNull()
  })

  it('fetchAll carga el catálogo completo', async () => {
    const store = useFeaturedStore()
    await store.fetchAll()
    expect(store.catalog).toHaveLength(3)
  })

  it('fetchAll mapea featuredList con los juegos correctos', async () => {
    const store = useFeaturedStore()
    await store.fetchAll()
    expect(store.featuredList).toHaveLength(2)
    expect(store.featuredList[0].title).toBe('Game One')
    expect(store.featuredList[1].title).toBe('Game Two')
  })

  it('fetchAll asigna gameOfTheMonth correctamente', async () => {
    const store = useFeaturedStore()
    await store.fetchAll()
    expect(store.gameOfTheMonth.id).toBe(1)
  })

  it('añade un juego si hay menos de 6', async () => {
    const store = useFeaturedStore()
    await store.addFeatured(mockGame)
    expect(store.featuredList).toHaveLength(1)
    expect(store.featuredList[0].title).toBe('Game Three')
  })

  it('no añade el juego si ya hay 6', async () => {
    const store = useFeaturedStore()
    const games = [1, 2, 3, 4, 5, 6].map(id => ({ id, title: `Game ${id}` }))
    for (const g of games) await store.addFeatured(g)

    await store.addFeatured({ id: 7, title: 'Game Seven' })
    expect(store.featuredList).toHaveLength(6)
  })

  it('removeFeatured elimina el juego correcto', async () => {
    const store = useFeaturedStore()
    await store.addFeatured(mockGame)
    await store.addFeatured({ id: 99, title: 'Otro' })

    await store.removeFeatured(mockGame)
    expect(store.featuredList).toHaveLength(1)
    expect(store.featuredList[0].id).toBe(99)
  })

  it('removeFeatured deja la lista vacía si solo había un juego', async () => {
    const store = useFeaturedStore()
    await store.addFeatured(mockGame)
    await store.removeFeatured(mockGame)
    expect(store.featuredList).toHaveLength(0)
  })

  it('selectMonthly establece el juego del mes', async () => {
    const store = useFeaturedStore()
    await store.selectMonthly(mockGame)
    expect(store.gameOfTheMonth).toEqual(mockGame)
  })

  it('selectMonthly con null limpia el juego del mes', async () => {
    const store = useFeaturedStore()
    await store.selectMonthly(mockGame)
    await store.selectMonthly(null)
    expect(store.gameOfTheMonth).toBeNull()
  })

  it('fetchAll no incluye undefined si un ID de Firestore no existe en el catalogo', async () => {
    const { getFeaturedConfig } = await import('@/api/featured.service.js')
    getFeaturedConfig.mockResolvedValueOnce({ featuredGames: [1, 999], monthlyGame: 1 })

    const store = useFeaturedStore()
    await store.fetchAll()

    expect(store.featuredList.every(g => g !== undefined)).toBe(true)
    expect(store.featuredList).toHaveLength(1)
    expect(store.featuredList[0].id).toBe(1)
  })
})