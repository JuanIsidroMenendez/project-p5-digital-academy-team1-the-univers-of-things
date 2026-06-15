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
</style>