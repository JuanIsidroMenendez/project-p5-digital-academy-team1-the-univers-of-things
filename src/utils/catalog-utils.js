// Utilidades de filtrado y paginacion del catalogo
export function filterByText(games, query) {
    if (!query) return games
    const search = query.toLowerCase()
    return games.filter(game =>
        game.title.toLowerCase().includes(search)
    )
}

export function filterByGenre(games, genre) {
    if (!genre) return games
    const search = genre.toLowerCase()
    return games.filter(game => game.genre.toLowerCase() === search)
}