<!-- Paginacion reutilizable -->
<script setup>
import { usePagination } from '@/composables/use-pagination.js'

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['page-change'])

const { visiblePages } = usePagination(
    () => props.currentPage,
    () => props.totalPages
)
</script>

<template>
    <nav class="pagination" aria-label="Paginacion del listado">

        <button class="pagination__btn" aria-label="Pagina anterior" :disabled="currentPage === 1"
            @click="emit('page-change', currentPage - 1)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
        </button>

        <template v-for="(page, index) in visiblePages" :key="index">
            <span v-if="page === '...'" class="pagination__dots">…</span>
            <button v-else class="pagination__btn" :class="{ 'pagination__btn--active': page === currentPage }"
                :aria-current="page === currentPage ? 'page' : undefined" @click="emit('page-change', page)">{{ page
                }}</button>
        </template>

        <button class="pagination__btn" aria-label="Pagina siguiente" :disabled="currentPage === totalPages"
            @click="emit('page-change', currentPage + 1)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
        </button>

    </nav>
</template>