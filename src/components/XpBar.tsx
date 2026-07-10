import { levelProgress, levelTitle } from '../lib/leveling'

export function XpBar({ xp, compact = false }: { xp: number; compact?: boolean }) {
  const p = levelProgress(xp)
  return (
    <div className={compact ? 'w-40' : 'w-full'}>
      <div className="flex items-baseline justify-between text-xs mb-1">
        <span className="font-semibold text-yellow-400">
          Ур. {p.level} · {levelTitle(p.level)}
        </span>
        {!compact && (
          <span className="text-slate-400">
            {p.xpIntoLevel}/{p.xpForNextLevel} XP
          </span>
        )}
      </div>
      <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-500"
          style={{ width: `${Math.round(p.ratio * 100)}%` }}
        />
      </div>
    </div>
  )
}
