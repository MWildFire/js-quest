import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ModulePage } from './pages/ModulePage'
import { TaskPage } from './pages/TaskPage'
import { QuizPage } from './pages/QuizPage'
import { BadgesPage } from './pages/BadgesPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/module/:moduleId" element={<ModulePage />} />
        <Route path="/task/:taskId" element={<TaskPage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
