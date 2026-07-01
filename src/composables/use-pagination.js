// Composable: logica de paginacion reutilizable con puntos suspensivos
import { computed, toRef, isRef } from 'vue'

export function usePagination(currentPage, totalPages) {
    const currentPageRef = isRef(currentPage) ? currentPage : toRef(currentPage)
    const totalPagesRef = isRef(totalPages) ? totalPages : toRef(totalPages)

    const visiblePages = computed(() => {
        const pages = []
        const total = totalPagesRef.value
        const current = currentPageRef.value

        if (total <= 7) {
            for (let i = 1; i <= total; i++) pages.push(i)
            return pages
        }

        pages.push(1)

        if (current > 3) pages.push('...')

        const start = Math.max(2, current - 1)
        const end = Math.min(total - 1, current + 1)

        for (let i = start; i <= end; i++) pages.push(i)

        if (current < total - 2) pages.push('...')

        pages.push(total)

        return pages
    })

    return { visiblePages }
}