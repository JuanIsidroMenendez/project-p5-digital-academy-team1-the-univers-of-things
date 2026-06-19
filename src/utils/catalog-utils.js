// Utilidades de filtrado y paginacion del catalogo
export function filterByText(games, query) {
    if (!query) return games
    const search = query.toLowerCase().trim()
    return games.filter(game =>
        search.length === 1
            ? game.title.toLowerCase().startsWith(search)
            : game.title.toLowerCase().includes(search)
    )
}

export function filterByGenre(games, genre) {
    if (!genre) return games
    return games.filter(game =>
        game.genre.toLowerCase() === genre.toLowerCase()
    )
}

export function filterByPlatform(games, platform) {
    if (!platform) return games
    return games.filter(game =>
        game.platform.includes(platform)
    )
}

export function paginateGames(games, page, perPage) {
    const start = (page - 1) * perPage
    return games.slice(start, start + perPage)
}