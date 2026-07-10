import { describe, it, expect } from 'vitest'
import { modules, quizzes, allTasks } from './index'
import { evaluateJs, evaluateDom } from '../engine/runCore'
import type { Task } from '../types'

// ─────────────────────────────────────────────────────────────
// МЕТА-ТЕСТЫ: гарантируют, что КАЖДОЕ эталонное решение проходит
// свои же проверки. Это защищает контент от опечаток и регрессий.
// ─────────────────────────────────────────────────────────────

function checkSolution(task: Task) {
  if (task.kind === 'js') {
    expect(task.fn, `${task.id}: у js-задачи должно быть имя функции fn`).toBeTruthy()
    expect(task.cases && task.cases.length, `${task.id}: нужны проверки cases`).toBeGreaterThan(0)
    const res = evaluateJs(task.solution, task.fn!, task.cases ?? [])
    if (!res.ok) {
      const failing = res.results.filter((r) => !r.passed).map((r) => `${r.name}: ${r.message}`)
      throw new Error(
        `Эталон задачи ${task.id} не проходит:\n${res.error ?? ''}\n${failing.join('\n')}`,
      )
    }
    expect(res.ok).toBe(true)
  } else {
    expect(task.checks && task.checks.length, `${task.id}: нужны проверки checks`).toBeGreaterThan(0)
    const doc = document.implementation.createHTMLDocument(task.id)
    const res = evaluateDom(doc, task.solution, task.checks ?? [])
    if (!res.ok) {
      const failing = res.results.filter((r) => !r.passed).map((r) => `${r.name}: ${r.message}`)
      throw new Error(
        `Эталон DOM-задачи ${task.id} не проходит:\n${res.error ?? ''}\n${failing.join('\n')}`,
      )
    }
    expect(res.ok).toBe(true)
  }
}

describe('эталонные решения проходят свои проверки', () => {
  for (const task of allTasks) {
    it(`${task.id} — ${task.title}`, () => {
      checkSolution(task)
    })
  }
})

describe('целостность контента', () => {
  it('id задач уникальны', () => {
    const ids = allTasks.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('порядок модулей уникален и последователен', () => {
    const orders = modules.map((m) => m.order)
    expect(new Set(orders).size).toBe(orders.length)
  })

  it('каждая задача корректно сконфигурирована', () => {
    for (const t of allTasks) {
      expect(t.xp, `${t.id}: xp > 0`).toBeGreaterThan(0)
      expect(t.difficulty, `${t.id}: difficulty 1..5`).toBeGreaterThanOrEqual(1)
      expect(t.difficulty).toBeLessThanOrEqual(5)
      expect(t.prompt.trim().length, `${t.id}: непустой prompt`).toBeGreaterThan(0)
      expect(t.starter.length, `${t.id}: непустой starter`).toBeGreaterThan(0)
      expect(t.solution.length, `${t.id}: непустое solution`).toBeGreaterThan(0)
    }
  })

  it('каждый вопрос квиза валиден', () => {
    for (const q of quizzes) {
      const qids = q.questions.map((x) => x.id)
      expect(new Set(qids).size, `${q.id}: id вопросов уникальны`).toBe(qids.length)
      for (const question of q.questions) {
        expect(question.options.length, `${question.id}: >= 2 вариантов`).toBeGreaterThanOrEqual(2)
        expect(question.correct, `${question.id}: correct в диапазоне`).toBeGreaterThanOrEqual(0)
        expect(question.correct).toBeLessThan(question.options.length)
        expect(question.explanation.trim().length, `${question.id}: есть пояснение`).toBeGreaterThan(0)
      }
    }
  })
})
