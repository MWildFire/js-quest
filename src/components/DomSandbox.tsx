import { useEffect, useMemo, useRef } from 'react'
import type { DomCheck, RunResult } from '../types'
import { buildSrcdoc } from '../engine/domTemplate'

interface Props {
  code: string
  checks: DomCheck[]
  /** Меняется при каждом запуске — перезагружает iframe. */
  runToken: number
  onResult: (r: RunResult) => void
}

interface DomMessage {
  source: string
  nonce: string
  error: string | null
  logs: string[]
  results: { name: string; passed: boolean; message: string }[]
}

export function DomSandbox({ code, checks, runToken, onResult }: Props) {
  const nonce = useMemo(() => Math.random().toString(36).slice(2), [])
  const onResultRef = useRef(onResult)
  onResultRef.current = onResult

  useEffect(() => {
    function handler(e: MessageEvent<DomMessage>) {
      const d = e.data
      if (!d || d.source !== 'js-quest-dom' || d.nonce !== nonce) return
      const results = d.results ?? []
      onResultRef.current({
        ok: !d.error && results.length > 0 && results.every((r) => r.passed),
        error: d.error || undefined,
        logs: d.logs ?? [],
        results,
      })
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [nonce])

  const srcdoc = useMemo(
    () => buildSrcdoc(code, checks, nonce),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runToken],
  )

  return (
    <iframe
      key={runToken}
      title="Предпросмотр страницы"
      sandbox="allow-scripts"
      srcDoc={srcdoc}
      className="w-full h-64 rounded-lg bg-white border border-slate-700"
    />
  )
}
