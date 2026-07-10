import type { JsCase, RunResult } from '../types'
import type { WorkerRequest } from './worker'

const TIMEOUT_MS = 3000

/**
 * Запускает код ученика в изолированном Web Worker.
 * Свежий воркер на каждый запуск — гарантирует, что бесконечный цикл
 * можно убить через terminate() по таймауту.
 */
export function runJs(code: string, fn: string, cases: JsCase[]): Promise<RunResult> {
  return new Promise((resolve) => {
    let worker: Worker
    try {
      worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
    } catch (e) {
      resolve({
        ok: false,
        error: `Не удалось запустить песочницу: ${e instanceof Error ? e.message : String(e)}`,
        logs: [],
        results: [],
      })
      return
    }

    let settled = false
    const finish = (r: RunResult) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      worker.terminate()
      resolve(r)
    }

    const timer = setTimeout(() => {
      finish({
        ok: false,
        error: '⏱ Превышено время выполнения (3с). Возможно, бесконечный цикл?',
        logs: [],
        results: [],
      })
    }, TIMEOUT_MS)

    worker.onmessage = (e: MessageEvent<RunResult>) => finish(e.data)
    worker.onerror = (e) => {
      finish({
        ok: false,
        error: `Ошибка выполнения: ${e.message || 'неизвестная ошибка'}`,
        logs: [],
        results: [],
      })
    }

    const req: WorkerRequest = { code, fn, cases }
    worker.postMessage(req)
  })
}
