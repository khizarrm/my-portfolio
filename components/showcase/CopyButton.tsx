'use client'

import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

export function CopyButton({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Clipboard access can be denied (permissions, insecure context).
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-rule bg-transparent px-3.5 py-2 text-sm text-inherit transition-colors hover:bg-frame"
    >
      {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
      {copied ? 'Copied' : label}
    </button>
  )
}
