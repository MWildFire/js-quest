import { Link, useParams } from 'react-router-dom'
import { getTask } from '../content'

// Заглушка Ф1 — полноценный редактор и раннер появятся в Ф2.
export function TaskPage() {
  const { taskId = '' } = useParams()
  const task = getTask(taskId)
  if (!task) {
    return (
      <div className="text-center py-16 text-slate-400">
        Задача не найдена. <Link to="/" className="text-yellow-400">На главную</Link>
      </div>
    )
  }
  return (
    <div>
      <Link to={`/module/${task.moduleId}`} className="text-sm text-slate-400 hover:text-white">
        ← К модулю
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{task.title}</h1>
      <p className="mt-2 text-slate-300 whitespace-pre-wrap">{task.prompt}</p>
    </div>
  )
}
