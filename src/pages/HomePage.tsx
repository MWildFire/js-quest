import { Link } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { allModuleStats, totalXp, solvedCount, totalTaskCount } from '../lib/progress'
import { XpBar } from '../components/XpBar'

export function HomePage() {
  const state = useProgress()
  const stats = allModuleStats(state)
  const xp = totalXp(state)
  const solved = solvedCount(state)
  const total = totalTaskCount()

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6">
        <h1 className="text-3xl font-black">
          Привет! Готов прокачать <span className="text-yellow-400">JavaScript</span>?
        </h1>
        <p className="mt-2 text-slate-300 max-w-2xl">
          Решай задачи прямо в браузере, зарабатывай XP, повышай уровень и собирай бейджи.
          Твой код запускается безопасно и проверяется автоматически.
        </p>
        <div className="mt-5 max-w-md">
          <XpBar xp={xp} />
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
          <Stat label="Решено задач" value={`${solved} / ${total}`} />
          <Stat label="Стрик" value={`🔥 ${state.streak.count}`} />
          <Stat label="Всего XP" value={`${xp}`} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Модули</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map(({ module, solved: s, total: t, complete }) => {
            const empty = t === 0
            return (
              <Link
                key={module.id}
                to={empty ? '#' : `/module/${module.id}`}
                className={`group rounded-xl border p-4 transition-colors ${
                  empty
                    ? 'border-slate-800 bg-slate-900/40 opacity-60 pointer-events-none'
                    : 'border-slate-700 bg-slate-800/60 hover:border-yellow-400/60 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{module.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">
                        {module.order}. {module.title}
                      </h3>
                      {complete && <span title="Модуль пройден">✅</span>}
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">{module.summary}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-slate-700 overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{ width: `${t ? (s / t) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 shrink-0">
                        {empty ? 'скоро' : `${s}/${t}`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-800/70 px-3 py-2">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  )
}
