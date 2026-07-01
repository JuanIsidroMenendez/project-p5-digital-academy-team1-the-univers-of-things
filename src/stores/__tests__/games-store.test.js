import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGamesStore } from '../games-store.js'

const mockGames = [
  { id: 1, title: 'Quantum Strike' },
  { id: 2, title: 'Neon Odyssey' },
]

vi.mock('@/services/games-api', () => ({
  getGames: vi.fn(() => Promise.resolve(mockGames)),
}))

import { getGames } from '@/services/games-api'

describe('gamesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    getGames.mockResolvedValue(mockGames)
  })

  it('fetchGames carga los juegos y marca hasLoaded', async () => {
    const store = useGamesStore()

    await store.fetchGames()

    expect(store.games).toEqual(mockGames)
    expect(store.hasLoaded).toBe(true)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('fetchGames no vuelve a llamar a la API si hasLoaded ya es true', async () => {
    const store = useGamesStore()

    await store.fetchGames()
    await store.fetchGames()

    expect(getGames).toHaveBeenCalledTimes(1)
  })
})
