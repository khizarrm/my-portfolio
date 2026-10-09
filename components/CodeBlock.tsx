'use client'

import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

export function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch {
      // Clipboard access can be denied (permissions, insecure context); the text is still selectable.
    }
  }

  return (
    <figure className="m-0 flex flex-col gap-2">
      <figcaption className="text-sm capitalize opacity-60">{label}</figcaption>
      <div className="relative">
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied' : `Copy ${label}`}
          className="icon-button absolute top-2 right-2"
        >
          {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
        </button>
        <pre className="m-0 overflow-x-auto rounded-[10px] border border-rule bg-frame py-4 pr-12 pl-4 text-[13px]/[1.6] whitespace-pre-wrap">
          <code className="font-mono">{code}</code>
        </pre>
      </div>
    </figure>
  )
}
