// Mock temporal para desarrollar la vista sin esperar a use-games.js
// Eliminar este archivo cuando la API real esté disponible
export const mockGame = {
  id: 1,
  title: 'Lost Ark',
  thumbnail: 'https://www.mmobomb.com/file/2021/03/Lost-Ark-Head-Image-300x150.jpg',
  description: 'Un masivo MMORPG de acción con combates intensos, raids épicos y un mundo enorme por explorar. Gratis para jugar con contenido regular.',
  genre: 'MMORPG',
  platform: 'PC (Windows)',
  publisher: 'Amazon Games',
  developer: 'Smilegate RPG',
  release_date: '2022-02-11',
  screenshots: [
    { id: 1, image: 'https://www.mmobomb.com/file/2021/03/Lost-Ark-1-300x150.jpg' },
    { id: 2, image: 'https://www.mmobomb.com/file/2021/03/Lost-Ark-2-300x150.jpg' },
    { id: 3, image: 'https://www.mmobomb.com/file/2021/03/Lost-Ark-3-300x150.jpg' }
  ]
}