import { useRef } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  onRun?: () => void
}

/** Простой редактор на textarea: моноширинный, с поддержкой Tab и Ctrl/Cmd+Enter. */
export function CodeEditor({ value, onChange, onRun }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      onRun?.()
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.currentTarget
      const start = el.selectionStart
      const end = el.selectionEnd
      const next = value.slice(0, start) + '  ' + value.slice(end)
      onChange(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2
      })
    }
  }

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      className="w-full h-64 resize-y rounded-lg bg-[#0d1526] border border-slate-700 p-3 font-mono text-sm text-slate-100 leading-relaxed focus:outline-none focus:border-yellow-400/60"
    />
  )
}
