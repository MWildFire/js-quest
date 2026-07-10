import { describe, it, expect } from 'vitest'
import { xpForLevel, levelForXp, levelProgress, levelTitle } from './leveling'

describe('leveling', () => {
  it('level 1 requires 0 xp', () => {
    expect(xpForLevel(1)).toBe(0)
    expect(levelForXp(0)).toBe(1)
  })

  it('xp thresholds grow monotonically', () => {
    for (let l = 1; l < 25; l++) {
      expect(xpForLevel(l + 1)).toBeGreaterThan(xpForLevel(l))
    }
  })

  it('levelForXp is the inverse of xpForLevel', () => {
    for (let l = 1; l < 25; l++) {
      const xp = xpForLevel(l)
      expect(levelForXp(xp)).toBe(l)
      // на 1 XP меньше порога — предыдущий уровень
      if (l > 1) expect(levelForXp(xp - 1)).toBe(l - 1)
    }
  })

  it('progress ratio is within [0,1]', () => {
    for (const xp of [0, 50, 150, 999, 5000]) {
      const p = levelProgress(xp)
      expect(p.ratio).toBeGreaterThanOrEqual(0)
      expect(p.ratio).toBeLessThanOrEqual(1)
    }
  })

  it('has a title for every level', () => {
    expect(levelTitle(1)).toBeTruthy()
    expect(levelTitle(25)).toBeTruthy()
  })
})
