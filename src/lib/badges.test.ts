import { describe, it, expect } from 'vitest'
import type { ProgressState } from '../store/progress'
import { BADGES, earnedBadges, earnedBadgeIds } from './badges'
import { allTasks } from '../content'

function makeState(partial: Partial<ProgressState>): ProgressState {
  return {
    solved: {},
    drafts: {},
    quizResults: {},
    streak: { count: 0, lastActiveDay: null },
    seenBadges: [],
    solveTask: () => {},
    saveDraft: () => {},
    recordQuiz: () => {},
    markBadgesSeen: () => {},
    reset: () => {},
    ...partial,
  }
}

describe('badges', () => {
  it('empty state earns nothing', () => {
    expect(earnedBadges(makeState({})).length).toBe(0)
  })

  it('first solve earns first-blood', () => {
    const s = makeState({ solved: { [allTasks[0].id]: { code: 'x', at: 1 } } })
    expect(earnedBadgeIds(s)).toContain('first-blood')
  })

  it('streak badges trigger at thresholds', () => {
    expect(earnedBadgeIds(makeState({ streak: { count: 3, lastActiveDay: '2026-01-01' } }))).toContain(
      'streak-3',
    )
    expect(earnedBadgeIds(makeState({ streak: { count: 7, lastActiveDay: '2026-01-01' } }))).toContain(
      'streak-7',
    )
  })

  it('solving all tasks earns centurion', () => {
    const solved = Object.fromEntries(allTasks.map((t) => [t.id, { code: 'x', at: 1 }]))
    const ids = earnedBadgeIds(makeState({ solved }))
    expect(ids).toContain('centurion')
    expect(ids).toContain('all-modules')
  })

  it('every badge has stable required fields', () => {
    const seen = new Set<string>()
    for (const b of BADGES) {
      expect(b.id).toBeTruthy()
      expect(seen.has(b.id)).toBe(false)
      seen.add(b.id)
      expect(b.title).toBeTruthy()
      expect(b.emoji).toBeTruthy()
      expect(typeof b.earned).toBe('function')
    }
  })
})
