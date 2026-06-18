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

// 🔵 REFACTOR: función auxiliar que centraliza la persistencia en Firestore,
  // evitando repetir "obtener authStore + llamar a updateUserFavorites"
  // en cada acción que modifica la lista de favoritos
  async function persistFavorites() {
    const authStore = useAuthStore()
    await updateUserFavorites(authStore.user.uid, favoritesList.value)
  }

  // Añade un juego a favoritos, comprobando duplicados antes de añadir
  async function addToFavorites(game) {
    const exists = isFavorite(game.id)
    if (exists) return

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
    await persistFavorites()
  }

  // Elimina un juego de favoritos por su id
  async function removeFromFavorites(gameId) {
    favoritesList.value = favoritesList.value.filter((game) => game.id !== gameId)
    await persistFavorites()
  }

  return {
    favoritesList,
    loadFavorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites
  }
})