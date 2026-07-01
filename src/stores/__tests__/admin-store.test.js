import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAdminStore } from '../admin-store.js'

const mockUsers = [
  { uid: 'user-1', username: 'Alice', status: 'active' },
  { uid: 'user-2', username: 'Bob', status: 'restricted' },
]

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({
    docs: mockUsers.map(u => ({ data: () => ({ ...u }) }))
  })),
  updateDoc: vi.fn(() => Promise.resolve()),
}))

vi.mock('@/api/firebase', () => ({
  db: {}
}))

describe('adminStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('inicia con la lista de usuarios vacía', () => {
    const store = useAdminStore()
    expect(store.usersList).toHaveLength(0)
  })

  it('fetchAllUsers carga todos los usuarios', async () => {
    const store = useAdminStore()
    await store.fetchAllUsers()
    expect(store.usersList).toHaveLength(2)
    expect(store.usersList[0].username).toBe('Alice')
  })

  it('toggleUserAccess cambia active a restricted', async () => {
    const store = useAdminStore()
    await store.fetchAllUsers()
    await store.toggleUserAccess('user-1', 'active')
    const user = store.usersList.find(u => u.uid === 'user-1')
    expect(user.status).toBe('restricted')
  })

  it('toggleUserAccess cambia restricted a active', async () => {
    const store = useAdminStore()
    await store.fetchAllUsers()
    await store.toggleUserAccess('user-2', 'restricted')
    const user = store.usersList.find(u => u.uid === 'user-2')
    expect(user.status).toBe('active')
  })

  it('toggleUserAccess no afecta a otros usuarios', async () => {
    const store = useAdminStore()
    await store.fetchAllUsers()
    await store.toggleUserAccess('user-1', 'active')
    const other = store.usersList.find(u => u.uid === 'user-2')
    expect(other.status).toBe('restricted')
  })
})
