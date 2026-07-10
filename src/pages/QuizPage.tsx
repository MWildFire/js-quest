import { Link, useParams } from 'react-router-dom'
import { getQuiz } from '../content'

// Заглушка Ф1 — интерактивный квиз появится в Ф5.
export function QuizPage() {
  const { quizId = '' } = useParams()
  const quiz = getQuiz(quizId)
  if (!quiz) {
    return (
      <div className="text-center py-16 text-slate-400">
        Квиз не найден. <Link to="/" className="text-yellow-400">На главную</Link>
      </div>
    )
  }
  return (
    <div>
      <Link to={`/module/${quiz.moduleId}`} className="text-sm text-slate-400 hover:text-white">
        ← К модулю
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{quiz.title}</h1>
      <p className="text-slate-400">{quiz.questions.length} вопросов</p>
    </div>
  )
}
