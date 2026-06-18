import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFeaturedConfig, setMonthlyGame, addFeaturedGame, removeFeaturedGame } from '@/api/featured.service.js'
import { getGames } from '@/services/games-api.js'

export const useFeaturedStore = defineStore('featured', () => {
    const catalog = ref([])
    const featuredList = ref([])
    const gameOfTheMonth = ref(null)

    async function fetchAll() {
        const games = await getGames()
        const featuredConfig = await getFeaturedConfig()
        catalog.value = games
        featuredList.value = featuredConfig.featuredGames.map(id => games.find(g => g.id === id))
        gameOfTheMonth.value = games.find(g => g.id === featuredConfig.monthlyGame) ?? null


    }

    async function addFeatured(game) {
        if (featuredList.value.length >= 6) return
        await addFeaturedGame(game.id)
        featuredList.value.push(game)
    }

    async function removeFeatured(game) {
        await removeFeaturedGame(game.id)
        featuredList.value = featuredList.value.filter(g => g.id !== game.id)
    }

    async function selectMonthly(game) {
        await setMonthlyGame(game?.id ?? null)
        gameOfTheMonth.value = game
    }

    return { catalog, featuredList, gameOfTheMonth, fetchAll, addFeatured, removeFeatured, selectMonthly }
})


