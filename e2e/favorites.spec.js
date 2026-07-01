import { test, expect } from '@playwright/test'

const TEST_EMAIL = 'prueba123@gmail.com'
const TEST_PASSWORD = 'patatas123'

test.describe('Añadir a favoritos', () => {
  test('debe permitir añadir un juego a favoritos tras iniciar sesión', async ({ page }) => {
    // 1. LOGIN
    await page.goto('/login')
    await page.fill('#email', TEST_EMAIL)
    await page.fill('#password', TEST_PASSWORD)
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard/profile' , { timeout: 15000 })

    // 2. NAVEGACIÓN AL CATÁLOGO
    await page.click('text=CATÁLOGO')
    await page.waitForURL('/catalog')

    // 3. CLICK EN EL PRIMER JUEGO DEL LISTADO
    const firstGameCard = page.locator('.card').first()
    await firstGameCard.click()

    // 4. ESPERAR A QUE CARGUE EL DETALLE DEL JUEGO
    await expect(page.locator('.game-detail__title')).toBeVisible()

   // 5. COMPROBAR QUE EL BOTÓN DE FAVORITOS ESTÁ VISIBLE Y CLICAR
    await expect(page.locator('.add-to-favorites__btn')).toBeVisible()
    await page.locator('.add-to-favorites__btn').click()

    // 6. VERIFICAR QUE EL BOTÓN CAMBIA A ESTADO "GUARDADO"
    await expect(page.locator('.add-to-favorites__btn')).toHaveText(/Guardado en favoritos/)
  })
})