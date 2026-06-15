<!-- Widget del juego del mes: imagen, titulo, descripcion, tags y badge -->
<script setup>
// TODO: recibir prop gameId del store de admin cuando Iuliam implemente la gestion de destacados
defineProps({
    gameId: {
        type: Number,
        default: null
    }
})
</script>

<template>
    <RouterLink v-if="gameId" :to="{ name: 'game-detail', params: { id: gameId } }" class="juego-mes"
        aria-label="Ver detalle del juego del mes">
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
                Miles de jugadores, una sola misión.
            </p>
            <div class="juego-mes__meta">
                <span class="badge badge--rpg">RPG</span>
                <span class="badge badge--platform">PC</span>
            </div>
            <p class="juego-mes__hint">Gestionado por el administrador</p>
        </div>
    </RouterLink>

    <article v-else class="juego-mes" aria-label="Juego del mes destacado">
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
                Miles de jugadores, una sola misión.
            </p>
            <div class="juego-mes__meta">
                <span class="badge badge--rpg">RPG</span>
                <span class="badge badge--platform">PC</span>
            </div>
            <p class="juego-mes__hint">Gestionado por el administrador</p>
        </div>
    </article>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.juego-mes {
    background: var(--color-surface-high);
    border: 1px solid var(--color-border-purple);
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition:
        transform var(--transition-slow),
        box-shadow var(--transition-slow);

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 60px rgba(168, 85, 247, 0.2);

        .juego-mes__thumb-bg {
            transform: scale(1.06);
        }
    }

    &__thumb {
        height: 200px;
        position: relative;
        overflow: hidden;
    }

    &__thumb-bg {
        width: 100%;
        height: 100%;
        background: linear-gradient(145deg, #0c0020, #1e0060, #000c30);
        transition: transform 0.45s ease;
    }

    &__badge {
        position: absolute;
        top: 12px;
        left: 12px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: $font-mono;
        font-size: 9px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: white;
        background: linear-gradient(135deg, #7c3aed, #2563eb);
        padding: 4px 12px;
        border-radius: var(--radius-full);
        font-weight: 700;
    }

    &__body {
        padding: 1.2rem 1.4rem 1.4rem;
    }

    &__title {
        font-family: $font-display;
        font-weight: 800;
        font-size: 20px;
        color: var(--color-text);
        margin-bottom: 6px;
        line-height: 1.2;
    }

    &__desc {
        font-size: 12px;
        color: var(--color-text-muted);
        line-height: 1.55;
        margin-bottom: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__meta {
        display: flex;
        gap: 6px;
        margin-bottom: 10px;
    }

    &__hint {
        font-family: $font-mono;
        font-size: 9px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-text-dim);
        text-align: center;
        padding-top: 10px;
        border-top: 1px solid var(--color-border);
    }
}
</style>