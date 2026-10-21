'use client'

import { useEffect, useState } from 'react'
import { ChatLoader, type LoaderPhase } from './ChatLoader'

const PHASES: LoaderPhase[] = ['intake', 'working', 'settling', 'sighting']

const buttonClass = 'rounded border border-white/15 px-2 py-0.5 text-xs capitalize transition-colors'

export function ChatLoaderDemo() {
  const [phase, setPhase] = useState<LoaderPhase>('intake')
  const [auto, setAuto] = useState(true)

  // Walk through the phases the way a real agent run would
  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => {
      setPhase((p) => PHASES[(PHASES.indexOf(p) + 1) % PHASES.length] ?? 'intake')
    }, 3000)
    return () => clearInterval(id)
  }, [auto])

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-5 rounded-lg bg-neutral-950 p-6 text-white">
      <ChatLoader phase={phase} />
      <div className="flex flex-wrap justify-center gap-1.5">
        {PHASES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setAuto(false)
              setPhase(p)
            }}
            className={`${buttonClass} ${p === phase ? 'bg-white/15' : 'hover:bg-white/5'}`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setAuto((a) => !a)}
          className={`${buttonClass} ${auto ? 'bg-white/15' : 'hover:bg-white/5'}`}
        >
          auto
        </button>
      </div>
    </div>
  )
}
