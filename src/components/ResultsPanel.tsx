import type { RunResult } from '../types'

export function ResultsPanel({ result, running }: { result: RunResult | null; running: boolean }) {
  if (running) {
    return <div className="text-sm text-slate-400 animate-pulse">Проверяю…</div>
  }
  if (!result) {
    return (
      <div className="text-sm text-slate-500">
        Нажми «Проверить», чтобы прогнать код через тесты.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {result.error && (
        <div className="rounded-lg bg-red-500/15 border border-red-500/40 px-3 py-2 text-sm text-red-200 whitespace-pre-wrap">
          {result.error}
        </div>
      )}

      {result.results.length > 0 && (
        <ul className="space-y-1">
          {result.results.map((r, i) => (
            <li
              key={i}
              className={`flex items-start gap-2 text-sm rounded-md px-2 py-1 ${
                r.passed ? 'text-green-300' : 'text-red-300 bg-red-500/10'
              }`}
            >
              <span className="shrink-0">{r.passed ? '✓' : '✗'}</span>
              <span className="flex-1">
                <span className="font-medium">{r.name}</span>
                {!r.passed && r.message !== 'OK' && (
                  <span className="text-red-400/90"> — {r.message}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      {result.logs.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">console</div>
          <pre className="rounded-lg bg-black/40 border border-slate-800 p-2 text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
            {result.logs.join('\n')}
          </pre>
        </div>
      )}
    </div>
  )
}
