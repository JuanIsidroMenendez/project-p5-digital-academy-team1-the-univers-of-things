import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getGames, getGameById } from '../games-api.js'

const mockGames = [
  { id: 1, title: 'Quantum Strike' },
  { id: 2, title: 'Neon Odyssey' },
]

describe('games-api', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('getGames devuelve los juegos cuando la respuesta es ok', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGames),
    })

    const result = await getGames()

    expect(result).toEqual(mockGames)
  })

  it('getGames lanza error si la respuesta no es ok', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    fetch.mockResolvedValue({ ok: false, status: 500 })

    await expect(getGames()).rejects.toThrow('Error 500')
  })

  it('getGames propaga el error si fetch rechaza', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    fetch.mockRejectedValue(new Error('Network error'))

    await expect(getGames()).rejects.toThrow('Network error')
  })
})
