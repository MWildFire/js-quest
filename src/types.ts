// ─────────────────────────────────────────────────────────────
// JS Quest — доменная модель. Это контракт для всего контента.
// ─────────────────────────────────────────────────────────────

export type TaskKind = 'js' | 'dom'

export type Matcher = 'deepEqual' | 'approx' | 'sameMembers'

/**
 * Проверка для JS-задачи: вызвать функцию `fn` с `args`
 * и сравнить результат с `expected` согласно `matcher`.
 */
export interface JsCase {
  /** Короткое имя проверки (показывается ученику). */
  name: string
  /** Аргументы вызова функции. */
  args: unknown[]
  /** Ожидаемый результат. */
  expected: unknown
  /**
   * - `deepEqual` (по умолчанию) — строгое структурное равенство.
   * - `approx` — числа с плавающей точкой (|a-b| < 1e-9).
   * - `sameMembers` — массивы с одинаковым набором элементов, порядок неважен.
   */
  matcher?: Matcher
}

/**
 * Проверка для DOM-задачи. `body` — тело функции `(doc) => boolean`,
 * которое выполняется после кода ученика в изолированном документе.
 */
export interface DomCheck {
  name: string
  /** Например: `return doc.querySelector('#out').textContent === 'Привет'` */
  body: string
}

export interface Task {
  /** Уникальный id, напр. `basics-03`. */
  id: string
  moduleId: string
  title: string
  kind: TaskKind
  /** Сложность 1–5 (влияет на XP и подачу). */
  difficulty: 1 | 2 | 3 | 4 | 5
  /** Награда в XP за решение. */
  xp: number
  /** Условие задачи (Markdown). */
  prompt: string
  /** Подсказки, раскрываются по одной. */
  hints: string[]
  /** Стартовый код в редакторе. */
  starter: string
  /** Эталонное решение (проверяется мета-тестами). */
  solution: string

  // ── только для kind === 'js' ──
  /** Имя функции, которую должен определить ученик. */
  fn?: string
  cases?: JsCase[]

  // ── только для kind === 'dom' ──
  checks?: DomCheck[]
}

export interface Module {
  id: string
  /** Порядок в списке модулей. */
  order: number
  title: string
  emoji: string
  /** Краткое описание модуля. */
  summary: string
  tasks: Task[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  /** Индекс правильного варианта в `options`. */
  correct: number
  explanation: string
}

export interface Quiz {
  id: string
  /** Модуль, после которого предлагается квиз. */
  moduleId: string
  title: string
  xp: number
  questions: QuizQuestion[]
}

// ── Результаты выполнения (из воркера/iframe) ──

export interface CaseResult {
  name: string
  passed: boolean
  /** Человекочитаемое сообщение (ожидалось/получено или текст ошибки). */
  message: string
}

export interface RunResult {
  ok: boolean
  /** Ошибка компиляции/выполнения до запуска проверок. */
  error?: string
  /** Вывод console.log из кода ученика. */
  logs: string[]
  results: CaseResult[]
}
