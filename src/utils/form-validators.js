/**
 * Valida que un email tiene formato correcto.
 * Expresión regular estándar recomendada por MDN para validación básica de email.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida que un string tenga al menos la longitud mínima indicada.
 * Usa trim() para ignorar espacios en blanco al inicio y al final.
 * @param {string} value
 * @param {number} minLength
 * @returns {boolean}
 */
export function isMinLength(value, minLength) {
  return typeof value === 'string' && value.trim().length >= minLength
}

/**
 * Valida que dos contraseñas son idénticas (comparación estricta ===).
 * @param {string} password
 * @param {string} confirmation
 * @returns {boolean}
 */
export function passwordsMatch(password, confirmation) {
  return password === confirmation
}

/**
 * Valida que un campo no está vacío ni contiene solo espacios.
 * @param {string} value
 * @returns {boolean}
 */
export function isNotEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0
}