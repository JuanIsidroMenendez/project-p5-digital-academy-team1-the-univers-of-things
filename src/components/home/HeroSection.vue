<!-- Seccion hero de la homepage -->
<script setup>
import FeaturedGameWidget from '@/components/home/FeaturedGameWidget.vue'
</script>

<template>
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
                    también conocido como <em>First Person Shooter</em>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path
                            d="M7 6h2v4H7V6zm4 0h2v2h-2V6zm0 4h2v2h-2v-2zM3 8C3 5.24 5.24 3 8 3h8c2.76 0 5 2.24 5 5v2c0 2.76-2.24 5-5 5h-1l-3 3v-3H8c-2.76 0-5-2.24-5-5V8zm2 0v2c0 1.65 1.35 3 3 3h3v2l2-2h2c1.65 0 3-1.35 3-3V8c0-1.65-1.35-3-3-3H8C6.35 5 5 6.35 5 8z" />
                    </svg>
                </p>

                <div class="hero__cta">
                    <RouterLink to="/catalog" class="btn btn--cta">
                        Ver Catálogo
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                        </svg>
                    </RouterLink>
                    <RouterLink to="/featured" class="btn btn--outline">
                        Ver Destacados
                    </RouterLink>
                </div>
            </div>

            <div class="hero__right">
                <FeaturedGameWidget />
            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.hero {
    animation: fps-fade-in 0.6s ease both;
    padding: 2.5rem 1rem 2rem;

    @media (min-width: $bp-tablet) {
        padding: 3.5rem 2rem 3rem;
    }

    @media (min-width: $bp-desktop) {
        padding: 5rem 4rem 4rem;
        max-width: $bp-wide;
        margin: 0 auto;
    }

    &__content {
        display: grid;
        grid-template-columns: 1fr;

        @media (min-width: $bp-desktop) {
            grid-template-columns: 1fr 380px;
            gap: 3rem;
            align-items: center;
        }
    }

    &__left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    &__right {
        display: block;
        width: 100%;
        max-width: 420px;
        margin: 2rem auto 0;

        @media (min-width: $bp-desktop) {
            max-width: none;
            margin: 0;
        }
    }

    &__tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: $font-mono;
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--color-secondary);
        background: var(--color-secondary-dim);
        border: 1px solid var(--color-border-cyan);
        padding: 5px 14px;
        border-radius: var(--radius-full);
        margin-bottom: 1.5rem;

        @media (min-width: $bp-tablet) {
            margin-bottom: 2.2rem;
        }
    }

    &__title {
        font-family: $font-display;
        font-weight: 800;
        line-height: 0.9;
        letter-spacing: -4px;
        font-size: clamp(72px, 20vw, 120px);
        background: linear-gradient(135deg, #e2d9f3 0%, #a855f7 35%, #22d3ee 65%, #f1f5f9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 250%;
        animation: fps-shimmer 5s ease infinite;
        margin-bottom: 1.2rem;

        @media (min-width: $bp-desktop) {
            font-size: clamp(90px, 18vw, 160px);
            letter-spacing: -8px;
            margin-bottom: 1.4rem;
        }
    }

    &__acronym {
        display: flex;
        align-items: flex-start;
        gap: 1.2rem;
        margin-bottom: 0.8rem;

        @media (min-width: $bp-tablet) {
            gap: 1.8rem;
            margin-bottom: 1rem;
        }
    }

    &__acronym-part {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    &__acronym-letter {
        font-family: $font-display;
        font-size: 10px;
        font-weight: 700;
        color: var(--color-primary);
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    &__acronym-word {
        font-family: $font-body;
        font-size: 11px;
        color: var(--color-text-muted);
        white-space: nowrap;

        @media (min-width: $bp-tablet) {
            font-size: 13px;
        }
    }

    &__acronym-sep {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(168, 85, 247, 0.35);
        margin-top: 6px;
        flex-shrink: 0;
    }

    &__joke {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: $font-mono;
        font-size: 11px;
        color: var(--color-text-dim);
        letter-spacing: 0.1em;
        margin-bottom: 2rem;

        @media (min-width: $bp-tablet) {
            margin-bottom: 2.8rem;
        }

        em {
            color: var(--color-accent);
            font-style: normal;
        }
    }

    &__cta {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;

        @media (min-width: $bp-mobile) {
            flex-direction: row;
            width: auto;
        }
    }
}
</style>