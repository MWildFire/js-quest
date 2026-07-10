import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SolvedEntry {
  code: string
  at: number
}

export interface QuizEntry {
  score: number
  total: number
  at: number
}

export interface StreakState {
  count: number
  /** Локальная дата последней активности, YYYY-MM-DD. */
  lastActiveDay: string | null
}

export interface ProgressState {
  solved: Record<string, SolvedEntry>
  drafts: Record<string, string>
  quizResults: Record<string, QuizEntry>
  streak: StreakState
  seenBadges: string[]

  solveTask: (taskId: string, code: string) => void
  saveDraft: (taskId: string, code: string) => void
  recordQuiz: (quizId: string, score: number, total: number) => void
  markBadgesSeen: (ids: string[]) => void
  reset: () => void
}

/** Локальная дата в формате YYYY-MM-DD. */
export function dayString(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Разница в днях между двумя YYYY-MM-DD (b - a). */
export function dayDiff(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00')
  const db = new Date(b + 'T00:00:00')
  return Math.round((db.getTime() - da.getTime()) / 86_400_000)
}

/** Чистое обновление стрика при активности «сегодня». */
export function bumpStreak(prev: StreakState, today: string): StreakState {
  if (prev.lastActiveDay === today) return prev
  if (prev.lastActiveDay === null) return { count: 1, lastActiveDay: today }
  const diff = dayDiff(prev.lastActiveDay, today)
  if (diff === 1) return { count: prev.count + 1, lastActiveDay: today }
  if (diff <= 0) return { ...prev, lastActiveDay: today }
  return { count: 1, lastActiveDay: today }
}

const initial = {
  solved: {} as Record<string, SolvedEntry>,
  drafts: {} as Record<string, string>,
  quizResults: {} as Record<string, QuizEntry>,
  streak: { count: 0, lastActiveDay: null } as StreakState,
  seenBadges: [] as string[],
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...initial,

      solveTask: (taskId, code) =>
        set((s) => {
          const today = dayString()
          return {
            solved: { ...s.solved, [taskId]: { code, at: Date.now() } },
            drafts: { ...s.drafts, [taskId]: code },
            streak: bumpStreak(s.streak, today),
          }
        }),

      saveDraft: (taskId, code) =>
        set((s) => ({ drafts: { ...s.drafts, [taskId]: code } })),

      recordQuiz: (quizId, score, total) =>
        set((s) => {
          const prev = s.quizResults[quizId]
          // Храним лучший результат.
          const best = !prev || score > prev.score ? { score, total, at: Date.now() } : prev
          return {
            quizResults: { ...s.quizResults, [quizId]: best },
            streak: bumpStreak(s.streak, dayString()),
          }
        }),

      markBadgesSeen: (ids) =>
        set((s) => ({ seenBadges: Array.from(new Set([...s.seenBadges, ...ids])) })),

      reset: () => set({ ...initial }),
    }),
    { name: 'js-quest-progress', version: 1 },
  ),
)
