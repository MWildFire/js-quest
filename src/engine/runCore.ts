import type { JsCase, DomCheck, RunResult, CaseResult } from '../types'
import { matches, show } from './equality'

function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message
  return String(e)
}

function fmt(v: unknown): string {
  return typeof v === 'string' ? v : show(v)
}

/** console-подобная заглушка, складывающая вывод в массив строк. */
export function makeConsole(logs: string[]) {
  const push = (...args: unknown[]) => logs.push(args.map(fmt).join(' '))
  return { log: push, info: push, warn: push, error: push, debug: push }
}

function safeClone<T>(v: T): T {
  try {
    return structuredClone(v)
  } catch {
    try {
      return JSON.parse(JSON.stringify(v))
    } catch {
      return v
    }
  }
}

/**
 * Ядро проверки JS-задачи. Идентично используется в Web Worker (рантайм)
 * и в мета-тестах (Node/jsdom) — гарантирует, что эталон проверяется тем же путём.
 */
export function evaluateJs(
  code: string,
  fn: string,
  cases: JsCase[],
  logs: string[] = [],
): RunResult {
  const console = makeConsole(logs)
  let studentFn: unknown
  try {
    const factory = new Function(
      'console',
      `"use strict";\n${code}\n;return (typeof ${fn} !== 'undefined') ? ${fn} : undefined;`,
    )
    studentFn = factory(console)
  } catch (e) {
    return { ok: false, error: `Ошибка в коде: ${errMsg(e)}`, logs, results: [] }
  }

  if (typeof studentFn !== 'function') {
    return {
      ok: false,
      error: `Не найдена функция «${fn}». Проверь, что ты объявил именно её.`,
      logs,
      results: [],
    }
  }

  const results: CaseResult[] = []
  for (const c of cases) {
    try {
      const actual = (studentFn as (...a: unknown[]) => unknown)(...safeClone(c.args))
      const passed = matches(actual, c.expected, c.matcher)
      results.push({
        name: c.name,
        passed,
        message: passed
          ? 'OK'
          : `ожидалось ${show(c.expected)}, получено ${show(actual)}`,
      })
    } catch (e) {
      results.push({ name: c.name, passed: false, message: `ошибка выполнения: ${errMsg(e)}` })
    }
  }

  return { ok: results.length > 0 && results.every((r) => r.passed), logs, results }
}

/**
 * Ядро проверки DOM-задачи. `doc` — document iframe'а (рантайм) или jsdom (тесты).
 */
export function evaluateDom(
  doc: Document,
  code: string,
  checks: DomCheck[],
  logs: string[] = [],
): RunResult {
  const console = makeConsole(logs)
  try {
    const run = new Function('document', 'console', `"use strict";\n${code}`)
    run(doc, console)
  } catch (e) {
    return { ok: false, error: `Ошибка в коде: ${errMsg(e)}`, logs, results: [] }
  }

  const results: CaseResult[] = checks.map((chk) => {
    try {
      const test = new Function('doc', `"use strict";\n${chk.body}`)
      const passed = !!test(doc)
      return { name: chk.name, passed, message: passed ? 'OK' : 'проверка не прошла' }
    } catch (e) {
      return { name: chk.name, passed: false, message: `ошибка проверки: ${errMsg(e)}` }
    }
  })

  return { ok: results.length > 0 && results.every((r) => r.passed), logs, results }
}
