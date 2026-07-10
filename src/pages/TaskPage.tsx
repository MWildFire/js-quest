import { useCallback, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTask, moduleTasks, getModule } from '../content'
import type { RunResult } from '../types'
import { useProgress } from '../store/progress'
import { runJs } from '../engine/runJs'
import { CodeEditor } from '../components/CodeEditor'
import { ResultsPanel } from '../components/ResultsPanel'
import { DomSandbox } from '../components/DomSandbox'

const diffLabel = ['', 'очень легко', 'легко', 'средне', 'сложно', 'хардкор']

export function TaskPage() {
  const { taskId = '' } = useParams()
  const task = getTask(taskId)

  const draft = useProgress((s) => (task ? s.drafts[task.id] : undefined))
  const solvedEntry = useProgress((s) => (task ? s.solved[task.id] : undefined))
  const saveDraft = useProgress((s) => s.saveDraft)
  const solveTask = useProgress((s) => s.solveTask)

  const [code, setCode] = useState(() => draft ?? task?.starter ?? '')
  const [result, setResult] = useState<RunResult | null>(null)
  const [running, setRunning] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [runToken, setRunToken] = useState(0)
  const [justSolved, setJustSolved] = useState(false)
  const armedRef = useRef(false)

  const handleResult = useCallback(
    (r: RunResult) => {
      setRunning(false)
      setResult(r)
      if (r.ok && task) {
        const wasSolved = !!useProgress.getState().solved[task.id]
        solveTask(task.id, code)
        if (!wasSolved) setJustSolved(true)
      }
    },
    [task, code, solveTask],
  )

  if (!task) {
    return (
      <div className="text-center py-16 text-slate-400">
        Задача не найдена.{' '}
        <Link to="/" className="text-yellow-400">
          На главную
        </Link>
      </div>
    )
  }

  const siblings = moduleTasks(task.moduleId)
  const idx = siblings.findIndex((t) => t.id === task.id)
  const prev = idx > 0 ? siblings[idx - 1] : null
  const next = idx < siblings.length - 1 ? siblings[idx + 1] : null
  const mod = getModule(task.moduleId)

  function onCodeChange(v: string) {
    setCode(v)
    setJustSolved(false)
    saveDraft(task!.id, v)
  }

  function runJsTask() {
    setRunning(true)
    setJustSolved(false)
    runJs(code, task!.fn!, task!.cases ?? []).then(handleResult)
  }

  function runDomTask() {
    setRunning(true)
    setJustSolved(false)
    armedRef.current = true
    setRunToken((t) => t + 1)
  }

  const handleRun = task.kind === 'js' ? runJsTask : runDomTask

  function onDomResult(r: RunResult) {
    if (!armedRef.current) return
    armedRef.current = false
    handleResult(r)
  }

  function resetCode() {
    setCode(task!.starter)
    saveDraft(task!.id, task!.starter)
    setResult(null)
    setJustSolved(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          to={`/module/${task.moduleId}`}
          className="text-sm text-slate-400 hover:text-white"
        >
          ← {mod?.emoji} {mod?.title}
        </Link>
        <span className="text-xs text-slate-500">
          {idx + 1} / {siblings.length}
        </span>
      </div>

      <header>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black">{task.title}</h1>
          {solvedEntry && <span title="Решено">✅</span>}
        </div>
        <div className="text-xs text-slate-400 mt-1">
          {diffLabel[task.difficulty]} · {task.xp} XP
          {task.kind === 'dom' && ' · 🌐 DOM-задача'}
        </div>
      </header>

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 whitespace-pre-wrap text-slate-200">
        {task.prompt}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <CodeEditor value={code} onChange={onCodeChange} onRun={handleRun} />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleRun}
              disabled={running}
              className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300 disabled:opacity-50 transition-colors"
            >
              ▶ Проверить <span className="opacity-60 text-xs">(Ctrl/⌘+Enter)</span>
            </button>
            <button
              onClick={resetCode}
              className="px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Сбросить
            </button>
            <button
              onClick={() => setShowSolution((s) => !s)}
              className="px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {showSolution ? 'Скрыть решение' : 'Показать решение'}
            </button>
          </div>

          {task.hints.length > 0 && (
            <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-3">
              <div className="text-sm font-semibold mb-1">💡 Подсказки</div>
              {task.hints.slice(0, hintsShown).map((h, i) => (
                <p key={i} className="text-sm text-slate-300 mt-1 whitespace-pre-wrap">
                  {i + 1}. {h}
                </p>
              ))}
              {hintsShown < task.hints.length && (
                <button
                  onClick={() => setHintsShown((n) => n + 1)}
                  className="mt-2 text-xs text-yellow-400 hover:underline"
                >
                  Показать подсказку ({hintsShown + 1}/{task.hints.length})
                </button>
              )}
            </div>
          )}

          {showSolution && (
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                Эталонное решение
              </div>
              <pre className="rounded-lg bg-black/40 border border-slate-800 p-3 text-sm text-green-200 overflow-x-auto whitespace-pre-wrap font-mono">
                {task.solution}
              </pre>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {task.kind === 'dom' && (
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                Предпросмотр страницы
              </div>
              <DomSandbox
                code={code}
                checks={task.checks ?? []}
                runToken={runToken}
                onResult={onDomResult}
              />
            </div>
          )}

          <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">
              Результат
            </div>
            <ResultsPanel result={result} running={running} />
          </div>

          {justSolved && (
            <div className="rounded-xl border border-green-500/50 bg-green-500/15 p-4 text-center">
              <div className="text-2xl">🎉</div>
              <div className="font-bold text-green-200">Задача решена! +{task.xp} XP</div>
              {next ? (
                <Link
                  to={`/task/${next.id}`}
                  className="inline-block mt-2 px-4 py-2 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition-colors"
                >
                  Следующая задача →
                </Link>
              ) : (
                <Link
                  to={`/module/${task.moduleId}`}
                  className="inline-block mt-2 px-4 py-2 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition-colors"
                >
                  Модуль пройден! →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <nav className="flex items-center justify-between pt-2">
        {prev ? (
          <Link to={`/task/${prev.id}`} className="text-slate-400 hover:text-white text-sm">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/task/${next.id}`} className="text-slate-400 hover:text-white text-sm">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
