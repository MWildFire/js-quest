import { Link } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { BADGES } from '../lib/badges'
import { totalXp, solvedCount, completedModuleCount } from '../lib/progress'
import { levelForXp, levelTitle } from '../lib/leveling'

export function BadgesPage() {
  const state = useProgress()
  const xp = totalXp(state)
  const level = levelForXp(xp)
  const earnedCount = BADGES.filter((b) => b.earned(state)).length

  return (
    <div className="space-y-6">
      <div>
        <Link to="/" className="text-sm text-slate-400 hover:text-white">
          ← На главную
        </Link>
        <h1 className="mt-2 text-2xl font-black">🏆 Достижения</h1>
        <p className="text-slate-400 mt-1">
          Уровень {level} · {levelTitle(level)} · получено бейджей: {earnedCount}/{BADGES.length}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        <Stat label="XP" value={`${xp}`} />
        <Stat label="Задач" value={`${solvedCount(state)}`} />
        <Stat label="Модулей" value={`${completedModuleCount(state)}`} />
        <Stat label="Стрик" value={`🔥 ${state.streak.count}`} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {BADGES.map((b) => {
          const earned = b.earned(state)
          return (
            <div
              key={b.id}
              className={`rounded-xl border p-4 flex items-center gap-3 transition-colors ${
                earned
                  ? 'border-yellow-400/50 bg-yellow-400/5'
                  : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              <span className={`text-4xl ${earned ? '' : 'grayscale opacity-30'}`}>
                {b.emoji}
              </span>
              <div className="min-w-0">
                <div className={`font-bold ${earned ? '' : 'text-slate-500'}`}>{b.title}</div>
                <div className="text-xs text-slate-400">{b.description}</div>
                {earned && <div className="text-xs text-yellow-400 mt-0.5">Получено ✓</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-800/70 px-3 py-2 text-center">
      <div className="font-bold">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  )
}
