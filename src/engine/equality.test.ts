import { describe, it, expect } from 'vitest'
import { deepEqual, sameMembers, approxEqual, matches, show } from './equality'

describe('deepEqual', () => {
  it('primitives', () => {
    expect(deepEqual(1, 1)).toBe(true)
    expect(deepEqual('a', 'a')).toBe(true)
    expect(deepEqual(1, 2)).toBe(false)
    expect(deepEqual(NaN, NaN)).toBe(true)
    expect(deepEqual(null, null)).toBe(true)
    expect(deepEqual(null, {})).toBe(false)
  })
  it('arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false)
    expect(deepEqual([1, [2]], [1, [2]])).toBe(true)
  })
  it('objects', () => {
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true)
  })
})

describe('sameMembers', () => {
  it('ignores order', () => {
    expect(sameMembers([3, 1, 2], [1, 2, 3])).toBe(true)
    expect(sameMembers([1, 1, 2], [1, 2, 2])).toBe(false)
    expect(sameMembers([1, 2], [1, 2, 3])).toBe(false)
  })
})

describe('approxEqual', () => {
  it('tolerates float error', () => {
    expect(approxEqual(0.1 + 0.2, 0.3)).toBe(true)
    expect(approxEqual(1, 1.5)).toBe(false)
  })
})

describe('matches / show', () => {
  it('dispatches on matcher', () => {
    expect(matches([2, 1], [1, 2], 'sameMembers')).toBe(true)
    expect(matches(0.3, 0.1 + 0.2, 'approx')).toBe(true)
    expect(matches({ a: 1 }, { a: 1 })).toBe(true)
  })
  it('show formats values', () => {
    expect(show('hi')).toBe('"hi"')
    expect(show(undefined)).toBe('undefined')
    expect(show([1, 2])).toBe('[1,2]')
  })
})
