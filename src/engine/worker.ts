/// <reference lib="webworker" />
import type { JsCase, RunResult } from '../types'
import { evaluateJs } from './runCore'

export interface WorkerRequest {
  code: string
  fn: string
  cases: JsCase[]
}

const ctx = self as unknown as DedicatedWorkerGlobalScope

ctx.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const { code, fn, cases } = e.data
  let result: RunResult
  try {
    result = evaluateJs(code, fn, cases)
  } catch (err) {
    result = {
      ok: false,
      error: `Внутренняя ошибка: ${err instanceof Error ? err.message : String(err)}`,
      logs: [],
      results: [],
    }
  }
  ctx.postMessage(result)
}
