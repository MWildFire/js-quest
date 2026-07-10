import { describe, it, expect } from 'vitest'

// Дымовой тест Ф0: подтверждает, что тест-раннер работает.
describe('smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
