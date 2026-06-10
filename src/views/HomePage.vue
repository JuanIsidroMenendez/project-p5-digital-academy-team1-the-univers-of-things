<!-- Vista principal: hero, bento destacados, catalogo con paginacion -->
<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
</script>

<template>
    <MainLayout>

        <!-- Hero --> 
        <section class="hero" aria-labelledby="hero-title">
            <div class="hero__content">

                <div class="hero__left">

                    <span class="hero__tag">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                        </svg>
                        El único género que importa
                    </span>

                    <h1 id="hero-title" class="hero__title" aria-label="FPS">FPS</h1>

                    <div class="hero__acronym" aria-label="FPS: Frontenders Programando Sin Dormir">
                        <div class="hero__acronym-part">
                            <span class="hero__acronym-letter" aria-hidden="true">F</span>
                            <span class="hero__acronym-word">Frontenders</span>
                        </div>
                        <span class="hero__acronym-sep" aria-hidden="true"></span>
                        <div class="hero__acronym-part">
                            <span class="hero__acronym-letter" aria-hidden="true">P</span>
                            <span class="hero__acronym-word">Programando</span>
                        </div>
                        <span class="hero__acronym-sep" aria-hidden="true"></span>
                        <div class="hero__acronym-part">
                            <span class="hero__acronym-letter" aria-hidden="true">S</span>
                            <span class="hero__acronym-word">Sin Dormir</span>
                        </div>
                    </div>

                    <p class="hero__joke">
                        tambien conocido como <em>First Person Shooter</em>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path
                                d="M7 6h2v4H7V6zm4 0h2v2h-2V6zm0 4h2v2h-2v-2zM3 8C3 5.24 5.24 3 8 3h8c2.76 0 5 2.24 5 5v2c0 2.76-2.24 5-5 5h-1l-3 3v-3H8c-2.76 0-5-2.24-5-5V8zm2 0v2c0 1.65 1.35 3 3 3h3v2l2-2h2c1.65 0 3-1.35 3-3V8c0-1.65-1.35-3-3-3H8C6.35 5 5 6.35 5 8z" />
                        </svg>
                    </p>

                    <div class="hero__cta">
                        <RouterLink to="/catalogo" class="btn btn--cta">
                            Ver Catálogo
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                            </svg>
                        </RouterLink>
                        <RouterLink to="/destacados" class="btn btn--outline">
                            Ver Destacados
                        </RouterLink>
                    </div>
                </div>

                <!-- Solo para probar, reemplazarlo con datos dinamicos del store cuando Juan conecte la API -->
                <div class="hero__right">
                    <article class="juego-mes" aria-label="Juego del mes destacado">
                        <div class="juego-mes__thumb">
                            <div class="juego-mes__thumb-bg" aria-hidden="true"></div>
                            <span class="juego-mes__badge">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                Juego del mes
                            </span>
                        </div>
                        <div class="juego-mes__body">
                            <h2 class="juego-mes__title">Neon Odyssey</h2>
                            <p class="juego-mes__desc">
                                Explora un universo cyberpunk masivo.
                                Miles de jugadores, una sola mision.
                            </p>
                            <div class="juego-mes__meta">
                                <span class="badge badge--rpg">RPG</span>
                                <span class="badge badge--platform">PC</span>
                            </div>
                            <p class="juego-mes__hint">Gestionado por el administrador</p>
                        </div>
                    </article>
                </div>

            </div>
        </section>

    </MainLayout>
</template>