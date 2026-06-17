import { defineStore } from 'pinia'
import { ref } from 'vue'
import { updateUserFavorites } from '@/api/user.service'
import { useAuthStore } from '@/stores/auth'

export const useFavoritesStore = defineStore('favorites', () => {
  // Estado: lista de juegos favoritos del usuario actual
  const favoritesList = ref([])

  // Carga los favoritos desde el perfil del usuario (llamarlo tras login)
  function loadFavorites(userFavorites) {
    favoritesList.value = userFavorites || []
  }

  // Comprueba si un juego ya está en favoritos
  function isFavorite(gameId) {
    return favoritesList.value.some((game) => game.id === gameId)
  }

  // Añade un juego a favoritos, comprobando duplicados antes de añadir (SC49)
  async function addToFavorites(game) {
    const exists = isFavorite(game.id)
    if (exists) return

    // Estructura mínima del favorito guardado en Firestore
    const favoriteData = {
      id: game.id,
      title: game.title,
      thumbnail: game.thumbnail,
      genre: game.genre,
      platform: game.platform,
      customTitle: '',
      customContent: '',
      rating: 0
    }

    favoritesList.value.push(favoriteData)

    // Persistir en Firestore vinculado al uid del usuario autenticado
    const authStore = useAuthStore()
    await updateUserFavorites(authStore.user.uid, favoritesList.value)
  }

  return {
    favoritesList,
    loadFavorites,
    isFavorite,
    addToFavorites
  }
})