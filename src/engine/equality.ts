import type { Matcher } from '../types'

/** Строгое структурное равенство (учитывает NaN, массивы, простые объекты). */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  // NaN === NaN
  if (typeof a === 'number' && typeof b === 'number') {
    return Number.isNaN(a) && Number.isNaN(b)
  }
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }
  const arrA = Array.isArray(a)
  const arrB = Array.isArray(b)
  if (arrA !== arrB) return false
  if (arrA && arrB) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }
  const ka = Object.keys(a as Record<string, unknown>)
  const kb = Object.keys(b as Record<string, unknown>)
  if (ka.length !== kb.length) return false
  for (const k of ka) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false
    if (!deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k])) {
      return false
    }
  }
  return true
}

/** Массивы равны как мультимножества (порядок неважен). */
export function sameMembers(a: unknown, b: unknown): boolean {
  if (!Array.isArray(a) || !Array.isArray(b)) return false
  if (a.length !== b.length) return false
  const used = new Array(b.length).fill(false)
  for (const el of a) {
    let found = false
    for (let j = 0; j < b.length; j++) {
      if (!used[j] && deepEqual(el, b[j])) {
        used[j] = true
        found = true
        break
      }
    }
    if (!found) return false
  }
  return true
}

export function approxEqual(a: unknown, b: unknown, eps = 1e-9): boolean {
  return typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) < eps
}

export function matches(actual: unknown, expected: unknown, matcher: Matcher = 'deepEqual'): boolean {
  switch (matcher) {
    case 'approx':
      return approxEqual(actual, expected)
    case 'sameMembers':
      return sameMembers(actual, expected)
    case 'deepEqual':
    default:
      return deepEqual(actual, expected)
  }
}

/** Компактное человекочитаемое представление значения. */
export function show(value: unknown): string {
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'function') return '[function]'
  if (value === undefined) return 'undefined'
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}
