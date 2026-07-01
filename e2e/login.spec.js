import { test, expect } from '@playwright/test'

const TEST_EMAIL = 'prueba123@gmail.com'
const TEST_PASSWORD = 'patatas123'

test.describe('Login de usuario', () => {

  // Test conforme ST-11 que comprueba las credenciales válidas de usuario.
  
  test('debe redirigir al dashboard de customer con credenciales válidas', async ({ page }) => {
    // 1.ENVÍO A PÁGINA LOGIN
    await page.goto('/login')
    // 2. COMPROBACIÓN DE FORMULARIO VISIBLE
    await expect(page.locator('h1, .login-view__logo-text')).toBeVisible()
    // 3. CUMPLIMENTACIÓN DEL FORMULARIO
    await page.fill('#email', TEST_EMAIL)
    await page.fill('#password', TEST_PASSWORD)
    // 4. CLICK EN LOGIN
    await page.click('button[type="submit"]')
    // 5. VERIFICACIÓN ENVÍO A DASHBOARD DE CUSTOMER
    await expect(page).toHaveURL('/dashboard/profile')
  })


  // Test conforme ST-12 que comprueba proceso credenciales incorrectas.
  
  test('debe mostrar mensaje de error con credenciales incorrectas', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#email', 'incorrecto@fps.io')
    await page.fill('#password', 'passwordincorrecto')
    await page.click('button[type="submit"]')

    // 5.B. VERIFICACIÓN DE NO REDIRECCIÓN
    await expect(page).toHaveURL('/login')

    // 6.B. VERIFICACIÓN APARICIÓN MENSAJE DE ERROR.
    await expect(page.locator('.login-form__error-general')).toBeVisible()
    await expect(page.locator('.login-form__error-general')).toHaveText('Correo o contraseña incorrectos')
  })

})