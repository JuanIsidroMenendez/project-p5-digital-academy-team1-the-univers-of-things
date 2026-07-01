import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loginUser } from '../auth-service.js'

const mockUser = { uid: 'user-1', email: 'test@example.com' }

const signInWithEmailAndPassword = vi.fn(() => Promise.resolve({ user: mockUser }))
const signOut = vi.fn(() => Promise.resolve())
const getDoc = vi.fn()
const doc = vi.fn()

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: (...args) => signInWithEmailAndPassword(...args),
  signOut: (...args) => signOut(...args),
}))

vi.mock('firebase/firestore', () => ({
  doc: (...args) => doc(...args),
  getDoc: (...args) => getDoc(...args),
}))

vi.mock('@/api/firebase', () => ({
  auth: {},
  db: {},
}))

describe('auth-service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    signInWithEmailAndPassword.mockResolvedValue({ user: mockUser })
  })

  it('loginUser devuelve rol customer por defecto si no existe perfil en Firestore', async () => {
    getDoc.mockResolvedValue({ exists: () => false })

    const result = await loginUser('test@example.com', 'password123')

    expect(result).toEqual({
      uid: 'user-1',
      email: 'test@example.com',
      role: 'customer',
      status: 'active',
      username: '',
    })
  })
})
