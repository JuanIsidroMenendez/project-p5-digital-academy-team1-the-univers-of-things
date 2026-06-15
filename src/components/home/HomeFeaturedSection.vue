<!-- Seccion de destacados en la homepage: bento grid con juegos destacados -->
<script setup>
// TODO: recibir datos del store cuando Iuliam implemente la gestion de destacados
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