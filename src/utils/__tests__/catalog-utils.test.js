import { describe, it, expect } from 'vitest'
import { filterByText, filterByGenre, paginateGames } from '../catalog-utils'
const mockGames = [
    { id: 1, title: 'Lost Ark', genre: 'MMORPG', platform: 'PC (Windows)' },
    { id: 2, title: 'Fortnite', genre: 'Shooter', platform: 'PC (Windows)' },
    { id: 3, title: 'Albion Online', genre: 'MMORPG', platform: 'PC (Windows)' }
]

describe('filterByText', () => {
    it('devuelve solo los juegos que contienen el texto buscado', () => {
        const result = filterByText(mockGames, 'lost')
        expect(result).toHaveLength(1)
        expect(result[0].title).toBe('Lost Ark')
    })

    it('devuelve todos los juegos si el texto esta vacio', () => {
        const result = filterByText(mockGames, '')
        expect(result).toHaveLength(3)
    })

    it('la busqueda no distingue mayusculas de minusculas', () => {
        const result = filterByText(mockGames, 'FORTNITE')
        expect(result).toHaveLength(1)
        expect(result[0].title).toBe('Fortnite')
    })
})

describe('filterByGenre', () => {
    it('devuelve solo los juegos del genero seleccionado', () => {
        const result = filterByGenre(mockGames, 'mmorpg')
        expect(result).toHaveLength(2)
        expect(result[0].title).toBe('Lost Ark')
    })

    it('devuelve todos los juegos si el genero esta vacio', () => {
        const result = filterByGenre(mockGames, '')
        expect(result).toHaveLength(3)
    })
})

describe('paginateGames', () => {
    it('devuelve el subconjunto correcto segun la pagina activa', () => {
        const games = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, title: `Game ${i + 1}` }))
        const result = paginateGames(games, 2, 10)
        expect(result).toHaveLength(10)
        expect(result[0].title).toBe('Game 11')
    })

    it('devuelve los juegos restantes en la ultima pagina', () => {
        const games = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, title: `Game ${i + 1}` }))
        const result = paginateGames(games, 3, 10)
        expect(result).toHaveLength(5)
        expect(result[0].title).toBe('Game 21')
    })
})