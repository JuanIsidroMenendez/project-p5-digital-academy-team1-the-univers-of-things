import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/api/firebase.js', () => ({
  db: {},
  storage: {}
}))

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => 'mockRef'),
  setDoc: vi.fn(() => Promise.resolve()),
  getDoc: vi.fn(),
  updateDoc: vi.fn(() => Promise.resolve())
}))

vi.mock('firebase/storage', () => ({
  ref: vi.fn(() => 'mockStorageRef'),
  uploadBytes: vi.fn(() => Promise.resolve()),
  getDownloadURL: vi.fn(() => Promise.resolve('https://example.com/avatar.jpg'))
}))

import {
  createUserProfile,
  getUserProfile,
  updateUserFavorites,
  updateUserAvatar,
  updateUserBg,
  uploadAvatarToStorage
} from '@/api/user.service'

import { setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { uploadBytes, getDownloadURL } from 'firebase/storage'

describe('user.service', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── createUserProfile ──
  describe('createUserProfile', () => {
    it('llama a setDoc con los datos correctos del usuario', async () => {
      await createUserProfile('uid-123', 'test@test.com', 'TestUser')

      expect(setDoc).toHaveBeenCalledWith('mockRef', {
        uid: 'uid-123',
        email: 'test@test.com',
        username: 'TestUser',
        role: 'customer',
        fav: [],
        profileImg: null,
        profileBg: 'linear-gradient(135deg, #7c3aed, #22d3ee)'
      })
    })
  })
  // ── getUserProfile ──
  describe('getUserProfile', () => {
    it('devuelve los datos del usuario si existe en Firestore', async () => {
      getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({ uid: 'uid-123', username: 'TestUser' })
      })

      const result = await getUserProfile('uid-123')
      expect(result).toEqual({ uid: 'uid-123', username: 'TestUser' })
    })

    it('devuelve null si el usuario no existe en Firestore', async () => {
      getDoc.mockResolvedValue({
        exists: () => false
      })

      const result = await getUserProfile('uid-inexistente')
      expect(result).toBeNull()
    })
  })
   // ── updateUserFavorites ──
  describe('updateUserFavorites', () => {
    it('llama a updateDoc con la lista de favoritos correcta', async () => {
      const favorites = [{ id: 1, title: 'Game 1' }]
      await updateUserFavorites('uid-123', favorites)

      expect(updateDoc).toHaveBeenCalledWith('mockRef', { fav: favorites })
    })
  })