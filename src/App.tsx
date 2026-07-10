import { Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <main className="min-h-full grid place-items-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400">JS Quest</h1>
        <p className="mt-2 text-slate-300">Загрузка тренажёра…</p>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
