<!-- Seccion catalogo en homepage: buscador, filtros, grid de juegos y paginacion -->
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import AppPagination from '@/components/layout/AppPagination.vue'
import { getGames } from '@/services/games-api.js'

const games = ref([])
const isLoading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const selectedGenre = ref('')
const selectedPlatform = ref('')
const currentPage = ref(1)
const gamesPerPage = 10

onMounted(async () => {
    isLoading.value = true
    try {
        games.value = await getGames()
    } catch (e) {
        error.value = 'Error al cargar los juegos. Intentalo de nuevo.'
    } finally {
        isLoading.value = false
    }
})

const filteredGames = computed(() => {
    return games.value.filter(game => {
        const matchSearch = game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchGenre = selectedGenre.value === '' || game.genre.toLowerCase() === selectedGenre.value
        const matchPlatform = selectedPlatform.value === '' || game.platform.toLowerCase().includes(selectedPlatform.value)
        return matchSearch && matchGenre && matchPlatform
    })
})

const totalPages = computed(() => Math.ceil(filteredGames.value.length / gamesPerPage))

const paginatedGames = computed(() => {
    const start = (currentPage.value - 1) * gamesPerPage
    return filteredGames.value.slice(start, start + gamesPerPage)
})

watch([searchQuery, selectedGenre, selectedPlatform], () => {
    currentPage.value = 1
})

function handlePageChange(page) {
    currentPage.value = page
}
</script>

<template>
    <section class="catalog-home" aria-labelledby="catalogo-title">
        <div class="catalog-home__inner">

            <h2 id="catalogo-title" class="section-label">El catálogo</h2>

            <form class="catalog-filters" role="search" aria-label="Busqueda y filtros del catalogo">
                <div class="catalog-filters__search">
                    <svg class="catalog-filters__search-icon" width="16" height="16" viewBox="0 0 24 24"
                        fill="currentColor" aria-hidden="true">
                        <path
                            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                    <label for="game-search" class="visually-hidden">Buscar juego por nombre</label>
                    <input id="game-search" v-model="searchQuery" class="catalog-filters__input" type="search"
                        placeholder="Buscar juego..." />
                </div>

                <div class="catalog-filters__selects">
                    <label for="genre-filter" class="visually-hidden">Filtrar por género</label>
                    <select id="genre-filter" v-model="selectedGenre" class="catalog-filters__select">
                        <option value="">Género: Todos</option>
                        <option value="action">Acción</option>
                        <option value="rpg">RPG</option>
                        <option value="strategy">Estrategia</option>
                        <option value="shooter">Shooter</option>
                    </select>

                    <label for="platform-filter" class="visually-hidden">Filtrar por plataforma</label>
                    <select id="platform-filter" v-model="selectedPlatform" class="catalog-filters__select">
                        <option value="">Plataforma: Todas</option>
                        <option value="pc">PC</option>
                        <option value="browser">Navegador</option>
                    </select>
                </div>
            </form>

            <div v-if="isLoading" class="catalog-home__loading">
                Cargando juegos...
            </div>

            <div v-else-if="error" class="catalog-home__error">
                {{ error }}
            </div>

            <template v-else>
                <ul v-if="paginatedGames.length > 0" class="catalog-home__grid">
                    <li v-for="(game, index) in paginatedGames" :key="game.id ?? index">
                        <article class="card" aria-label="{{ game.title }}">
                            <div class="card__thumb">
                                <img :src="game.thumbnail" :alt="game.title" class="card__thumb-bg" />
                            </div>
                            <div class="card__body">
                                <div class="card__header">
                                    <span class="card__title">{{ game.title }}</span>
                                </div>
                                <p class="card__description">{{ game.short_description }}</p>
                                <div class="card__meta">
                                    <span class="badge badge--platform">{{ game.platform }}</span>
                                    <span class="badge badge--action">{{ game.genre }}</span>
                                </div>
                            </div>
                        </article>
                    </li>
                </ul>

                <p v-else class="catalog-home__empty">Sin resultados para tu búsqueda.</p>

                <AppPagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
            </template>

        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;
</style>