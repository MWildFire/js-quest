// Чистые функции прогрессии уровней. Покрыты юнит-тестами.

/** XP, необходимый чтобы ДОСТИЧЬ уровня `level` (level >= 1). */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0
  // Плавно растущая кривая: 0, 100, 250, 450, 700, 1000, ...
  const n = level - 1
  return 50 * n * (n + 1)
}

/** Текущий уровень для заданного суммарного XP. */
export function levelForXp(xp: number): number {
  let level = 1
  while (xpForLevel(level + 1) <= xp) level++
  return level
}

export interface LevelProgress {
  level: number
  xpIntoLevel: number
  xpForNextLevel: number
  /** Доля прогресса к следующему уровню, 0..1. */
  ratio: number
}

export function levelProgress(xp: number): LevelProgress {
  const level = levelForXp(xp)
  const base = xpForLevel(level)
  const next = xpForLevel(level + 1)
  const span = next - base
  const into = xp - base
  return {
    level,
    xpIntoLevel: into,
    xpForNextLevel: span,
    ratio: span === 0 ? 1 : into / span,
  }
}

/** Титул уровня — просто для вкуса. */
export function levelTitle(level: number): string {
  if (level >= 20) return 'JS-Архимаг'
  if (level >= 15) return 'Гуру JavaScript'
  if (level >= 10) return 'Мастер кода'
  if (level >= 7) return 'Опытный разработчик'
  if (level >= 4) return 'Юный кодер'
  if (level >= 2) return 'Ученик'
  return 'Новичок'
}
