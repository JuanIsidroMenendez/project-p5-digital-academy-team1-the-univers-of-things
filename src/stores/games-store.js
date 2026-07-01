import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getGames } from '@/services/games-api'

export const useGamesStore = defineStore('games', () => {

  const games = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const hasLoaded = ref(false)      //hasLoaded evita volver a llamar a la API.

  async function fetchGames() {
    if (hasLoaded.value) return // Lo mismo: al tener los datos en el caché, no se piden de nuevo a la API.

    isLoading.value = true
    error.value = null

    try {
      games.value = await getGames()
      hasLoaded.value = true
    } catch (e) {
      error.value = 'Error al cargar los juegos. Inténtalo de nuevo más tarde.'
    } finally {
      isLoading.value = false
    }
  }

  // Obtiene el juego por id desde el store, sin llamar a la API
  function getGameById(id) {
    return games.value.find(game => game.id === Number(id)) ?? null
  }

  return {
    games,
    isLoading,
    error,
    hasLoaded,
    fetchGames,
    getGameById
  }
})