import { test, expect } from 'vitest'
import { getNextStatus } from '@/utils/user-access'

test('cambia active a restricted', () => {
    expect(getNextStatus('active')).toBe('restricted')
})

test('cambia restricted a active', () => {
    expect(getNextStatus('restricted')).toBe('active')
})