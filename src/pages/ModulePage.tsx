import { Link, useParams } from 'react-router-dom'
import { getModule, quizForModule } from '../content'
import { useProgress } from '../store/progress'

const diffLabel = ['', 'очень легко', 'легко', 'средне', 'сложно', 'хардкор']

export function ModulePage() {
  const { moduleId = '' } = useParams()
  const module = getModule(moduleId)
  const solved = useProgress((s) => s.solved)
  const quizResults = useProgress((s) => s.quizResults)

  if (!module) {
    return <NotFound />
  }

  const quiz = quizForModule(module.id)
  const quizResult = quiz ? quizResults[quiz.id] : undefined

  return (
    <div className="space-y-6">
      <div>
        <Link to="/" className="text-sm text-slate-400 hover:text-white">
          ← Все модули
        </Link>
        <h1 className="mt-2 text-2xl font-black flex items-center gap-3">
          <span className="text-3xl">{module.emoji}</span>
          {module.title}
        </h1>
        <p className="text-slate-400 mt-1">{module.summary}</p>
      </div>

      <ol className="space-y-2">
        {module.tasks.map((task, i) => {
          const done = !!solved[task.id]
          return (
            <li key={task.id}>
              <Link
                to={`/task/${task.id}`}
                className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 hover:border-yellow-400/60 hover:bg-slate-800 transition-colors"
              >
                <span
                  className={`grid place-items-center w-7 h-7 rounded-full text-sm font-bold shrink-0 ${
                    done ? 'bg-green-500 text-black' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {done ? '✓' : i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{task.title}</div>
                  <div className="text-xs text-slate-400">
                    {diffLabel[task.difficulty]} · {task.xp} XP
                    {task.kind === 'dom' && ' · 🌐 DOM'}
                  </div>
                </div>
                <span className="text-slate-500 text-sm">→</span>
              </Link>
            </li>
          )
        })}
      </ol>

      {quiz && (
        <Link
          to={`/quiz/${quiz.id}`}
          className="block rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-4 hover:bg-purple-500/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧩</span>
            <div className="flex-1">
              <div className="font-bold">{quiz.title}</div>
              <div className="text-xs text-slate-400">
                {quiz.questions.length} вопросов · {quiz.xp} XP
                {quizResult && ` · лучший: ${quizResult.score}/${quizResult.total}`}
              </div>
            </div>
            <span className="text-slate-400">→</span>
          </div>
        </Link>
      )}
    </div>
  )
}

function NotFound() {
  return (
    <div className="text-center py-16">
      <p className="text-slate-400">Модуль не найден.</p>
      <Link to="/" className="text-yellow-400 hover:underline">
        На главную
      </Link>
    </div>
  )
}
