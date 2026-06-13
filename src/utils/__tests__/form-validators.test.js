import { describe, it, expect } from 'vitest'
import {
  isValidEmail,
  isMinLength,
  passwordsMatch,
  isNotEmpty
} from '../form-validators'

describe('isValidEmail', () => {
  it('devuelve false para un correo sin formato válido', () => {
    expect(isValidEmail('noesuncorreo')).toBe(false)
  })

  it('devuelve true para un correo con formato correcto', () => {
    expect(isValidEmail('nieves@fps.com')).toBe(true)
  })

  it('devuelve false para un correo sin dominio', () => {
    expect(isValidEmail('nieves@')).toBe(false)
  })

  it('devuelve false para una cadena vacía', () => {
    expect(isValidEmail('')).toBe(false)
  })

  it('devuelve false si el correo tiene espacios', () => {
    expect(isValidEmail('nieves @fps.com')).toBe(false)
  })
})

describe('passwordsMatch', () => {
  it('devuelve false cuando las contraseñas no coinciden', () => {
    expect(passwordsMatch('abc123', 'abc456')).toBe(false)
  })

  it('devuelve true cuando las contraseñas son idénticas', () => {
    expect(passwordsMatch('miPass123', 'miPass123')).toBe(true)
  })

  it('devuelve false si una está vacía y la otra no', () => {
    expect(passwordsMatch('', 'abc123')).toBe(false)
  })
})

describe('isMinLength', () => {
  it('devuelve false con menos de 8 caracteres', () => {
    expect(isMinLength('corta', 8)).toBe(false)
  })

  it('devuelve true con exactamente 8 caracteres', () => {
    expect(isMinLength('12345678', 8)).toBe(true)
  })

  it('devuelve true con más de 8 caracteres', () => {
    expect(isMinLength('contraseñalarga', 8)).toBe(true)
  })

  it('ignora los espacios al inicio y al final al calcular la longitud', () => {
    expect(isMinLength('   abc   ', 8)).toBe(false)
  })
})

describe('isNotEmpty', () => {
  it('devuelve false para una cadena vacía', () => {
    expect(isNotEmpty('')).toBe(false)
  })

  it('devuelve false para una cadena que solo contiene espacios', () => {
    expect(isNotEmpty('   ')).toBe(false)
  })

  it('devuelve true para una cadena con contenido', () => {
    expect(isNotEmpty('Nieves')).toBe(true)
  })
})