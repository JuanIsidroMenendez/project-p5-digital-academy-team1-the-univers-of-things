<!-- Vista principal: hero, bento destacados, catalogo con paginacion -->
<script setup>
import { ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import AppPagination from '@/components/layout/AppPagination.vue'
import HeroSection from '@/components/home/HeroSection.vue'

const currentPage = ref(1)
const totalPages = ref(12)

function handlePageChange(page) {
    currentPage.value = page
    // TODO: cuando Juan conecte la API, cargar los juegos de la pagina solicitada
}
</script>

<template>
    <MainLayout>

        <HeroSection />

        <!-- Busqueda y filtros -->
        <form class="catalog-filters" role="search" aria-label="Búsqueda y filtros del catálogo">

            <div class="catalog-filters__search">
                <svg class="catalog-filters__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                    aria-hidden="true">
                    <path
                        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <label for="game-search" class="visually-hidden">Buscar juego por nombre</label>
                <input id="game-search" class="catalog-filters__input" type="search" placeholder="Buscar juego..." />
            </div>

            <div class="catalog-filters__selects">
                <label for="genre-filter" class="visually-hidden">Filtrar por género</label>
                <select id="genre-filter" class="catalog-filters__select">
                    <option value="">Género: Todos</option>
                    <option value="action">Acción</option>
                    <option value="rpg">RPG</option>
                    <option value="strategy">Estrategia</option>
                    <option value="shooter">Shooter</option>
                </select>

                <label for="platform-filter" class="visually-hidden">Filtrar por plataforma</label>
                <select id="platform-filter" class="catalog-filters__select">
                    <option value="">Plataforma: Todas</option>
                    <option value="pc">PC</option>
                    <option value="browser">Navegador</option>
                </select>
            </div>

        </form>

        <!-- Destacados bento -->
        <section class="destacados-home" aria-labelledby="destacados-title">
            <div class="destacados-home__inner">

                <h2 id="destacados-title" class="section-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                    </svg>
                    Destacados
                </h2>

                <div class="bento">
                    <article class="bento__card bento__card--big">
                        <div class="bento__bg bento__bg--purple" aria-hidden="true"></div>
                        <div class="bento__overlay" aria-hidden="true"></div>
                        <div class="bento__content">
                            <span class="bento__badge">
                                <span class="bento__badge-dot" aria-hidden="true"></span>
                                Destacado
                            </span>
                            <h3 class="bento__title">Neon Odyssey</h3>
                            <p class="bento__desc">
                                Explora un universo cyberpunk masivo.
                                Miles de jugadores, una sola misión.
                            </p>
                        </div>
                    </article>

                    <article class="bento__card bento__card--small">
                        <div class="bento__bg bento__bg--red" aria-hidden="true"></div>
                        <div class="bento__overlay" aria-hidden="true"></div>
                        <div class="bento__content bento__content--sm">
                            <span class="bento__badge">
                                <span class="bento__badge-dot" aria-hidden="true"></span>
                                Destacado
                            </span>
                            <h3 class="bento__title bento__title--sm">Chrome Rebellion</h3>
                            <p class="bento__desc--sm">Acción táctica en entornos post-apocalípticos.</p>
                        </div>
                    </article>

                    <article class="bento__card bento__card--small">
                        <div class="bento__bg bento__bg--green" aria-hidden="true"></div>
                        <div class="bento__overlay" aria-hidden="true"></div>
                        <div class="bento__content bento__content--sm">
                            <span class="bento__badge">
                                <span class="bento__badge-dot" aria-hidden="true"></span>
                                Destacado
                            </span>
                            <h3 class="bento__title bento__title--sm">Void Protocol</h3>
                            <p class="bento__desc--sm">Estrategia en tiempo real, espacio profundo.</p>
                        </div>
                    </article>
                </div>

            </div>
        </section>

        <!-- Catalogo -->
        <section class="catalog-home" aria-labelledby="catalogo-title">
            <div class="catalog-home__inner">

                <h2 id="catalogo-title" class="section-label">El catálogo</h2>

                <ul class="catalog-home__grid">
                    <li v-for="index in 10" :key="index" class="catalog-home__item">
                        <article class="card catalog-home__placeholder" aria-label="Cargando juego...">
                            <div class="card__thumb">
                                <div class="card__thumb-bg catalog-home__placeholder-bg" aria-hidden="true"></div>
                            </div>
                            <div class="card__body">
                                <div class="card__header">
                                    <span class="card__title">Cargando...</span>
                                </div>
                            </div>
                        </article>
                    </li>
                </ul>

                <AppPagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />

            </div>
        </section>

    </MainLayout>
</template>