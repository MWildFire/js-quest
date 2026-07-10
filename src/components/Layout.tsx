import type { ReactNode } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { totalXp, solvedCount, totalTaskCount } from '../lib/progress'
import { XpBar } from './XpBar'
import { BadgeToaster } from './BadgeToaster'

export function Layout() {
  const xp = useProgress(totalXp)
  const streak = useProgress((s) => s.streak.count)
  const solved = useProgress(solvedCount)

  return (
    <div className="min-h-full flex flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#0b1020]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-yellow-400 text-black font-black text-sm">
              JS
            </span>
            <span className="font-bold tracking-tight hidden sm:inline">Quest</span>
          </Link>

          <div className="hidden md:block flex-1 max-w-xs">
            <XpBar xp={xp} compact />
          </div>

          <nav className="ml-auto flex items-center gap-1 text-sm">
            <HeaderLink to="/">Модули</HeaderLink>
            <HeaderLink to="/badges">Бейджи</HeaderLink>
          </nav>

          <div className="flex items-center gap-3 text-sm">
            <span
              className="flex items-center gap-1 text-orange-400 font-semibold"
              title="Стрик — дней подряд с активностью"
            >
              🔥 {streak}
            </span>
            <span className="text-slate-400 hidden sm:inline">
              {solved}/{totalTaskCount()}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        JS Quest — учись, решая. Сделано с ❤️ для Луки.
      </footer>

      <BadgeToaster />
    </div>
  )
}

function HeaderLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-lg transition-colors ${
          isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
  )
}
