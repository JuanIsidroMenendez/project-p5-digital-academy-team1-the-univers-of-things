<!-- Vista favoritos: CRUD de favoritos, valoracion por estrellas y añadir nuevo -->
<script setup>
import { ref, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import FavoriteCard from '@/components/favorites/FavoriteCard.vue'
import EditFavoriteForm from '@/components/dashboard/EditFavoriteForm.vue'
import { useFavoritesStore } from '@/stores/favorites-store'

const favoritesStore = useFavoritesStore()
const hasFavorites = computed(() => favoritesStore.favoritesList.length > 0)

// Guarda el id del favorito que se está editando actualmente (null si ninguno)
const editingFavoriteId = ref(null)

function handleRemove(gameId) {
  favoritesStore.removeFromFavorites(gameId)
}

// Activa el modo edición para un favorito concreto
function handleEdit(favorite) {
  editingFavoriteId.value = favorite.id
}

// Guarda los cambios del formulario de edición y sale del modo edición
function handleSaveEdit(gameId, newData) {
  favoritesStore.updateFavorite(gameId, newData)
  editingFavoriteId.value = null
}

// Cancela la edición sin guardar cambios
function handleCancelEdit() {
  editingFavoriteId.value = null
}
</script>

<template>
    <DashboardLayout>
        <section class="favorites-view">
            <h1 class="favorites-view__title">Mis Favoritos</h1>

            <!-- Estado vacío: sin favoritos guardados -->
            <div v-if="!hasFavorites" class="favorites-view__empty" role="status">
                <span class="favorites-view__empty-icon" aria-hidden="true">🎮</span>
                <p>Todavía no tienes favoritos. ¡Explora el catálogo y guarda los que más te gusten!</p>
            </div>

            <!--
              TransitionGroup permite animar la entrada/salida de elementos en una lista.
              name="favorite" busca clases CSS favorite-leave-active, favorite-leave-to, etc.
              tag="ul" indica que el contenedor renderizado es un <ul>
            -->
            <TransitionGroup v-else name="favorite" tag="ul" class="favorites-view__grid">
                <li
                    v-for="favorite in favoritesStore.favoritesList"
                    :key="favorite.id"
                    class="favorites-view__item"
                >
                    <!-- Si este favorito está en edición, mostramos el formulario en vez de la tarjeta -->
                    <EditFavoriteForm
                        v-if="editingFavoriteId === favorite.id"
                        :favorite="favorite"
                        @save="(newData) => handleSaveEdit(favorite.id, newData)"
                        @cancel="handleCancelEdit"
                    />
                    <FavoriteCard
                        v-else
                        :favorite="favorite"
                        @remove="handleRemove"
                        @edit="handleEdit"
                    />
                </li>
            </TransitionGroup>
        </section>
    </DashboardLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.favorites-view {
    &__title {
        font-family: $font-display;
        font-weight: 800;
        font-size: 1.8rem;
        color: var(--color-text);
        margin-bottom: 1.5rem;

        @media (min-width: $bp-tablet) {
            font-size: 2rem;
        }

        @media (min-width: $bp-desktop) {
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }
    }

    &__empty {
        text-align: center;
        padding: var(--space-12);
        color: var(--color-text-muted);
    }

    &__empty-icon {
        display: block;
        font-size: 3rem;
        margin-bottom: var(--space-4);
    }

    &__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
        list-style: none;
        padding: 0;
        margin: 0;

        @media (min-width: $bp-tablet) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: $bp-desktop) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
}

// Transición de salida al eliminar un favorito (versión definitiva, sutil)
.favorite-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.favorite-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>