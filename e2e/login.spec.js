import { test, expect } from '@playwright/test'

test.describe('Login de usuario', () => {

  // Test conforme ST-11 que comprueba las credenciales válidas de usuario.
  
  test('debe redirigir al dashboard de customer con credenciales válidas', async ({ page }) => {
    // 1.ENVÍO A PÁGINA LOGIN
    await page.goto('/login')
    // 2. COMPROBACIÓN DE FORMULARIO VISIBLE
    await expect(page.locator('h1, .login-view__logo-text')).toBeVisible()
    // 3. CUMPLIMENTACIÓN DEL FORMULARIO
    await page.fill('#email', 'customer@fps.io')
    await page.fill('#password', 'password123')
    // 4. CLICK EN LOGIN
    await page.click('button[type="submit"]')
    // 5. VERIFICACIÓN ENVÍO A DASHBOARD DE CUSTOMER
    await expect(page).toHaveURL('/dashboard')
  })

})