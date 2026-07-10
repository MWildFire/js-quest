import { Link } from 'react-router-dom'

// Заглушка Ф1 — стена бейджей появится в Ф4.
export function BadgesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Бейджи</h1>
      <p className="text-slate-400 mt-2">Скоро здесь появится твоя коллекция достижений.</p>
      <Link to="/" className="text-yellow-400 hover:underline mt-4 inline-block">
        ← На главную
      </Link>
    </div>
  )
}
