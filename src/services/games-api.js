const API_URL = 'https://www.mmobomb.com/api1/games'
//const API_URL = 'https://www.mmobomb.com/api1/games/test-error'  //API errónea para probar pantalla de error.

export async function getGames() {
        try {
            const response = await fetch(API_URL)
            if (!response.ok) throw new Error(`Error ${response.status}`)     
            return await response.json()           
        }
        catch (error) {
                console.error('Error fetching games:', error)
                throw error
        }
}

export async function getGameById(id) {
  try {
    const games = await getGames()
    const game = games.find((g) => g.id === Number(id))
    if (!game) throw new Error('Juego no encontrado')
    return game
  } catch (error) {
    console.error('Error fetching game by id:', error)
    throw error
  }
}
