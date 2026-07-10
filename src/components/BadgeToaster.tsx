import { useEffect, useRef, useState } from 'react'
import { useProgress } from '../store/progress'
import { BADGES, earnedBadgeIds, type Badge } from '../lib/badges'

/** Показывает всплывающее уведомление при получении нового бейджа. */
export function BadgeToaster() {
  const solved = useProgress((s) => s.solved)
  const quizResults = useProgress((s) => s.quizResults)
  const streak = useProgress((s) => s.streak)
  const seenBadges = useProgress((s) => s.seenBadges)
  const markBadgesSeen = useProgress((s) => s.markBadgesSeen)

  const [toasts, setToasts] = useState<Badge[]>([])
  // Защита от повторного показа одного бейджа (в т.ч. двойной вызов эффекта в StrictMode).
  const shownRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const state = useProgress.getState()
    const earned = earnedBadgeIds(state)
    const fresh = earned.filter((id) => !seenBadges.includes(id) && !shownRef.current.has(id))
    if (fresh.length === 0) return
    fresh.forEach((id) => shownRef.current.add(id))
    const badges = fresh
      .map((id) => BADGES.find((b) => b.id === id))
      .filter((b): b is Badge => !!b)
    setToasts((t) => [...t, ...badges])
    markBadgesSeen(fresh)
    const timer = setTimeout(() => {
      setToasts((t) => t.slice(badges.length))
    }, 4500)
    return () => clearTimeout(timer)
  }, [solved, quizResults, streak, seenBadges, markBadgesSeen])

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((b, i) => (
        <div
          key={`${b.id}-${i}`}
          className="flex items-center gap-3 rounded-xl border border-yellow-400/60 bg-slate-900 px-4 py-3 shadow-lg shadow-yellow-400/10 animate-[fadeIn_.3s_ease]"
        >
          <span className="text-3xl">{b.emoji}</span>
          <div>
            <div className="text-xs text-yellow-400 font-semibold">Новый бейдж!</div>
            <div className="font-bold">{b.title}</div>
            <div className="text-xs text-slate-400">{b.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
