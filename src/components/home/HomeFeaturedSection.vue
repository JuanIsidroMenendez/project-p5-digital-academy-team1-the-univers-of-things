<!-- Seccion de destacados en la homepage: bento grid con juegos destacados -->
<script setup>
import { computed } from 'vue'
import { useFeaturedStore } from '@/stores/featured-store'

const featuredStore = useFeaturedStore()
const featuredList = computed(() => featuredStore.featuredList)
</script>

<template>
    <section class="destacados-home" aria-labelledby="destacados-title">
        <div class="destacados-home__inner">

            <h2 id="destacados-title" class="section-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
                Destacados
            </h2>

            <div v-if="featuredList.length > 0" class="bento">
                <RouterLink v-if="featuredList[0]" :to="{ name: 'game-detail', params: { id: featuredList[0].id } }"
                    class="bento__card bento__card--big" :aria-label="`Ver detalle de ${featuredList[0].title}`">
                    <img :src="featuredList[0].thumbnail" :alt="featuredList[0].title" class="bento__bg" />
                    <div class="bento__overlay" aria-hidden="true"></div>
                    <div class="bento__content">
                        <span class="bento__badge">
                            <span class="bento__badge-dot" aria-hidden="true"></span>
                            Destacado
                        </span>
                        <h3 class="bento__title">{{ featuredList[0].title }}</h3>
                        <p class="bento__desc">{{ featuredList[0].short_description }}</p>
                    </div>
                </RouterLink>

                <RouterLink v-if="featuredList[1]" :to="{ name: 'game-detail', params: { id: featuredList[1].id } }"
                    class="bento__card bento__card--small" :aria-label="`Ver detalle de ${featuredList[1].title}`">
                    <img :src="featuredList[1].thumbnail" :alt="featuredList[1].title" class="bento__bg" />
                    <div class="bento__overlay" aria-hidden="true"></div>
                    <div class="bento__content bento__content--sm">
                        <span class="bento__badge">
                            <span class="bento__badge-dot" aria-hidden="true"></span>
                            Destacado
                        </span>
                        <h3 class="bento__title bento__title--sm">{{ featuredList[1].title }}</h3>
                        <p class="bento__desc bento__desc--sm">{{ featuredList[1].short_description }}</p>
                    </div>
                </RouterLink>

                <RouterLink v-if="featuredList[2]" :to="{ name: 'game-detail', params: { id: featuredList[2].id } }"
                    class="bento__card bento__card--small" :aria-label="`Ver detalle de ${featuredList[2].title}`">
                    <img :src="featuredList[2].thumbnail" :alt="featuredList[2].title" class="bento__bg" />
                    <div class="bento__overlay" aria-hidden="true"></div>
                    <div class="bento__content bento__content--sm">
                        <span class="bento__badge">
                            <span class="bento__badge-dot" aria-hidden="true"></span>
                            Destacado
                        </span>
                        <h3 class="bento__title bento__title--sm">{{ featuredList[2].title }}</h3>
                        <p class="bento__desc bento__desc--sm">{{ featuredList[2].short_description }}</p>
                    </div>
                </RouterLink>
            </div>

            <p v-else class="destacados-home__empty">
                El administrador no ha configurado juegos destacados todavía.
            </p>

        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.destacados-home {
    padding: 0 1rem 2.5rem;

    @media (min-width: $bp-tablet) {
        padding: 0 2rem 3rem;
    }

    @media (min-width: $bp-desktop) {
        padding: 0 4rem 3.5rem;
        max-width: $bp-wide;
        margin: 0 auto;
    }
}
</style>