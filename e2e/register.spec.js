import { test, expect } from '@playwright/test'

test.describe('Registro de usuario', () => {
  // Test: el formulario se muestra con todos sus campos
  test('debe mostrar el formulario de registro con todos sus campos', async ({ page }) => {
    await page.goto('/register')

    await expect(page.locator('h1')).toHaveText('Crear cuenta')
    await expect(page.locator('#username')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.locator('#confirm-password')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  // Test: contraseñas que no coinciden
  test('debe mostrar error cuando las contraseñas no coinciden', async ({ page }) => {
    await page.goto('/register')

    await page.fill('#username', 'usuario_test')
    await page.fill('#email', 'test@fps.io')
    await page.fill('#password', 'password123')
    await page.fill('#confirm-password', 'otrapassword')
    await page.click('button[type="submit"]')

    // No debe redirigir
    await expect(page).toHaveURL('/register')
    await expect(page.locator('.register-form__field-error')).toHaveText('Las contraseñas no coinciden')
  })

  // Test: registro exitoso con datos válidos
  test('debe crear la cuenta y redirigir al dashboard con datos válidos', async ({ page }) => {
    await page.goto('/register')

    // Timestamp para evitar correos duplicados en cada ejecución
    const timestamp = Date.now()

    await page.fill('#username', `usuario_${timestamp}`)
    await page.fill('#email', `test_${timestamp}@fps.io`)
    await page.fill('#password', 'Password123!')
    await page.fill('#confirm-password', 'Password123!')
    await page.click('button[type="submit"]')

    // Aumentamos el timeout a 15s porque Firebase puede tardar más en Firefox/Webkit
  await expect(page).toHaveURL('/dashboard/profile', { timeout: 15000 })
})
})