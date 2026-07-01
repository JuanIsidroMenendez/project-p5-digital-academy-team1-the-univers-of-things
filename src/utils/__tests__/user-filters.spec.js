import { filterUsers } from '@/utils/user-filters'
import { test, expect } from 'vitest'

test('filtra por username', () => {
    const users = [
        { username: 'AdminRoot', email: 'admin@admin.com' },
        { username: 'PlayerOne', email: 'player@test.com' }
    ]
    const result = filterUsers(users, 'admin')
    expect(result).toHaveLength(1)
})


test('filtra por email', () => {
    const users = [
        { username: 'AdminRoot', email: 'admin@admin.com' },
        { username: 'PlayerOne', email: 'player@test.com' }
    ]
    const result = filterUsers(users, 'test.com')
    expect(result).toHaveLength(1)
})