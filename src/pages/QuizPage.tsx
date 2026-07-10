import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getQuiz, getModule } from '../content'
import { useProgress } from '../store/progress'

export function QuizPage() {
  const { quizId = '' } = useParams()
  const quiz = getQuiz(quizId)
  const recordQuiz = useProgress((s) => s.recordQuiz)
  const bestResult = useProgress((s) => (quiz ? s.quizResults[quiz.id] : undefined))

  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [recorded, setRecorded] = useState(false)

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        Квиз не найден.{' '}
        <Link to="/" className="text-yellow-400">
          На главную
        </Link>
      </div>
    )
  }

  const mod = getModule(quiz.moduleId)
  const question = quiz.questions[idx]
  const total = quiz.questions.length
  const answered = selected !== null

  function choose(i: number) {
    if (answered) return
    setSelected(i)
    if (i === question.correct) setScore((s) => s + 1)
  }

  function nextQuestion() {
    if (idx + 1 < total) {
      setIdx(idx + 1)
      setSelected(null)
    } else {
      if (!recorded) {
        recordQuiz(quiz!.id, score, total)
        setRecorded(true)
      }
      setFinished(true)
    }
  }

  function restart() {
    setIdx(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setRecorded(false)
  }

  if (finished) {
    const perfect = score === total
    const earnedXp = Math.round((quiz.xp * score) / total)
    return (
      <div className="max-w-md mx-auto text-center space-y-4 py-8">
        <div className="text-6xl">{perfect ? '🏆' : score >= total / 2 ? '🎉' : '💪'}</div>
        <h1 className="text-2xl font-black">
          {score} / {total}
        </h1>
        <p className="text-slate-300">
          {perfect
            ? 'Идеально! Все ответы верны.'
            : score >= total / 2
              ? 'Хорошо! Но можно лучше.'
              : 'Попробуй ещё раз — ты справишься!'}
        </p>
        <p className="text-yellow-400 font-semibold">+{earnedXp} XP</p>
        {bestResult && (
          <p className="text-xs text-slate-500">
            Лучший результат: {bestResult.score}/{bestResult.total}
          </p>
        )}
        <div className="flex gap-2 justify-center">
          <button
            onClick={restart}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300"
          >
            Ещё раз
          </button>
          <Link
            to={`/module/${quiz.moduleId}`}
            className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800"
          >
            К модулю
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <Link to={`/module/${quiz.moduleId}`} className="text-sm text-slate-400 hover:text-white">
          ← {mod?.emoji} {mod?.title}
        </Link>
        <span className="text-xs text-slate-500">
          Вопрос {idx + 1} / {total}
        </span>
      </div>

      <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
        <div
          className="h-full bg-purple-500 transition-all"
          style={{ width: `${(idx / total) * 100}%` }}
        />
      </div>

      <h1 className="text-xl font-bold">{question.question}</h1>

      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correct
          const isChosen = i === selected
          let cls = 'border-slate-700 bg-slate-800/60 hover:border-slate-500'
          if (answered) {
            if (isCorrect) cls = 'border-green-500 bg-green-500/15'
            else if (isChosen) cls = 'border-red-500 bg-red-500/15'
            else cls = 'border-slate-800 bg-slate-900/40 opacity-60'
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${cls}`}
            >
              <span className="font-mono text-slate-400 mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
              {answered && isCorrect && ' ✓'}
              {answered && isChosen && !isCorrect && ' ✗'}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
          <div className="font-semibold mb-1">
            {selected === question.correct ? '✅ Верно!' : '❌ Не совсем'}
          </div>
          <p className="text-sm text-slate-300">{question.explanation}</p>
          <button
            onClick={nextQuestion}
            className="mt-3 px-4 py-2 rounded-lg bg-purple-500 text-white font-bold hover:bg-purple-400"
          >
            {idx + 1 < total ? 'Следующий вопрос →' : 'Показать результат'}
          </button>
        </div>
      )}
    </div>
  )
}
